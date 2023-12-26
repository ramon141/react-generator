import comands
from log import Log
import generators.loopback.main as lb4_main
import json
import generators.react.main as react
import subprocess
import cli.main as cli_main
import generators.loopback.main as lb4


Log.load()
cli_main.init()


# print(json.dump(lb4_model.create_model(), indent=4))

# lb4.create_model()


# j = json.loads('{"name": "User", "base": "Entity", "properties": {"id": {"type": "number", "id": true, "required": true}, "name": {"type": "string", "id": false, "required": true}}}')

# comands.start()

# react.create_all_pages(j)