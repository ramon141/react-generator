import os
import shutil
from tqdm import tqdm
from log import Log  # Supondo que Log seja um módulo ou classe definida em outro lugar

def copy_tree(src, dst, dirs_exist_ok=True):
    # Obter a lista de todos os arquivos e diretórios dentro do diretório de origem
    total_items = sum([len(files) for r, d, files in os.walk(src)])

    with tqdm(total=total_items, unit='file', desc='Copiando arquivos') as pbar:
        for root, dirs, files in os.walk(src):
            # Criar cada diretório no destino
            for dir in dirs:
                os.makedirs(os.path.join(dst, os.path.relpath(os.path.join(root, dir), src)), exist_ok=dirs_exist_ok)

            # Copiar cada arquivo e atualizar a barra de progresso
            for file in files:
                src_file = os.path.join(root, file)
                dst_file = os.path.join(dst, os.path.relpath(src_file, src))
                shutil.copy2(src_file, dst_file)
                pbar.update(1)