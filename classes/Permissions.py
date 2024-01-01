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

    def __init__(self, action: str, description: str) -> None:
        self.action = action
        self.description = description
        self.restriction = False

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
    def update_or_create_action(self, action: str, restriction: list | bool) -> None:
        temp_action = self.get_action_from_message(action)
        print(temp_action.description)

        action = [d for d in self.actions if action == d.action]
        
        if len(action) == 0: # Não existe
            temp_action.restriction = restriction
            self.actions.append(temp_action)
        else: # Altera a instância de action
            action[0].restriction = restriction


    def get_action_from_message(self, action: str) -> Action | None:
        message = {
            'unique_item': 'Acesso a um item único',
            'count': 'Contar quantidade de itens',
            'list_all': 'Listar todos os registros',
            'create': 'Criar registros',
            'delete': 'Deletar registros',
            'update': 'Atualizar por completo',
            'partial_update': 'Atualização de dados parcial',
        }
        if action not in message:
            return None
        
        return Action(action, message[action])
    
    

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
                result.add_permission(key, action, value)

        if len(result) == 0:
            return None
        
        return result


    def add_permission(self, model_name: str, action: str | Path, restriction: list | bool) -> None:
        permission = self.find_or_create(model_name)
        if isinstance(action, str):
            permission.update_or_create_action(action, restriction)
        else:
            permission.update_or_create_action(self.get_action(action), restriction)


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
            for actions in permission.actions:
                res[permission.get_model_name()][actions.action] = actions.restriction

        Log.set_permissions(res)
    

    def __str__(self) -> str:
        table = PrettyTable()
        table.field_names = ["Model", "Ação", "Privado"]
        for permission in self:
            for idx in range(len(permission.actions)):
                action = permission.actions[idx]
                table.add_row([permission.model.get_name(), action.description, str(action.restriction)], divider=idx == len(permission.actions) - 1)

        return table.get_string()