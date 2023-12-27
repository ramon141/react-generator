import questionary

def questionare():
    user_types = []
    auth_option = questionary.select(
        "Escolha o tipo de autorização:",
        choices=[
            "Criar autorização simples",
            "Criar autorização com níveis de acesso"
        ]
    ).ask()

    if auth_option == "Criar autorização simples":
        print("Você deverá preencher o model abaixo com as informações que deseja que o usuário tenha. "
              "Um atributo 'password' será criado automaticamente e você deverá informar o outro atributo "
              "que desejar para permitir a autorização, como um: name, username, email, cpf, etc...")
        auth_option_value = "simple"

    elif auth_option == "Criar autorização com níveis de acesso":
        while True:
            print("Informe uma label para os tipos de usuários que podem ser cadastrados.")
            user_type = questionary.text("Tipo de usuário (deixe em branco para finalizar):").ask()
            if not user_type:
                break
            user_types.append(user_type)

        print(f"Tipos de usuários cadastrados: {user_types}")
        print("Você deverá preencher o model abaixo com as informações que deseja que o usuário tenha. "
              "Serão adicionados ao modelo automaticamente um atributo 'password' e 'role'. No final você "
              "deverá informar um outro atributo que desejar para permitir a autorização, como um: "
              "name, username, email, cpf, etc...")
        auth_option_value = "with_roles"
 
    return auth_option_value, user_types