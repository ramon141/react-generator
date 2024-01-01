from typing import overload

@overload
def ola(nome: str) -> None:
    print(nome)

@overload
def ola() -> None:
    print("Ola mundo")

ola("asd")