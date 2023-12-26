import os
import re
from log import Log

def controller_files():
    directory = "{}/src/controllers".format(Log.get_api_path())
    folder = os.listdir(directory)

    # Filtra apenas os arquivos e retorna o caminho absoluto
    files = [os.path.join(directory, arq) for arq in folder if arq.endswith(".controller.ts") and os.path.isfile(os.path.join(directory, arq))]

    return files


def get_path_from_code(code):
    regex = r"@(post|get|patch|delete|put)\('(\/[\w\/{}]+)'\)"
    paths = []
    matches = re.finditer(regex, code, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):
        paths.append({
            "method": match.group(1),
            "url": match.group(2)
        })
    
    return paths


def get_controller_name(code):
    regex = r"export class (.+)Controller {"
    matches = re.finditer(regex, code, re.MULTILINE)

    for matchNum, match in enumerate(matches, start=1):
        return match.group(1)
    

def get_paths():
    files = controller_files()
    paths = {}

    for file_path in files:
        with open(file_path, 'r') as file:
            code = file.read()
            controller_name = get_controller_name(code)
            paths_controller = get_path_from_code(code)

        paths[controller_name] = paths_controller

    return paths