# puzzle-solver
A tool to solve jigsaw puzzles using Node/Express on AWS

## Prerequisites
- This repo uses Docker and a Dockerfile to self-host this Node application as well as a dynamoDB instance
## Getting Started
1. Clone the git repo locally
1. Ensure you have the correct Node.js version installed(specified in [.nvmrc](.nvmrc))
1. ```touch .env``` and then provide the following config entries into your .env
    - HOST_URL=http://localhost:3000
    - OKTA_ORG_URL=your okta instance
    - OKTA_CLIENT_ID=
    - OKTA_CLIENT_SECRET=
    - OKTA_TOKEN=
1. ```echo -e "\rAPP_SECRET=`uuid`" >> .env``` to generate a unique APP_SECRET
1. ```docker-compose up``` to run the Node application and local dynamoDB
## Debugging
This repo can be run and debugged locally using [Visual Studio Code](https://code.visualstudio.com/download), please make sure to have [Docker for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) installed.
1. After running through Getting Started instructions and verifying your environment, escape from ```docker-compose up``` by  running ```docker-compose down``` or by interrupting the process
1. From VS Code right click on **docker-compose.debug.yml** and select *Compose Up* from the context menu
1. After verifying from the VS Code *TERMINAL* window that the containers are running, simply press F5 to attach the debugger