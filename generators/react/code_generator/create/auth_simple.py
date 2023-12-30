from log import Log
import re

def add_auth_on_route():
    with open("{}/src/layout/DefaultLayout.js".format(Log.get_web_path()), 'r') as file:
        code = file.read()

    search = '//Add auth'

    snippet = """
  if (!isAuthenticable())
    return <Navigate to="/" />
"""

    code = code.replace(snippet, '') # Remove se já existe
    code = code.replace(search, snippet)

    with open("{}/src/layout/DefaultLayout.js".format(Log.get_web_path()), 'w') as file:
        file.write(code)


def defining_login_with_default_page():
    with open("{}/src/App.js".format(Log.get_web_path()), 'r') as file:
        code = file.read()

    code = re.sub(
        r'(<Route exact path="/" name="Login Page" element={<)DefaultLayout( />} />)',
        r'\1Login\2', 
        code
    )

    with open("{}/src/App.js".format(Log.get_web_path()), 'w') as file:
        file.write(code)
    


def init():
    add_auth_on_route()
    defining_login_with_default_page()