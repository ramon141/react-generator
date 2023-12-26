from questionary import prompt

def get_app_name():
    app_name_question = [
            {
                'type': 'input',
                'name': 'app_name',
                'message': 'Informe o nome da aplicação:'
            }
        ]
    app_name_answer = prompt(app_name_question)
    app_name = app_name_answer['app_name']
    return app_name