from .loopback.cli import create_model as cli
from .loopback import main as lb4
from .react import main as react 
import auth

def rest():
    model = lb4.rest()
    react.rest(model)
    return model


def add_authorization():
    model = create_crud_user()
    auth_generator.add_auth_configurations()
    return model
