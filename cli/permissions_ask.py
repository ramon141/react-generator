import questionary
from questionary import Choice
from log import Log
from classes.Permissions import Permissions
from classes.Controllers import Controllers

def permission_questionnaire_complex(resources):
    model = questionary.select("Escolha um modelo:", choices=list(resources.keys())).ask()
    model_routes = resources[model]

    route_options = [Choice(f"{route['method'].upper()} - {route['url']}", value=route) for route in model_routes]
    selected_route = questionary.select(f"Você quer editar a permissão de qual rota do modelo {model}?", choices=route_options).ask()

    roles = Log.get_profiles()
    selected_roles = questionary.checkbox("Selecione os tipos de usuário:", choices=roles).ask()

    return model, selected_route['url'], selected_route['method'].upper(), selected_roles


def permission_questionnaire_simple(paths: Controllers):
    permissions = Permissions.load_file()
    if permissions == None:
        permissions = Permissions.from_controllers(paths)

    while True:
        actions = ['Selecionar um modelo', 'Listar todas as permissões', 'Cancelar', 'Confirmar alterações']
        action = questionary.select("Selecione a ação desejada:", choices=actions).ask()

        if action == 'Selecionar um modelo':
            model_name = questionary.select("Escolha um modelo:", choices=list(paths.get_controller_names())).ask()
            permission = permissions.get_permission(model_name)
            
            actions = ['Listar Permissões atuais', 'Atualizar Permissões', 'Voltar']
            action = questionary.select("Selecione a ação desejada:", choices=actions).ask()

            if action == 'Listar Permissões atuais':
                print(permission)
            elif action == 'Atualizar Permissões':
                actions = permission.get_actions_label()
                selected_actions = questionary.checkbox("Escolha as rotas que quer adicionar autenticação:", choices=actions).ask()
                permission.update_permission_from_action(selected_actions, None)

        elif action == 'Listar todas as permissões':
            print(permissions)

        elif action == 'Cancelar':
            break

        elif action == 'Confirmar alterações':
            permissions.confirm()
            break
            
        print('\n')