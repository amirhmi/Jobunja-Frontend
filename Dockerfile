# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:9.4

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

RUN npm install -g serve

CMD serve -s build -l 3000