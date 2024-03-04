FROM node:18
WORKDIR /backend
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3001 2717

CMD ["nodemon", "index.js"]