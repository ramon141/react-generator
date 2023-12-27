import subprocess
from .cli.create_datasource import get_datasource_name
from .cli import main as cli
import json
from log import Log
from classes.Model import Model

def rest() -> Model:
    model_local = model(cli.model())
    repository(model_local.get_name())
    controller(model_local.get_name())
    migrate()
    return model_local


def app():
    print("Criando backend loopback")
    create_cmd = 'lb4 app --name={}-api --description={} --eslint --vscode --docker --mocha --prettier --services --loopbackBuild --repositories -y'.format(Log.get_app_name(), 'teste')
    subprocess.run(create_cmd, shell=True, stdout=subprocess.PIPE)


def datasource():
    datasource_name = get_datasource_name()
    Log.set_datasource(datasource_name)

    create_cmd = "cd {}-api; lb4 datasource {}".format(Log.get_app_name(), datasource_name)

    subprocess.run(create_cmd, shell=True)


def model(model: Model) -> Model:
    json_cmd = json.dumps(model.to_dict())
    Log.add_model(model)

    create_cmd = "cd {}-api; lb4 model --config '{}' -y".format(Log.get_app_name(), json_cmd)

    subprocess.run(create_cmd, shell=True, capture_output=True, text=True)
    return model


def repository(model_name):
    create_cmd = "cd {}-api; lb4 repository --model={} --id=id --datasource={}".format(Log.get_app_name(), model_name, Log.get_datasource())

    return subprocess.run(create_cmd, shell=True, capture_output=True, text=True).stdout


def controller(model_name):
    create_cmd = "cd {}; lb4 controller {}".format(Log.get_api_path(), model_name)
    subprocess.run(create_cmd, check=True, shell=True)


def migrate():
    print("Fazendo migrate do banco de dados")
    migrate_cmd = 'cd {} && npm run migrate -- --rebuild'.format(Log.get_api_path())
    subprocess.run(migrate_cmd, shell=True, stdout=subprocess.PIPE)


def install_libs(libs, param = ''):
    install_cmd = "cd {} && npm i {} {}".format(Log.get_api_path(), param, ' '.join(libs))
    subprocess.run(install_cmd, check=True, shell=True)