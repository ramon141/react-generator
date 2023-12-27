# Pró Disciplina WEB

![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
# Como iniciar o aplicativo?

Para utilizar e instalar esse aplicativo é pré-requisito possuir o `docker` e o `docker-compose`, que pode ser obtido aqui: [Docker Download](https://docs.docker.com/desktop/windows/install/) e [Docker Compose Download](https://docs.docker.com/compose/install/). Abaixo estarão os passos necessários para a execução da página web localmente.
Caso esteja utilizando uma distribuição Linux baseada no Ubuntu basta utilzar o comando: ```sudo apt install docker docker-compose```

## Confiurando as variáveis de ambiente
Para definir a URL da API é necessário criar um arquivo com o nome `.env` na raiz do repositório. Os arquivos do repositório serão como na imagem abaixo:

![Listagem dos arquivos](https://i.imgur.com/4fvyKYt.png)
Obs: Lembre-se que os arquivos não necessariamente são exatamente estes, pois podem ser alterados com o desenvolvimento do projeto, esta imagem somente ressalta a criação do arquivo `.env`.

Dentro arquivo `.env` deverá conter a(s) seguinte(s) variável(is), abaixo de cada variável estará listada os possíveis valores e em quais casos os valores são utilizados.

+ CHOKIDAR_USEPOLLING
    + Utilizado para indicar o uso do HotReload, sempre deixe configurado para `true`.

+ REACT_APP_BASE_API_URL
    + Link da API, se estiver executando localmente, sem ter configurado o laravel para abrir em uma porta específica, utilize o endereço `http://localhost:80/`.

+ PORT
    + Essa variável é utilizada ao subir o container.
    + Qualquer valor numérico pode ser utilizado, geramente a porta do react é `3000`.

O arquivo `.env` ficará:

![Monstrando .env](https://i.imgur.com/fQBlrjr.png)

Um arquivo com as variáveis de ambiente já configuradas pode ser encontrado na raiz do projeto, para  utilizá-lo basta executar o comando:
`cp env_example .env`

## Instalar a imagem docker
Para certificar que o Docker está instalado corretamente em seu computador execute o comando `docker run hello-world` no seu terminal/cmd. O resutado esperado é:

![Sucesso no Docker](https://i.imgur.com/rTUcUm4.png)

Garanta que o Docker compose também está instalado corretamente, para isto execute o comando `docker-compose --version`, o resultado esperado é:

![Docker-compose instalado](https://i.imgur.com/Mwu0qKD.png)

Caso tenha ocorrido tudo certo, acesse a pasta do projeto utilizando o terminal/cmd e execute o comando `docker-compose up --build` para rodar o container de produção, ou `docker-compose -f docker-compose.dev.yml up --build` para executar o container de desenvolvimento, que adiciona a funcionalidade de hot reload. O resultado esperado é:

### Container de Produção
![Imagem docker](https://i.imgur.com/MYHic6V.png)

### Container de Desenvolvimento
![Imagem docker](https://i.imgur.com/MYHic6V.png)

Para sair deste container você pode pressionar Ctrl+C (ou command+C ser for MAC), pressione mais de uma vez, se necessário.

### Iniciando a imagem pela 2ª vez
Para executar o ambiente depois de fazer as configurações necessárias basta:
+ Entrar na pasta do projeto pelo terminal
+ Executar o comando `docker-compose up`, o mesmo resultado da primeira execução irá ocorrer.
