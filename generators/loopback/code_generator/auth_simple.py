from log import Log
from classes.Model import Model
import re
from classes.Permissions import Permissions

def add_imports(code):
    search_regex = r"import { ?MySequence ?} from '\./sequence';"
    search = "import { MySequence } from '\./sequence';"

    snippet = """
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  MyUserService,
  SECURITY_SCHEME_SPEC,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { """ + Log.get_datasource() + """DataSource } from './datasources';
"""
    # Se já houver a configuração remove
    code = code.replace(snippet, '')
    return re.sub(search_regex, search + "\n" + snippet, code, 0, re.MULTILINE)


def add_config_application(code):
    search = """    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };"""

    snippet = """
    // ------ ADD SNIPPET AT THE BOTTOM ---------
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    // This is where your User data will be stored.
    this.dataSource(""" + Log.get_datasource() + """DataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind the user service to the one in @loopback/authentication-jwt
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    // ------------- END OF SNIPPET -------------
"""

    # Se já houver a configuração remove
    code = code.replace(snippet, '')
    return code.replace(search, search + "\n" + snippet)

def controller_user(model: Model, credential):
    with open('template/backend/controller/user.controller.ts'.format(Log.get_api_path()), 'r') as f:
        code = f.read()

    code = code.replace('ModelName', model.get_name().capitalize())
    code = code.replace('credential_pair', credential)

    with open('{}/src/controllers/{}.controller.ts'.format(Log.get_api_path(), model.get_name().lower()), 'w') as f:
          f.write(code)


def get_controller_code(model_name) -> str:
    with open('{}/src/controllers/{}.controller.ts'.format(Log.get_api_path(), model_name).lower(), 'r') as f:
        code = f.read()
    return code

def save_controller_code(model_name, code):
    with open('{}/src/controllers/{}.controller.ts'.format(Log.get_api_path(), model_name).lower(), 'w') as f:
        f.write(code)


def update_auth_on_routes(permissions: Permissions):
    for permission in permissions:
        code = get_controller_code(permission.get_model_name())
        code = code.replace("@authenticate('jwt')", '')

        for action in permission.actions:
            path = action.back_url
            
            if action.restriction != False:
                code = add_auth(code, path)

        save_controller_code(permission.get_model_name(), code)

def add_auth(code, path):
    snippet = "@authenticate('jwt')"
    search = "@{}('{}'".format(path.get_method().lower(), path.get_path())
    code = code.replace(search, snippet + '\n' + search)
    return code


def init(model: Model, credential):
    with open('{}/src/application.ts'.format(Log.get_api_path()), 'r') as f:
        code = f.read()

    code = add_imports(code)
    code = add_config_application(code)

    with open('{}/src/application.ts'.format(Log.get_api_path()), 'w') as f:
        f.write(code)

    controller_user(model, credential)

        