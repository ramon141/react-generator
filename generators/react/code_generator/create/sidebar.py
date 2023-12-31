from classes.Model import Model
from log import Log

def create_sidebar(model: Model):
    regex = '//end components'

    snippet = """
  {
    component: CNavGroup,
    name: '""" + model.get_name().capitalize() +"""',
    to: '#',
    icon: <FaChartBar className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cadastrar',
        to: '/register-""" + model.get_name().lower() +"""',
      },
      {
        component: CNavItem,
        name: 'Listar',
        to: '/list-""" + model.get_name().lower() +"""',
      },
    ]
  },
"""

    with open("{}/src/_nav.js".format(Log.get_web_path()), 'r') as file:
        code = file.read()

    return code.replace(regex, snippet + '\n' + regex)