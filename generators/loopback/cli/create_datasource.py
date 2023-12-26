import questionary

def get_datasource_name():
    datasource_name = questionary.text("Datasource nome:").ask()
    return datasource_name
