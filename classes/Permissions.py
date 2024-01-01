from classes.Model import Model
from typing import List
from log import Log
from classes.Controllers import Path, Controllers
from prettytable import PrettyTable
from typing import overload


class Action:
    action: str
    description: str
    restriction: list | bool
    back_url: Path
    front_url: str


    def __init__(self, action: str, description: str, back_url: Path, front_url: str = '') -> None:
        self.action = action
        self.description = description
        self.restriction = False
        self.back_url = back_url
        self.front_url = front_url


    def set_restriction(self, restriction: list | bool) -> None:
        self.restriction = restriction


    def get_restriction_label(self) -> str:
        if isinstance(self.restriction, bool):
            return "SIM" if self.restriction else "NÃO"
        
        return ", ".join(self.restriction)


    def __str__(self) -> str:
        return "{} - {}".format(self.description, self.restriction)


class Permission:
    model: Model
    actions: List[Action] = list()

    def __init__(self, model_name: str) -> None:
        self.model = Log.get_model(model_name)


    # Isso é basicamente uma ponte entre o cli e a classe permission
    def update_permission_from_action(self, actions_l: List[str], restriction: list | bool | None):
        for action_l in actions_l:
            action = [d for d in self.actions if str(d) == action_l][0]
            if isinstance(action.restriction, bool) and restriction == None:
                action.restriction = not action.restriction
            else:
                action.restriction = restriction


    # Atualiza a ação com a restrição dada ou cria uma ação com a restrição dada
    def update_or_create_action(self, path: Path, restriction: list | bool) -> None:
        temp_action = self.get_action(path)
        action = [d for d in self.actions if temp_action.action == d.action]
        
        if len(action) == 0: # Não existe
            temp_action.restriction = restriction
            self.actions.append(temp_action)
        else: # Altera a instância de action
            action[0].restriction = restriction



    def get_action(self, path: Path) -> Action:
        if path.get_method() == 'GET':
            if "{id}" in path.get_path():
                return Action('unique_item', 'Acesso a um item único', path)
            elif 'count' in path.get_path():
                return Action('count', 'Contar quantidade de itens', path)
            else:
                return Action('list_all', 'Listar todos os registros', path)
        elif path.get_method() == 'POST':
            return Action('create', 'Criar registros', path)
        elif path.get_method() == 'DELETE':
            return Action('delete', 'Deletar registros', path)
        elif path.get_method() == 'PUT':
            return Action('update', 'Atualizar por completo', path)
        elif path.get_method() == 'PATCH':
            return Action('partial_update', 'Atualização de dados parcial', path)
    
    

    def __str__(self) -> str:
        table = PrettyTable()
        table.field_names = ["Model", "Ação", "Privado"]
        for action in self.actions:
            table.add_row([self.model.get_name(), action.description, str(action.restriction)])
        return table.get_string()


    def get_model_name(self) -> str:
        return self.model.get_name()

    def get_actions_label(self) -> List[str]:
        return [str(d) for d in self.actions]


class Permissions(List[Permission]):

    @staticmethod
    def from_controllers(controllers: Controllers):
        permissions = Permissions()

        for controller in controllers:
            for path in controller.paths:
                permissions.add_permission(controller.get_model_name(), path, False)

        return permissions
    

    @staticmethod
    def load_file():
        permissions = Log.get_permissions()
        result = Permissions()

        for key, permission in permissions.items():
            for action, value in permission.items():
                path = Path(value['back_url']['url'], value['back_url']['method'])
                result.add_permission(key, path, value['value'])

        if len(result) == 0:
            return None
        
        return result


    def add_permission(self, model_name: str, path: Path, restriction: list | bool) -> None:
        permission = self.find_or_create(model_name)
        permission.update_or_create_action(path, restriction)


    def get_action(self, path: Path) -> str:
        if path.get_method() == 'GET':
            if "{id}" in path.get_path():
                return 'unique_item'
            elif 'count' in path.get_path():
                return 'count'
            else:
                return 'list_all'
        elif path.get_method() == 'POST':
            return 'create'
        elif path.get_method() == 'DELETE':
            return 'delete'
        elif path.get_method() == 'PUT':
            return 'update'
        elif path.get_method() == 'PATCH':
            return 'partial_update'


    def get_permission(self, model_name: str):
        return self.find_or_create(model_name)

    def find_or_create(self, model_name: str) -> Permission:
        permission = self.find_permission_from_model(model_name)
        if permission == None:
            permission = Permission(model_name)
            self.append(permission)
        return permission
    

    def find_permission_from_model(self, model_name: str) -> Permission | None:
        res = [d for d in self if d.get_model_name() == model_name]
        if len(res) == 0:
            return None
        return res[0]
    

    def confirm(self) -> dict:
        res = {}
        for permission in self:
            res[permission.get_model_name()] = {}
            for action in permission.actions:
                res[permission.get_model_name()][action.action] = {
                    'value': action.restriction,
                    'front_url': action.front_url,
                    'back_url': {
                        'method': action.back_url.get_method(),
                        'url': action.back_url.get_path(),
                    }
                }

        Log.set_permissions(res)
    

    def __str__(self) -> str:
        table = PrettyTable()
        table.field_names = ["Model", "Ação", "Privado"]
        for permission in self:
            for idx in range(len(permission.actions)):
                action = permission.actions[idx]
                table.add_row([permission.model.get_name(), action.description, str(action.restriction)], divider=idx == len(permission.actions) - 1)

        return table.get_string()