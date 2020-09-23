FROM node:10-alpine
RUN mkdir -p /puzzle-solver-app
WORKDIR /puzzle-solver-app
COPY package*.json ./
RUN npm install
COPY . .