FROM node:10-alpine
RUN mkdir -p /puzzle-solver-app
WORKDIR /puzzle-solver-app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]