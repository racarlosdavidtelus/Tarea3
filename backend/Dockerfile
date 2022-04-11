FROM node:16-alpine
WORKDIR /backendPokedex
COPY . .
RUN npm install
ENV CARNET default
ENV MYSQL_HOST default
ENV MYSQL_USER default
ENV MYSQL_PASSWORD default
ENV MYSQL_DATABASE default
ENV MONGO_URL default
ENV REGION default 
ENV ACCESSKEYID default
ENV SECRETACCESSKEY default     
EXPOSE 2000
CMD ["npm","start"]