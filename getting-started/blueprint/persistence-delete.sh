#!/bin/bash

# MariaDB
kubectl delete -f kubernetes/mariadb/kube-pv.yml
kubectl delete -f kubernetes/mariadb/kube-pvc-mariadb.yml
kubectl delete -f kubernetes/mariadb/kube-mariadb-persistence.yml

# MongoDB
kubectl delete -f kubernetes/mongo/kube-pv.yml
kubectl delete -f kubernetes/mongo/kube-mongo-persistence.yml

# Redis
kubectl delete -f kubernetes/redis/kube-redis-slave.yml
kubectl delete -f kubernetes/redis/kube-redis-master.yml

# Deletes data
sudo rm -rf /usr/lib/data/*
sudo rm -rf /usr/lib/mongo-data/*
sudo rm -rf /usr/lib/mariadb-data/*
