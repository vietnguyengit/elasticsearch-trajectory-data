#!/bin/sh

# Clean data directory and create if not exist
for work_dir in "elasticsearch-data" "kibana-data" "enterprisesearch-data"
do
	echo "Process directory $work_dir"
	if [ -d $work_dir ] 
	then
		rm -rf $work_dir/*
	else
		mkdir $work_dir
	fi
done

# Clean all cert
sudo rm -rf certs

docker-compose down
