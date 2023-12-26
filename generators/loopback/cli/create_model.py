import questionary
from classes.Model import Model  # Supondo que Model e Property estão definidas em model.py

def model_questionnaire() -> Model:
    model_name = questionary.text("Nome da classe Model:").ask()
    base = questionary.select(
        "Selecione a classe base do modelo:",
        choices=['Entity', 'Model']
    ).ask()

    new_model = Model()
    new_model.set_name(model_name)
    new_model.set_base(base)

    id_property_exists = False

    while True:
        print("\n")
        property_name = questionary.text(
            "Insira o nome da propriedade (deixe vazio para terminar):"
        ).ask()

        if not property_name:
            break

        property_type = questionary.select(
            "Tipo de propriedade:",
            choices=['string', 'number', 'boolean', 'object', 'array']
        ).ask()

        is_id = False
        is_generated = False
        required = True

        if not id_property_exists:
            is_id = questionary.confirm(f"A propriedade de ID é {property_name}?").ask()
            id_property_exists = is_id

        if is_id:
            is_generated = questionary.confirm("O id é gerado automaticamente?").ask()
            required = not is_generated
        else:
            required = questionary.confirm("É necessário?").ask()

        new_model.add_property(name=property_name, type=property_type, required=required, is_id=is_id, generated=is_generated)

    return new_model
