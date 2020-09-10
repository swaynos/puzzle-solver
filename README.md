# puzzle-solver
A tool to solve jigsaw puzzles using Node/Express on AWS

## Getting Started
1. Clone the git repo locally
1. Ensure you have the correct Node.js version installed(specified in [.nvmrc](.nvmrc))
1. ```touch .env``` and then provide the following config entries into your .env
# - HOST_URL=http://localhost:3000
# - OKTA_ORG_URL=your okta instance
# - OKTA_CLIENT_ID=
# - OKTA_CLIENT_SECRET=
# - OKTA_TOKEN=
1. ```echo -e "\rAPP_SECRET=`uuid`" >> .env``` to generate a unique APP_SECRET
1. ```npm install``` to install depedencies
1. ```npm start``` to watch files
