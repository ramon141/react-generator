import json

class Property:
    def __init__(self, name, type, required=True, is_id=False, generated=False):
        self.name = name
        self.type = type
        self.required = required
        self.is_id = is_id
        self.generated = generated

    def to_dict(self):
        return {
            "type": self.type,
            "id": self.is_id,
            "required": self.required,
            "generated": self.generated if self.is_id else None
        }

class Model:
    def __init__(self, name="", base=""):
        self.name = name
        self.base = base
        self.properties = {}

    def add_property(self, name, type, required=True, is_id=False, generated=False):
        self.properties[name] = Property(name, type, required, is_id, generated)

    def set_name(self, name):
        self.name = name

    def set_base(self, base):
        self.base = base

    def get_name(self):
        return self.name
    
    def get_properties(self):
        return self.properties

    def get_base(self):
        return self.base

    def to_json(self):
        return json.dumps({
            "name": self.name,
            "base": self.base,
            "properties": {name: prop.to_dict() for name, prop in self.properties.items()}
        }, indent=4)

    @staticmethod
    def from_json(json_data):
        model_data = json.loads(json_data)
        model = Model(model_data["name"], model_data["base"])
        for name, prop_data in model_data["properties"].items():
            model.add_property(name, **prop_data)
        return model