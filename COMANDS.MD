
```sh CHIPSET M1
docker build --platform amd64 -t racarlosdavid/mysql_gcpf_tarea3 .
docker build --platform amd64 -t racarlosdavid/api_gcpf_tarea3 .

docker push racarlosdavid/mysql_gcpf_tarea3
docker push racarlosdavid/api_gcpf_tarea3
```

```sh NO M1
docker build -t racarlosdavid/mysql_gcpf_tarea3 .
docker build -t racarlosdavid/api_gcpf_tarea3 .

docker push racarlosdavid/mysql_gcpf_tarea3
docker push racarlosdavid/api_gcpf_tarea3
```

```sh
docker run -d -p 3306:3306 --name mysql_gcpf_tarea3 racarlosdavid/mysql_gcpf_tarea3
docker exec -it mysql_gcpf_tarea3 mysql -u carlosdavid -p

docker run -d -p 2000:2000 --name api_gcpf_tarea3 racarlosdavid/api_gcpf_tarea3
```

```K8S Cluster
gcloud container clusters create cluster-tarea3 --num-nodes=3

gcloud config get-value project
gcloud config set project 
gcloud config set compute/zone us-central1-a 
gcloud container clusters create cluster-k8s-conferencia --num-nodes=3 --machine-type=n1-standard-2 --no-enable-network-policy
```

```sh K8S
kubectl apply -f deployment.yml
kubectl delete -f deployment.yml
kubectl get services
kubectl get pods
kubectl rollout restart deployment/backend-deployment
```

