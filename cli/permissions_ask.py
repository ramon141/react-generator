import questionary
from questionary import Choice

def permission_questionnaire(resources):
    model = questionary.select("Escolha um modelo:", choices=list(resources.keys())).ask()
    model_routes = resources[model]

    route_options = [Choice(f"{route['method'].upper()} - {route['url']}", value=route) for route in model_routes]
    selected_route = questionary.select(f"Você quer editar a permissão de qual rota do modelo {model}?", choices=route_options).ask()

    roles = ["ADMIN", "VIEWER", "DIRECTOR"]
    selected_roles = questionary.checkbox("Selecione os tipos de usuário:", choices=roles).ask()

    return model, selected_route['url'], selected_route['method'].upper(), selected_roles