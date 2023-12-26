from log import Log

def create_route(model):
    type_routes = ["List", "Register"]

    new_route = new_imports = ""

    for value in type_routes:
        new_route += "{" + " path: '/{}', name: '{}', element: {}, exact: true".format(value.lower() + "-" + model.get_name().lower(), model.get_name().capitalize(), value + model.get_name().capitalize()) + "},\n\t"
        new_imports += "import {} from './views/{}';\n".format(value + model.get_name().capitalize(), value + model.get_name().capitalize())

    with open("{}-web/src/routes.js".format(Log.get_app_name()), 'r') as routes_file:
        new_routes = routes_file.read().replace('//end imports', new_imports + "\n//end imports")
        new_routes = new_routes.replace('//end routes', new_route + "\n\t//end routes")

    return new_routes