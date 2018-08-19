# nohub:
```shell
cd redis-4.0.11
mkdir logs
nohub ./src/redis-server ../redis.conf >> ./logs/redis.log 2>&1 &
```