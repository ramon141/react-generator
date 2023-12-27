from log import Log
from .loopback import main as lb4
from generators.loopback.cli import main as cli
import subprocess
from classes.Model import Model
from .loopback.code_generator.auth_simple import init as auth_simple


def init():
    configure() # Instala as bibliotecas
    model = create_crud_user() # Cria o model/repository/controller users
    credential = input('Digite o nome do atributo que deseja utilizar para combinar com a senha (username, email, name, cpf, etc)...: ')
    auth_simple(model, credential)
    

def configure():
    if Log.get_type_auth() == "simple":
        libs = ['@loopback/authentication', '@loopback/authentication-jwt', '@loopback/security']
    else:
        libs = ['@loopback/authentication', '@loopback/authentication-jwt', '@loopback/security']
    lb4.install_libs(libs, param="--save")


def create_crud_user() -> Model:
    model: Model = create_model_user()
    lb4.repository(model.get_name())
    create_controller_user(model.get_name())

    lb4.migrate()
    return model


def create_model_user() -> Model:
    model_local = cli.model()
    model_local = alter_model_auth(model_local)
    return lb4.model(model_local)


# Verificar melhor lugar para colocar depois
def alter_model_auth(model: Model) -> Model:
    if Log.get_type_auth() == "Criar autorização com níveis de acesso":
        model.add_property('profile', 'string')

    model.add_property('password', 'string')

    return model


def create_controller_user(model_name):
    create_cmd = "cd {}; lb4 controller {} --typeController basic -y".format(Log.get_api_path(), model_name)
    subprocess.run(create_cmd, check=True, shell=True)