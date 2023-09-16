FROM node:18.17-bullseye

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@15.2.9

RUN npm install --force

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

