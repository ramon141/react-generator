import subprocess
from log import Log
import os
import generators.react.main as react
import cli.profile_ask as cli_profile_ask
import cli.permissions_ask as cli_permissions_ask
import generators.loopback.read_code.paths as lb4_paths
import generators.utils.create_permissions as permissions
import generators.loopback.main as lb4


def init(app_name):
    print("Iniciando aplicação")
    Log.set_app_name(app_name)
    Log.set_path(os.getcwd() + '/' + app_name)

    react.create_react_app()
    lb4.app()

    lb4.datasource()


def rest():
    model = lb4.rest()
    Log.add_model(model)
    react.rest(model)


def add_authorization():
    auth_option, user_types = cli_profile_ask.questionare()
    
    Log.set_type_auth(auth_option)
    Log.set_profiles(user_types)

    model = lb4.add_authorization()
    react.rest(model)


def alter_permissions():
    paths = lb4_paths.get_paths()
    model, route, method, roles = cli_permissions_ask.permission_questionnaire(paths)
    new_permissions = permissions.create_permissions(paths, model, route, method, roles)
    Log.set_permissions(new_permissions)


def start():
    back_start_cmd = "cd {} && export PORT=3000 &&  npm start &".format(Log.get_api_path())
    web_start_cmd = "cd {} && export PORT=3002 && npm start".format(Log.get_web_path())
    
    subprocess.run(back_start_cmd, shell=True)
    subprocess.run(web_start_cmd, shell=True)

