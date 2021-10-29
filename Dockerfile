FROM node:alpine
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY models/ ./models/
COPY routes/ ./routes/

CMD ["npm", "run", "start"]