from log import Log
from classes.Model import Model, Property

def get_attrs(model: Model):
    attrs = []
    for key, value in model.get_properties().items():
        new_value = value.to_dict()
        new_value["name"] = key
        attrs.append(new_value)
    return attrs

def save_api(html, model: Model):
    save_source(html, "{}/src/api/{}.js".format(Log.get_web_path(), model.get_name().capitalize()))


def save_routes(html):
    save_source(html, "{}/src/routes.js".format(Log.get_web_path()))


def save_create_page(html, model: Model):
    save_source(html, "{}/src/views/Register{}.js".format(Log.get_web_path(), model.get_name().capitalize()))


def save_list_page(html, model: Model):
    save_source(html, "{}/src/views/List{}.js".format(Log.get_web_path(), model.get_name().capitalize()))


def save_source(content, save_on):
    with open(save_on, 'w') as f:
        f.write(content)