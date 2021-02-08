FROM node:current-alpine3.10

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]