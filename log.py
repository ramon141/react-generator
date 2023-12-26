import json
import os
from classes.Model import Model


class Log:
    logger = None
 
    def load():
        with open (os.getcwd() + '/config.json', "r") as f:
            Log.logger = json.loads(f.read())


    def set_permissions(permissions):
        Log.write_file("permissions", permissions)

    def get_profiles():
        return Log.logger["auth"]["profiles"]

    def get_type_auth():
        return Log.logger["auth"]["type"]
    
    def set_profiles(profiles):
        new_auth = Log.logger["auth"]
        new_auth["profiles"] = profiles
        Log.write_file("auth", new_auth)

    def set_type_auth(type_auth):
        new_auth = Log.logger["auth"]
        new_auth["type"] = type_auth
        Log.write_file("auth", new_auth)

    def get_type_auth():
        return Log.logger["auth"]["type"]

    def app_not_initialized():
        return Log.get_path() == "" or not os.path.isdir(Log.get_web_path()) or not os.path.isdir(Log.get_api_path())

    def set_datasource(datasource):
        Log.write_file("datasource", datasource)

    def get_datasource():
        return Log.logger["datasource"]

    def get_path():
        return Log.logger["path"]

    def get_web_path():
        return Log.logger["path"] + '-web'
    
    def get_api_path():
        return Log.logger["path"] + '-api'

    def set_app_name(app_name):
        Log.write_file("app_name", app_name)

    def set_path(path):
        Log.write_file("path", path)

    def get_app_name():
        return Log.logger["app_name"]
    
    def add_model(model: Model):
        Log.logger["models"].append(model.to_json())
        Log.write_file("models", Log.logger["models"])

    def write_file(key, value):
        Log.logger[key] = value
        with open('config.json', 'w', encoding='utf-8') as f:
            json.dump(Log.logger, f, ensure_ascii=False, indent=4)



