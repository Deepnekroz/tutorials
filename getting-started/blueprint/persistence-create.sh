#!/bin/bash

# MariaDB
kubectl create -f kubernetes/mariadb/kube-pv.yml
kubectl create -f kubernetes/mariadb/kube-pvc-mariadb.yml
kubectl create -f kubernetes/mariadb/kube-mariadb-persistence.yml

# MongoDB
kubectl create -f kubernetes/mongo/kube-pv.yml
kubectl create -f kubernetes/mongo/kube-mongo-persistence.yml

# Redis
kubectl create -f kubernetes/redis/kube-redis-master.yml
kubectl create -f kubernetes/redis/kube-redis-slave.yml
