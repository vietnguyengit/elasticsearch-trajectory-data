# build environment
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT npm run start
