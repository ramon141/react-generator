from log import Log

def add_imports(code):
    search = """import { MySequence } from './sequence';"""

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
    return code.replace(search, search + snippet)


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


def init():
    with open('{}/src/application.ts'.format(Log.get_api_path()), 'r') as f:
        code = f.read()

    code = add_imports(code)
    code = add_config_application(code)

    with open('{}/src/application.ts'.format(Log.get_api_path()), 'w') as f:
        f.write(code)

        