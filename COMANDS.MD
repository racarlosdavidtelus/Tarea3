docker build -t racarlosdavid/mysql_gcpf_tarea3 .
docker build -t racarlosdavid/api_gcpf_tarea3 .

docker run -d -p 3306:3306 --name mysql_gcpf_tarea3 racarlosdavid/mysql_gcpf_tarea3
docker exec -it mysql_gcpf_tarea3 mysql -u carlosdavid -p

docker run -d -p 2000:2000 --name api_gcpf_tarea3 racarlosdavid/api_gcpf_tarea3

docker push mysql_gcpf_tarea3
docker push api_gcpf_tarea3

gcloud container clusters create cluster-tarea3 --num-nodes=3

