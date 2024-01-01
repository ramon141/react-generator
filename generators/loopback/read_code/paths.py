import os
import re
from log import Log
from classes.Controllers import Controllers, Controller

def controller_files():
    directory = "{}/src/controllers".format(Log.get_api_path())
    folder = os.listdir(directory)

    # Filtra apenas os arquivos e retorna o caminho absoluto
    files = [os.path.join(directory, arq) for arq in folder if arq.endswith(".controller.ts") and os.path.isfile(os.path.join(directory, arq))]

    return files


def get_path_from_code(code) -> Controller:
    controller = Controller(get_controller_name(code))
    regex = r"@(post|get|patch|del|put)\('(\/[\w\/{}]+)'"
    matches = re.finditer(regex, code, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):
        controller.add_path(match.group(2), match.group(1))
    
    return controller


def get_controller_name(code):
    regex = r"export class (.+)Controller {"
    matches = re.finditer(regex, code, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):
        return match.group(1)
    

def get_paths() -> Controllers:
    files = controller_files()
    controllers = Controllers()
    ignore_controllers = ['Ping']

    for file_path in files:
        with open(file_path, 'r') as file:
            code = file.read()
            controller = get_path_from_code(code)
            if controller.get_model_name() not in ignore_controllers:
                controllers.add_controler(controller)

    return controllers