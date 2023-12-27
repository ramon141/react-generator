from .code_generator.create.utils import *
from .code_generator.create.register import create_page
from .code_generator.create.config_routes import create_route
from .code_generator.create.list import page_list
from .code_generator.create.api import create_api
from .code_generator.create.sidebar import create_sidebar
import subprocess
from generators.utils.copy import copy_tree

def rest(model):
    save_create_page(create_page(model), model)
    save_list_page(page_list(model), model)
    save_api(create_api(model), model)
    save_routes(create_route(model))
    save_sidebar(create_sidebar(model))


def create_react_app():
    print("Copiando template do sistema web")
    copy_tree('template/frontend', Log.get_web_path(), dirs_exist_ok=True)
    install_libs_cmd = 'cd {} && npm install'.format(Log.get_web_path())
    print("Rodando npm install")
    return subprocess.run(install_libs_cmd, shell=True, capture_output=True, text=True).stdout
