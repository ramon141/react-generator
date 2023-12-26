from questionary import prompt
from log import Log
import os
import comands as cmd
from .app_name_ask import get_app_name


def init():
    os.system('cls' if os.name == 'nt' else 'clear')
    if Log.app_not_initialized():
        cmd.init(get_app_name())
    init()


def main_cli():
    questions = [
        {
            'type': 'list',
            'name': 'main_option',
            'message': 'Escolha uma opção:',
            'choices': ['Criar', 'Editar', 'Deletar', 'Atualizar path', 'Iniciar Aplicação', 'Adicionar Autenticação', 'Alterar Permissões', 'Sair']
        }
    ]

    answers = prompt(questions)
    main_option = answers['main_option']

    if main_option == 'Criar':
        create_questions = [
            {
                'type': 'list',
                'name': 'create_option',
                'message': 'Escolha o que criar:',
                'choices': ['Criar CRUD', 'Criar Datasource']
            }
        ]
        create_answers = prompt(create_questions)
        if create_answers['create_option'] == 'Criar CRUD':
            cmd.rest()
        elif create_answers['create_option'] == 'Criar Datasource':
            print("Criar Datasource")

    elif main_option == 'Editar':
        edit_questions = [
            {
                'type': 'list',
                'name': 'edit_option',
                'message': 'Escolha o que editar:',
                'choices': ['Adicionar propriedade no modelo', 'Remover propriedade do modelo', 'Editar datasource']
            }
        ]
        edit_answers = prompt(edit_questions)
        print(edit_answers['edit_option'])

    elif main_option == 'Deletar':
        print("Deletar")

    elif main_option == 'Atualizar path':
        path_question = [
            {
                'type': 'input',
                'name': 'new_path',
                'message': 'Informe o diretório onde se encontra a api e web (deixe em branco para usar o local atual): '
            }
        ]
        path_answer = prompt(path_question)
        new_path = path_answer['new_path']
        if new_path:
            Log.set_path(f"{new_path}/{Log.get_app_name()}")
            print(f"Novo local: {Log.get_path()}")
        else:
            Log.set_path(f"{os.getcwd()}/{Log.get_app_name()}")
            print(f"Usando local atual: {Log.get_path()}")

    elif main_option == 'Iniciar Aplicação':
        cmd.start()

    elif main_option == 'Adicionar Autenticação':
        cmd.add_authorization()

    elif main_option == 'Alterar Permissões':
        cmd.alter_permissions()

    elif main_option == 'Sair':
        return

    print("\n")
    main_cli()