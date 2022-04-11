docker build -t racarlosdavid/mysql_gcpf_tarea3 .

docker build -t racarlosdavid/api_gcpf_tarea3 .



docker run --name dbpruebas -p 3306:3306 -d mysql_tarea3
docker exec -it dbpruegas mysql -u root -p