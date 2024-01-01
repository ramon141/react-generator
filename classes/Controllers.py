from classes.Model import Model
from typing import List
from log import Log

class Path:
    path = ''
    method = ''

    def __init__(self, path: str, method: str) -> None:
        self.path = path
        self.method = method.upper()

    def get_method(self):
        return self.method
    
    def get_path(self):
        return self.path


class Controller:
    model: Model
    paths: List[Path] = list()

    def __init__(self, model_name: str) -> None:
        self.model = Log.get_model(model_name)

    def add_path(self, path: str, method: str) -> None:
        self.paths.append(Path(path, method))

    def get_model_name(self) -> str:
        return self.model.get_name()


class Controllers(list[Controller]):

    def add_path(self, model_name: str, path: str, method: str) -> None:
        controller = self.find_controller_from_model(model_name)

        if controller == None:
            controller = Controller(model_name)
            self.append(controller)
            
        controller.add_path(path, method)


    def add_controler(self, controller: Controller) -> None:
        my_controller = self.find_controller_from_model(controller.get_model_name())

        if my_controller == None:
            self.append(controller)
        else:
            print("O controller já existia: {}".format(controller.get_model_name()))
            
        my_controller = controller


    def find_controller_from_model(self, model_name: str) -> Controller | None:
        res = [d for d in self if d.get_model_name() == model_name]
        if len(res) == 0:
            return None
        return res[0]
    
    def get_controller_names(self) -> List[str]:
        return [d.get_model_name() for d in self]