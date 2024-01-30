entregavel2-techchallenge

Projeto responsável pela geração de pedidos

Installalção

Pre-requesitos para iniciar o projeto
- Docker
- Minikube

Deploy

Execute os comandos abaixo no diretorio manifestos do projeto para buildar:

kubectl apply -f nodejs-namespace.yaml
kubectl apply -f nodejs-deployment.yaml
kubectl apply -f nodejs-service.yaml
kubectl apply -f nodejs-hpa.yaml

Documentation
Acesse o documentação do swagger no endereço abaixo:

https://documenter.getpostman.com/view/2558332/2s9YysCMHm
