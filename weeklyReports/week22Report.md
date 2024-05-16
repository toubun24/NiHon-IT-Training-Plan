# Week 22 Report

## 学习内容及时长

* **2023.05.13 月曜日:** 
  * Redis-字符串数据类型 21:15-21:41
  * Redis-列表数据类型 21:41-22:00
  * Redis-集合Set 22:30-23:03
  * Redis-有序集合ZSet 23:03-23:26
  * Redis-哈希Hash 23:26-23:30
  * Redis-地理位置GEO 23:30-23:35 00:20-00:30
  * Redis-位图Bitmap&基数统计HyperLoglog 00:30-00:45

* **2023.05.14 火曜日:** 
  * Redis-RDB持久化 15:30-16:15
  * Redis-AOF持久化 17:15-17:35
  * Redis-主从模式 18:00-19:00
  * Redis-哨兵模式介绍 20:35-20:43
  * Redis-哨兵模式搭建 20:43-21:30

* **2023.05.15 水曜日:** 
  * Redis-集群搭建 16:10-17:25 18:45-19:00 20:10-20:47
  * Redis-集群分片机制 20:47-21:10
  * Redis-集群分片操作 22:50-23:47

* **2023.05.16 木曜日:** 
  * Redis-集成SpringBoot 14:55-16:45

* **2023.05.17 金曜日:** 

* **2023.05.18 土曜日:** 

* **2023.05.19 日曜日:** 


## 学习笔记

### Redis 基本数据类型 (Docker方式)

#### Redis 字符串数据类型
```bash
C:\Windows\System32>docker ps -a
CONTAINER ID   IMAGE             COMMAND                   CREATED        STATUS                       PORTS                               NAMES
260541ddadb7   redis             "docker-entrypoint.s…"   20 hours ago   Exited (255) 5 seconds ago   6379/tcp                            redis
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   9 days ago     Exited (255) 20 hours ago    0.0.0.0:8081->8081/tcp              nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago   Exited (255) 20 hours ago    0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1
```

```bash
C:\Windows\System32>docker start 260541ddadb7
260541ddadb7
```

```bash
C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
# SET 设置指定 key 的值
127.0.0.1:6379> set name zhangsan
OK
# GET 获取指定 key 的值
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> set age 18
OK
127.0.0.1:6379> get age
"18"
# SETNX 在 key 不存在时设置 key 的值
127.0.0.1:6379> setnx name lisi # setnx不会顶替
(integer) 0
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> ttl name
(integer) -1 # 永不过期
127.0.0.1:6379> expire name 5 # 5s过期
(integer) 1
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> set name zhangsan EX 5
OK
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> get name
(nil)
# SETEX 设置指定 key 的值并设过期时间
127.0.0.1:6379> setex name zhangsan 5
(error) ERR value is not an integer or out of range
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> setex name 5 zhangsan
OK
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> get name
(nil)
# MSET 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
127.0.0.1:6379> mset name zhangsan name1 lisi name2 wangwu
OK
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> get name1
"lisi"
127.0.0.1:6379> get name2
"wangwu"
# GETSET 设置新值同时获得旧值
127.0.0.1:6379> getset name2 zhangsan
"wangwu"
127.0.0.1:6379> get name2
"zhangsan"
127.0.0.1:6379> set age 18
OK
# INCR/DECR 对 key 的值进行加1或者减1操作
127.0.0.1:6379> incr age
(integer) 19
127.0.0.1:6379> decr age
(integer) 18
# INCRBY/DECRBY 对 key 的值进行自定义加减
127.0.0.1:6379> incrby age 20
(integer) 38
127.0.0.1:6379> decrby age 20
(integer) 18
# SETRANGE 用指定的字符串覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始
127.0.0.1:6379> setrange age 0 5
(integer) 2
127.0.0.1:6379> get age
"58"
# GETRANGE 获取存储在指定 key 中字符串的子字符串。字符串的截取范围由 start 和 end 两个偏移量决定
127.0.0.1:6379> getrange age 0 0
"5"
```

#### Redis 列表数据类型
```bash
127.0.0.1:6379> flushdb
OK
# LPUSH 将一个或多个值插入到列表左端
127.0.0.1:6379> lpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> lrange name 0 -1
1) "wangwu"
2) "lisi"
3) "zhangsan"
127.0.0.1:6379> flush db
(error) ERR unknown command 'flush', with args beginning with: 'db'
127.0.0.1:6379> flushdb
OK
# RPUSH 将一个或多个值插入到列表右端
127.0.0.1:6379> rpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> lrange name 0 -1
1) "zhangsan"
2) "lisi"
3) "wangwu"
# LPOP 移出并获取列表的第一个元素
127.0.0.1:6379> lpop name
"zhangsan"
127.0.0.1:6379> lpop name
"lisi"
127.0.0.1:6379> lpop name
"wangwu"
127.0.0.1:6379> lpop name
(nil)
127.0.0.1:6379> rpush name zhangsan lisi wangwu
(integer) 3
# BLPOP 移出并获取列表的第一个元素,如列表没有元素会阻塞列表直到超时或发现元素为止
127.0.0.1:6379> blpop name 5
1) "name"
2) "zhangsan"
127.0.0.1:6379> blpop name 5
1) "name"
2) "lisi"
127.0.0.1:6379> blpop name 5
1) "name"
2) "wangwu"
127.0.0.1:6379> blpop name 5
(nil)
(5.00s)
127.0.0.1:6379> rpush name zhangsan lisi wangwu
(integer) 3
# RPOP 移除并获取列表的最后一个元素
127.0.0.1:6379> rpop name
"wangwu"
127.0.0.1:6379> rpop name 2
1) "lisi"
2) "zhangsan"
127.0.0.1:6379> rpop name 2
(nil)
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> rpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> rpush name wangwu wangwu wangwu
(integer) 6
# LRANGE 从左到右获取列表元素
127.0.0.1:6379> lrange name 0 -1
1) "zhangsan"
2) "lisi"
3) "wangwu"
4) "wangwu"
5) "wangwu"
6) "wangwu"
# LREM 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素
127.0.0.1:6379> lrem name 4 wangwu
(integer) 4
127.0.0.1:6379> lrange name 0 -1
1) "zhangsan"
2) "lisi"
```

#### Redis List命令搭配
```bash
127.0.0.1:6379> flushdb
OK
# LPUSH + LPOP = 栈 先进后出
127.0.0.1:6379> lpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> lpop name
"wangwu"
127.0.0.1:6379> lpop name
"lisi"
127.0.0.1:6379> lpop name
"zhangsan"
# LPUSH + RPOP = 队列 先进先出
127.0.0.1:6379> lpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> rpop name
"zhangsan"
127.0.0.1:6379> rpop name
"lisi"
127.0.0.1:6379> rpop name
"wangwu"
# LPUSH + BRPOP = 队列 阻塞效果
127.0.0.1:6379> lpush name zhangsan lisi wangwu
(integer) 3
127.0.0.1:6379> brpop name 2
1) "name"
2) "zhangsan"
127.0.0.1:6379> brpop name 2
1) "name"
2) "lisi"
127.0.0.1:6379> brpop name 2
1) "name"
2) "wangwu"
127.0.0.1:6379> brpop name 2
(nil)
(2.00s)
```

#### Redis Set集合
```bash
# SADD 向集合添加一个或多个成员
127.0.0.1:6379> sadd name zhangsan lisi wangwu
(integer) 3
# SMEMBERS 返回集合中的所有成员
127.0.0.1:6379> smembers name
1) "zhangsan"
2) "lisi"
3) "wangwu"
# SISMEMBER 判断 member 元素是否是集合 key 的成员
127.0.0.1:6379> sismember name lisi
(integer) 1
127.0.0.1:6379> sismember name lisi2
(integer) 0
# SREM 移除集合中一个或多个成员
127.0.0.1:6379> srem name wangwu
(integer) 1
127.0.0.1:6379> smembers name
1) "zhangsan"
2) "lisi"
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> sadd name zhangsan zhangsan lisi lisi wangwu
(integer) 3
127.0.0.1:6379> smembers name
1) "zhangsan"
2) "lisi"
3) "wangwu"
127.0.0.1:6379> sadd name1 zhangsan wangwu
(integer) 2
# SMOVE 将 member 元素从 源集合移动到 目标集合
127.0.0.1:6379> smove name name1 lisi
(integer) 1
127.0.0.1:6379> smembers name1
1) "zhangsan"
2) "wangwu"
3) "lisi"
127.0.0.1:6379> smembers name
1) "zhangsan"
2) "wangwu"
# SINTER 返回所有给定集合的交集
127.0.0.1:6379> sinter name name1
1) "zhangsan"
2) "wangwu"
# SUNION 返回所有给定集合的并集
127.0.0.1:6379> sunion name name1
1) "zhangsan"
2) "wangwu"
3) "lisi"
# SDIFF 返回第一个集合与其他集合之间的差异(注意比较的两个集合有顺序)
127.0.0.1:6379> sdiff name name1
(empty array)
127.0.0.1:6379> sadd name laoliu
(integer) 1
127.0.0.1:6379> sdiff name name1
1) "laoliu"
127.0.0.1:6379> sdiff name1 name
1) "lisi"
127.0.0.1:6379> smembers name
1) "zhangsan"
2) "wangwu"
3) "laoliu"
127.0.0.1:6379> smembers name1
1) "zhangsan"
2) "wangwu"
3) "lisi"
```

#### Redis ZSet有序集合
```bash
127.0.0.1:6379> flushdb
OK
# ZADD 向有序集合添加一个或多个成员，或者更新已存在成员的分数
127.0.0.1:6379> zadd name 100 zhangsan 200 lisi 300 wangwu
(integer) 3
# ZSCORE 返回有序集中，成员的分数值
127.0.0.1:6379> zscore name wangwu
"300"
# ZRANGE 通过索引区间返回有序集合指定区间内的成员
127.0.0.1:6379> zrange name 0 -1
1) "zhangsan"
2) "lisi"
3) "wangwu"
# ZREM 移除有序集合中的一个或多个成员
127.0.0.1:6379> zrem name lisi
(integer) 1
127.0.0.1:6379> zrange name 0 -1
1) "zhangsan"
2) "wangwu"
# ZRANK 返回有序集合中指定成员的排名，从小到大排序
127.0.0.1:6379> zrank name zhangsan
(integer) 0
127.0.0.1:6379> zrank name wangwu
(integer) 1
# ZREVRANK 返回有序集合中指定成员的排名，从大到小排序
127.0.0.1:6379> zrevrank name wangwu
(integer) 0
127.0.0.1:6379> zrevrank name zhangsan
(integer) 1
# ZCOUNT 计算在有序集合中指定区间分数的成员数
127.0.0.1:6379> zcount name 100 300
(integer) 2
127.0.0.1:6379> zcount name 200 300
(integer) 1
127.0.0.1:6379>
```

#### Redis Hash哈希
```bash
127.0.0.1:6379> flushdb
OK
# HSET 将哈希表 key 中的字段 field 的值设为 value
127.0.0.1:6379> hset name name1 zhangsan
(integer) 1
# HGET 获取存储在哈希表中指定字段的值
127.0.0.1:6379> hget name
(error) ERR wrong number of arguments for 'hget' command
127.0.0.1:6379> hget name name1
"zhangsan"
# HDEL 删除一个或多个哈希表字段
127.0.0.1:6379> hdel name
(error) ERR wrong number of arguments for 'hdel' command
127.0.0.1:6379> hdel name name1
(integer) 1
# HMSET 同时将多个 field-value (域-值)对设置到哈希表 key 中
127.0.0.1:6379> hmset name name1 zhangsan name2 lisi name3 wangwu
OK
# HMGET 获取所有给定字段的值
127.0.0.1:6379> hmget name name1 name2 name3
1) "zhangsan"
2) "lisi"
3) "wangwu"
127.0.0.1:6379> hgetall name
1) "name1"
2) "zhangsan"
3) "name2"
4) "lisi"
5) "name3"
6) "wangwu"
# HVALS 获取哈希表中所有值
127.0.0.1:6379> hvals name
1) "zhangsan"
2) "lisi"
3) "wangwu"
```

#### Redis GEO地理位置
```bash
127.0.0.1:6379> flushdb
OK
# GEOADD 将指定的地理空间位置（纬度、经度、名称）添加到指定的 key 中
127.0.0.1:6379> geoadd chinacity 116.0 39.0 beijing 120.0 30.0 shanghai
(integer) 2
# GEOPOS 从 key 里返回所有给定位置元素的位置（即经度和纬度）
127.0.0.1:6379> geopos chinacity beijing shanghai
1) 1) "116.00000113248825073"
   2) "38.99999918434559731"
2) 1) "120.00000089406967163"
   2) "30.00000024997701331"
# GEODIST 返回两个地理位置间的距离，如果两个位置之间的其中一个不存在，那么返回空值
127.0.0.1:6379> geodist chinacity beijing shanghai
"1065751.2416"
127.0.0.1:6379> geodist chinacity beijing shanghai km
"1065.7512"
# GEORADIUSBYMEMBER 根据给定地理位置(具体的位置元素)获取指定范围内的地理位置集合
127.0.0.1:6379> georadiusbymember chinacity beijing 200 km
1) "beijing"
127.0.0.1:6379> georadiusbymember chinacity beijing 2000 km
1) "shanghai"
2) "beijing"
```

#### Redis Bitmap位图
```bash
127.0.0.1:6379> flushdb
OK
# SETBIT 设置或者清除某一位上的值，其返回值是原来位上存储的值，key 在初始状态下所有的位都为 0
127.0.0.1:6379> setbit 2024login 13 1
(integer) 0
127.0.0.1:6379> setbit 2024login 12 0
(integer) 0
127.0.0.1:6379> setbit 2024login 11 0
(integer) 0
127.0.0.1:6379> setbit 2024login 10 1
(integer) 0
# GETBIT 获取某一位上的值
127.0.0.1:6379> getbit 2024login 13
(integer) 1
127.0.0.1:6379> getbit 2024login 12
(integer) 0
127.0.0.1:6379> getbit 2024login 11
(integer) 0
127.0.0.1:6379> getbit 2024login 10
(integer) 1
# BITCOUNT 统计指定位区间上，值为 1 的个数
127.0.0.1:6379> bitcount 2024login
(integer) 2
```

#### Redis HyperLoglog基数统计
```bash
127.0.0.1:6379> flushdb
OK
# PFADD 添加指定元素到 HyperLogLog 中
127.0.0.1:6379> pfadd webview u1 u2 u3
(integer) 1
# PFCOUNT 返回给定 HyperLogLog 的基数估算值
127.0.0.1:6379> pfcount webview
(integer) 3
127.0.0.1:6379> pfadd webview u1 u2 u3 u4 u4
(integer) 1
127.0.0.1:6379> pfcount webview
(integer) 4
127.0.0.1:6379> pfadd weblogin u1 u2 u3 u4 u5
(integer) 1
127.0.0.1:6379> pfcount weblogin
(integer) 5
# PFMERGE 将多个 HyperLogLog 合并为一个 HyperLogLog
127.0.0.1:6379> pfmerge webtoday webview weblogin
OK
127.0.0.1:6379> pfcount webtoday
(integer) 5
```

### Redis RDB持久化
```bash
C:\Windows\System32>docker ps -a
CONTAINER ID   IMAGE             COMMAND                   CREATED        STATUS                        PORTS                               NAMES
260541ddadb7   redis             "docker-entrypoint.s…"   38 hours ago   Exited (255) 11 seconds ago   6379/tcp                            redis
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   10 days ago    Exited (255) 38 hours ago     0.0.0.0:8081->8081/tcp              nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago   Exited (255) 38 hours ago     0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1

C:\Windows\System32>docker start 260541ddadb7
260541ddadb7

C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
127.0.0.1:6379> lastsave
(integer) 1715672679
127.0.0.1:6379> save
OK
127.0.0.1:6379> lastsave
(integer) 1715672749
127.0.0.1:6379> bgsave
Background saving started
127.0.0.1:6379> lastsave
(integer) 1715672771
# XX秒一次key值改变进行持久化 空值为关闭RDB
127.0.0.1:6379> config get save
1) "save"
2) "3600 1 300 100 60 10000"
127.0.0.1:6379> config set save ""
OK
127.0.0.1:6379> config get save
1) "save"
2) ""
127.0.0.1:6379> config set save "3600 1 300 100 60 10000"
OK
127.0.0.1:6379> config get save
1) "save"
2) "3600 1 300 100 60 10000"
127.0.0.1:6379> exit

C:\Windows\System32>docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED        STATUS         PORTS      NAMES
260541ddadb7   redis     "docker-entrypoint.s…"   39 hours ago   Up 5 minutes   6379/tcp   redis

C:\Windows\System32>docker inspect 260541ddadb7
[
    {
        "Id": "260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4",
        "Created": "2024-05-12T17:19:11.337594962Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "redis-server"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 808,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-05-14T07:44:39.478021771Z",
            "FinishedAt": "2024-05-14T07:44:09.845541718Z"
        },
        "Image": "sha256:9509c4dd19fbb2a8abe044ab2edba261139c141ef4ebba4dcb9e0d9295431288",
        "ResolvConfPath": "/var/lib/docker/containers/260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4/hostname",
        "HostsPath": "/var/lib/docker/containers/260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4/hosts",
        "LogPath": "/var/lib/docker/containers/260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4/260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4-json.log",
        "Name": "/redis",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                30,
                174
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/21f8e0463b7a2a509c15c860b9621e7b1afb5bacba15c2afa58861182034aa7e-init/diff:/var/lib/docker/overlay2/4b7bf46ede5158fff0653d1a386c307645cd0a8b1383369c54b90a4adf0569e1/diff:/var/lib/docker/overlay2/21aa07359d2ebaf7b2478dbca882205c7a4dec3843870a0aa2b81b9e090a0ad0/diff:/var/lib/docker/overlay2/ac7ea050ef71107c4e9890dcb17c35f15ee86c2c1c150a2c402dc6332be3ee69/diff:/var/lib/docker/overlay2/2293d6f059dee682c889fbb97de0bcfe394d62d16f3489b02bd157bc0cce0f04/diff:/var/lib/docker/overlay2/d425416f7c2f85a33d510901421afc60e8b252ac2e6753f925d24910ff093a38/diff:/var/lib/docker/overlay2/9be94e2fe18c3490aa4c009798fe2ac35c9683fe7302873b6c0217b4b726ef86/diff:/var/lib/docker/overlay2/25903f18c1129f8179da81e4f367f92bf6314c6847719ed816a7aabb9ac3b570/diff:/var/lib/docker/overlay2/9701640e8deee6319fb61f95ded93111ba5678c5130707338e2b96136fbf0713/diff",
                "MergedDir": "/var/lib/docker/overlay2/21f8e0463b7a2a509c15c860b9621e7b1afb5bacba15c2afa58861182034aa7e/merged",
                "UpperDir": "/var/lib/docker/overlay2/21f8e0463b7a2a509c15c860b9621e7b1afb5bacba15c2afa58861182034aa7e/diff",
                "WorkDir": "/var/lib/docker/overlay2/21f8e0463b7a2a509c15c860b9621e7b1afb5bacba15c2afa58861182034aa7e/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "e42f0b4b1433be821630317e1586afe93d2714ca0409d2b24117ecb9c49e4d0b",
                "Source": "/var/lib/docker/volumes/e42f0b4b1433be821630317e1586afe93d2714ca0409d2b24117ecb9c49e4d0b/_data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "260541ddadb7",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "6379/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.17",
                "REDIS_VERSION=7.2.4",
                "REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-7.2.4.tar.gz",
                "REDIS_DOWNLOAD_SHA=8d104c26a154b29fd67d6568b4f375212212ad41e0c2caa3d66480e78dbd3b59"
            ],
            "Cmd": [
                "redis-server"
            ],
            "Image": "redis",
            "Volumes": {
                "/data": {}
            },
            "WorkingDir": "/data",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "8dd8f94d97108d161c2319d3bfe858a2343ad31d7c4b25c4474b22a91bca5aed",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "6379/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/8dd8f94d9710",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "2d07c0b58aca5c33adfebf5e4181c1d90529f3972fabadda57a51e5b54ed9f64",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "723799a55daa18520eb1abc474c8d03f2ba4dd30cd6f56f875b4fac0afb60e7b",
                    "EndpointID": "2d07c0b58aca5c33adfebf5e4181c1d90529f3972fabadda57a51e5b54ed9f64",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null
                }
            }
        }
    }
]

C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
127.0.0.1:6379> auth 123456
(error) ERR AUTH <password> called without any password configured for the default user. Are you sure your configuration is correct?
```

```bash
127.0.0.1:6379> clear
# 持久化操作失败，Redis则会停止提供接受操作
127.0.0.1:6379> config get stop-writes-on-bgsave-error
1) "stop-writes-on-bgsave-error"
2) "yes"
# 持久化操作的时候采用LZF压缩字符串和对象
127.0.0.1:6379> config get rdbcompression
1) "rdbcompression"
2) "yes"
# 完整性检查，存储或者加载持久化文件的时候会有性能下降
127.0.0.1:6379> config get rdbchecksum
1) "rdbchecksum"
2) "yes"
# 持久化文件名称设置
127.0.0.1:6379> config get dbfilename
1) "dbfilename"
2) "dump.rdb"
# 持久化文件保存目录设置
127.0.0.1:6379> config get dir
1) "dir"
2) "/data"
127.0.0.1:6379> keys '*'
1) "chinacity"
127.0.0.1:6379> set name zhangsan
OK
127.0.0.1:6379> keys '*'
1) "chinacity"
2) "name"
127.0.0.1:6379> bgsave
Background saving started
127.0.0.1:6379> exit

C:\Windows\System32>docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED        STATUS          PORTS      NAMES
260541ddadb7   redis     "docker-entrypoint.s…"   39 hours ago   Up 24 minutes   6379/tcp   redis

C:\Windows\System32>docker restart 260541ddadb7
260541ddadb7

C:\Windows\System32>docker start 260541ddadb7
260541ddadb7

C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
127.0.0.1:6379> auth 123456
(error) ERR AUTH <password> called without any password configured for the default user. Are you sure your configuration is correct?
127.0.0.1:6379> keys '*'
1) "name"
2) "chinacity"
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379> exit

C:\Windows\System32>docker exec -it 260541ddadb7 bash
root@260541ddadb7:/data# ls
dump.rdb
root@260541ddadb7:/data# cat dump.rdb
REDIS0011�     redis-ver7.2.4�
redis-bits�@�ctime�>Cf�used-mem�h��aof-base���     chinacity..�shanghai  �3vbc2g       �beijin���4 ��t  �namzhangsan�������
```

### Redis AOF持久化
```bash
root@260541ddadb7:/data# exit
exit

C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
# 默认AOF为关闭状态
127.0.0.1:6379> config get appendonly
1) "appendonly"
2) "no"
127.0.0.1:6379> config set appendonly yes
OK
127.0.0.1:6379> config get appendonly
1) "appendonly"
2) "yes"
# 默认AOF文件名
127.0.0.1:6379> config get appendfilename
1) "appendfilename"
2) "appendonly.aof"
# 默认AOF文件存储目录
127.0.0.1:6379> config get appenddirname
1) "appenddirname"
2) "appendonlydir"
# 默认值为everysec(每秒同步) 可设置为always(每一次修改操作都进行同步)/no(操作系统控制同步操作 性能最好)
127.0.0.1:6379> config get appendfsync
1) "appendfsync"
2) "everysec"
# 默认为关闭状态，意思是同时在执行重写操作和写AOF文件时不会丢失数据，但是要忍受可能出现的阻塞与高延迟
127.0.0.1:6379> config get no-appendfsync-on-rewrite
1) "no-appendfsync-on-rewrite"
2) "no"
# 文件超过最小基准值的百分比时进行重写操作，默认百分比为100
127.0.0.1:6379> config get auto-aof-rewrite-percentage
1) "auto-aof-rewrite-percentage"
2) "100"
# 触发重写条件的文件基准值，默认为64M
127.0.0.1:6379> config get auto-aof-rewrite-min-size
1) "auto-aof-rewrite-min-size"
2) "67108864"
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> keys '*'
(empty array)
127.0.0.1:6379> lpush name zhangsan lisi wangwu laoliu
(integer) 4
127.0.0.1:6379> keys '*'
1) "name"
127.0.0.1:6379> exit

C:\Windows\System32>docker exec -it 260541ddadb7 bash
root@260541ddadb7:/data# ls
appendonlydir  dump.rdb
root@260541ddadb7:/data# cd appendonlydir/
root@260541ddadb7:/data/appendonlydir# ls
appendonly.aof.1.base.rdb  appendonly.aof.1.incr.aof  appendonly.aof.manifest
root@260541ddadb7:/data/appendonlydir# cat appendonly.aof.1.incr.aof
*2
$6
SELECT
$1
0
*1
$7
flushdb
*6
$5
lpush
$4
name
$8
zhangsan
$4
lisi
$6
wangwu
$6
laoliu
```

### Redis 主从模式搭建

#### 命令搭建
```bash
root@DESKTOP-9MBCA87:/home/toubun# ps -ef | grep redis
toubun     409   407  0 18:12 pts/2    00:00:00 redis-server *:6379
root       421    34  0 18:17 pts/1    00:00:00 grep redis
# 命令搭建主从模式
root@DESKTOP-9MBCA87:/home/toubun# redis-server --port 6380 --slaveof 127.0.0.1 6379 --daemonize yes
422:C 14 May 2024 18:18:54.844 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
root@DESKTOP-9MBCA87:/home/toubun# sysctl vm.overcommit_memory=1
vm.overcommit_memory = 1
# 命令启动从机 主机为6379的redis
root@DESKTOP-9MBCA87:/home/toubun# redis-server --port 6380 --slaveof 127.0.0.1 6379 --daemonize yes
# 查看redis进程
root@DESKTOP-9MBCA87:/home/toubun# ps -ef | grep redis
toubun     409   407  0 18:12 pts/2    00:00:00 redis-server *:6379
root       423    26  0 18:18 ?        00:00:00 redis-server *:6380
root       434    34  0 18:19 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/home/toubun# redis-cli -p 6380
# 从机不能写入操作
127.0.0.1:6380> set name zhangsan
(error) READONLY You can't write against a read only replica.
```
```bash
# 从机信息
127.0.0.1:6380> info replication
# Replication
role:slave
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:8
master_sync_in_progress:0
slave_read_repl_offset:266
slave_repl_offset:266
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:266
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:15
repl_backlog_histlen:252
# 启动进入新redis-server
127.0.0.1:6380> slaveof no one
OK
127.0.0.1:6380> set name zhangsan
OK
127.0.0.1:6380> get name
"zhangsan"
127.0.0.1:6380> info replication
# Replication
role:master
connected_slaves:0
master_failover_state:no-failover
master_replid:be5e74e3a248be28d78a2d219957186046a551eb
master_replid2:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_repl_offset:480
second_repl_offset:421
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:15
repl_backlog_histlen:466
127.0.0.1:6380> flushdb
OK
# 连接主机查看信息
127.0.0.1:6380> slaveof 127.0.0.1 6379
OK
127.0.0.1:6380> info replication
# Replication
role:slave
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_read_repl_offset:434
slave_repl_offset:434
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:434
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:435
repl_backlog_histlen:0
# 写操作
127.0.0.1:6380> set name zhangsan
(error) READONLY You can't write against a read only replica.
```
```bash
127.0.0.1:6380> keys '*'
(empty array)
127.0.0.1:6380> exit
root@DESKTOP-9MBCA87:/home/toubun# redis-cli -p 6379
127.0.0.1:6379> info replication
# Replication
role:master
connected_slaves:1
slave0:ip=127.0.0.1,port=6380,state=online,offset=490,lag=1
master_failover_state:no-failover
master_replid:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:490
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:490
127.0.0.1:6379> keys '*'
(empty array)
127.0.0.1:6379> set name zhangsan
OK
127.0.0.1:6379> keys '*'
1) "name"
127.0.0.1:6379> exit
# 验证主从复制
root@DESKTOP-9MBCA87:/home/toubun# redis-cli -p 6380
127.0.0.1:6380> keys '*'
1) "name"
127.0.0.1:6380> get name
"zhangsan"
127.0.0.1:6380> exit
root@DESKTOP-9MBCA87:/home/toubun# ps -ef | grep redis
toubun     409   407  0 18:12 pts/2    00:00:01 redis-server *:6379
root       423    26  0 18:18 ?        00:00:00 redis-server *:6380
root       440    34  0 18:27 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/home/toubun# kill 423
root@DESKTOP-9MBCA87:/home/toubun# ps -ef | grep redis
toubun     409   407  0 18:12 pts/2    00:00:01 redis-server *:6379
root       442    34  0 18:27 pts/1    00:00:00 grep redis
```

```bash
toubun@DESKTOP-9MBCA87:~$ redis-server
409:C 14 May 2024 18:12:15.741 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
409:C 14 May 2024 18:12:15.741 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
409:C 14 May 2024 18:12:15.741 * Redis version=7.2.4, bits=64, commit=00000000, modified=0, pid=409, just started
409:C 14 May 2024 18:12:15.741 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
409:M 14 May 2024 18:12:15.741 * Increased maximum number of open files to 10032 (it was originally set to 1024).
409:M 14 May 2024 18:12:15.741 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 7.2.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 409
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

409:M 14 May 2024 18:12:15.742 * Server initialized
409:M 14 May 2024 18:12:15.742 * Loading RDB produced by version 7.2.4
409:M 14 May 2024 18:12:15.742 * RDB age 13 seconds
409:M 14 May 2024 18:12:15.742 * RDB memory usage when created 0.83 Mb
409:M 14 May 2024 18:12:15.742 * Done loading RDB, keys loaded: 0, keys expired: 0.
409:M 14 May 2024 18:12:15.742 * DB loaded from disk: 0.000 seconds
409:M 14 May 2024 18:12:15.742 * Ready to accept connections tcp
409:M 14 May 2024 18:18:54.846 * Replica 127.0.0.1:6380 asks for synchronization
409:M 14 May 2024 18:18:54.846 * Full resync requested by replica 127.0.0.1:6380
409:M 14 May 2024 18:18:54.846 * Replication backlog created, my new replication IDs are '076e4252fa539f17a04b2d8eafc05292cb4424f1' and '0000000000000000000000000000000000000000'
409:M 14 May 2024 18:18:54.846 * Delay next BGSAVE for diskless SYNC
409:M 14 May 2024 18:18:59.802 * Starting BGSAVE for SYNC with target: replicas sockets
409:M 14 May 2024 18:18:59.802 * Background RDB transfer started by pid 429
429:C 14 May 2024 18:18:59.802 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
409:M 14 May 2024 18:18:59.803 * Diskless rdb transfer, done reading from pipe, 1 replicas still up.
409:M 14 May 2024 18:18:59.805 * Background RDB transfer terminated with success
409:M 14 May 2024 18:18:59.805 * Streamed RDB transfer with replica 127.0.0.1:6380 succeeded (socket). Waiting for REPLCONF ACK from replica to enable streaming
409:M 14 May 2024 18:18:59.805 * Synchronization with replica 127.0.0.1:6380 succeeded
409:M 14 May 2024 18:23:52.966 * Connection with replica 127.0.0.1:6380 lost.
409:M 14 May 2024 18:24:33.902 * Replica 127.0.0.1:6380 asks for synchronization
409:M 14 May 2024 18:24:33.902 * Partial resynchronization not accepted: Replication ID mismatch (Replica asked for 'be5e74e3a248be28d78a2d219957186046a551eb', my replication IDs are '076e4252fa539f17a04b2d8eafc05292cb4424f1' and '0000000000000000000000000000000000000000')
409:M 14 May 2024 18:24:33.902 * Delay next BGSAVE for diskless SYNC
409:M 14 May 2024 18:24:38.779 * Starting BGSAVE for SYNC with target: replicas sockets
409:M 14 May 2024 18:24:38.779 * Background RDB transfer started by pid 436
436:C 14 May 2024 18:24:38.780 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
409:M 14 May 2024 18:24:38.780 * Diskless rdb transfer, done reading from pipe, 1 replicas still up.
409:M 14 May 2024 18:24:38.782 * Background RDB transfer terminated with success
409:M 14 May 2024 18:24:38.782 * Streamed RDB transfer with replica 127.0.0.1:6380 succeeded (socket). Waiting for REPLCONF ACK from replica to enable streaming
409:M 14 May 2024 18:24:38.782 * Synchronization with replica 127.0.0.1:6380 succeeded
409:M 14 May 2024 18:27:34.161 * Connection with replica 127.0.0.1:6380 lost.
```

#### 修改配置文件搭建
```bash
root@DESKTOP-9MBCA87:/home/toubun# cd /etc/redis/
root@DESKTOP-9MBCA87:/etc/redis# ls
dump.rdb  redis.conf
root@DESKTOP-9MBCA87:/etc/redis# vim
root@DESKTOP-9MBCA87:/etc/redis# vim redis_6380.conf
```
```bash
# i
slaveof 127.0.0.1 6379
port 6380
daemonize yes
# ESC
# :wq
# ENTER
```
```bash
root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_6380.conf
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   407  0 18:12 pts/2    00:00:03 redis-server *:6379
root       450    26  0 18:55 ?        00:00:00 redis-server *:6380
root       458    34  0 18:55 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 6380
127.0.0.1:6380> info replication
# Replication
role:slave
master_host:127.0.0.1
master_port:6379
master_link_status:up
master_last_io_seconds_ago:6
master_sync_in_progress:0
slave_read_repl_offset:774
slave_repl_offset:774
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:774
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:747
repl_backlog_histlen:28
127.0.0.1:6380> set name zhangsan
(error) READONLY You can't write against a read only replica.
```

### Redis 哨兵模式搭建
```bash
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   406  0 19:44 ?        00:00:04 redis-server *:6379
root       450    26  0 20:27 ?        00:00:01 redis-server *:6380
root       463    34  0 20:45 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# redis-server --port 6381 --slaveof 127.0.0.1 6379 --daemonize yes
# 1主2从
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   406  0 19:44 ?        00:00:04 redis-server *:6379
root       450    26  0 20:27 ?        00:00:01 redis-server *:6380
root       465    26  0 20:46 ?        00:00:00 redis-server *:6381
root       472    34  0 20:46 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# vim sentinel_1.conf
```
```bash
port 9100
sentinel monitor smaster 127.0.0.1 6379 2
daemonize yes
```
```bash
root@DESKTOP-9MBCA87:/etc/redis# vim sentinel_2.conf
```
```bash
port 9101
sentinel monitor smaster 127.0.0.1 6379 2
daemonize yes
```
```bash
root@DESKTOP-9MBCA87:/etc/redis# vim sentinel_3.conf
```
```bash
port 9102
sentinel monitor smaster 127.0.0.1 6379 2
daemonize yes
```
```bash
root@DESKTOP-9MBCA87:/etc/redis# ls
dump.rdb  redis.conf  redis_6380.conf  sentinel_1.conf  sentinel_2.conf  sentinel_3.conf
root@DESKTOP-9MBCA87:/etc/redis# redis-server sentinel_1.conf --sentinel
root@DESKTOP-9MBCA87:/etc/redis# redis-server sentinel_2.conf --sentinel
root@DESKTOP-9MBCA87:/etc/redis# redis-server sentinel_3.conf --sentinel
root@DESKTOP-9MBCA87:/etc/redis# systemctl stop redis-server # 关闭主机失败
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   406  0 19:44 ?        00:00:06 redis-server *:6379 # 主机依然存在
root       450    26  0 20:27 ?        00:00:03 redis-server *:6380
root       465    26  0 20:46 ?        00:00:02 redis-server *:6381
root       499    26  0 21:07 ?        00:00:00 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:00 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:00 redis-server *:9102 [sentinel]
root       526    34  0 21:11 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# systemctl list-units --type=service | grep redis
redis-server.service    loaded inactive dead    Advanced key-value store
root@DESKTOP-9MBCA87:/etc/redis# sudo kill 409 # 解决方法
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root       450    26  0 20:27 ?        00:00:04 redis-server *:6380
root       465    26  0 20:46 ?        00:00:02 redis-server *:6381
root       499    26  0 21:07 ?        00:00:01 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:01 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:01 redis-server *:9102 [sentinel]
root       533    34  0 21:16 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 9100
127.0.0.1:9100> info sentinel
# Sentinel
sentinel_masters:1
sentinel_tilt:0
sentinel_tilt_since_seconds:-1
sentinel_running_scripts:0
sentinel_scripts_queue_length:0
sentinel_simulate_failure_flags:0
master0:name=smaster,status=ok,address=127.0.0.1:6381,slaves=2,sentinels=3
127.0.0.1:9100> exit
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 6381 # 新的主机号
127.0.0.1:6381> info replication
# Replication
role:master # 成为master
connected_slaves:1
slave0:ip=127.0.0.1,port=6380,state=online,offset=142471,lag=1
master_failover_state:no-failover
master_replid:fe6502c50752a4c3eacefb9eaf3e0140de58c57e
master_replid2:076e4252fa539f17a04b2d8eafc05292cb4424f1
master_repl_offset:142616
second_repl_offset:102345
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:747
repl_backlog_histlen:141870
127.0.0.1:6381> exit
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 6380
127.0.0.1:6380> config get slaveof
1) "slaveof"
2) "127.0.0.1 6381"
127.0.0.1:6380> exit
root@DESKTOP-9MBCA87:/etc/redis# systemctl start redis-server # 启动命令
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root       450    26  0 20:27 ?        00:00:04 redis-server *:6380
root       465    26  0 20:46 ?        00:00:03 redis-server *:6381
root       499    26  0 21:07 ?        00:00:02 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:02 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:02 redis-server *:9102 [sentinel]
redis      539    26  0 21:22 ?        00:00:00 /usr/bin/redis-server 127.0.0.1:6379 # 重新启动原主机
root       545    34  0 21:22 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 6379
127.0.0.1:6379> info replication
# Replication
role:slave # 主机=>从属
master_host:127.0.0.1
master_port:6381 # 新主机
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_read_repl_offset:204643
slave_repl_offset:204643
slave_priority:100
slave_read_only:1
replica_announced:1
connected_slaves:0
master_failover_state:no-failover
master_replid:fe6502c50752a4c3eacefb9eaf3e0140de58c57e
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:204643
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:174936
repl_backlog_histlen:29708
127.0.0.1:6379> config get slaveof
1) "slaveof"
2) "127.0.0.1 6381" # 新主机
127.0.0.1:6379> exit
root@DESKTOP-9MBCA87:/etc/redis# ls
dump.rdb  redis.conf  redis_6380.conf  sentinel_1.conf  sentinel_2.conf  sentinel_3.conf
root@DESKTOP-9MBCA87:/etc/redis# cat redis.conf
# Redis configuration file example.
#
# Note that in order to read the configuration file, Redis must be
# started with the file path as first argument:
#
# ./redis-server /path/to/redis.conf

# 此处省略...

# Generated by CONFIG REWRITE
save 3600 1
save 300 100
save 60 10000
replicaof 127.0.0.1 6381 # 新主机号
latency-tracking-info-percentiles 50 99 99.9
user default on nopass sanitize-payload ~* &* +@all
```

### Redis 集群搭建
```bash
toubun@DESKTOP-9MBCA87:~$ sudo su
[sudo] password for toubun: 123456

root@DESKTOP-9MBCA87:/home/toubun# cd /etc/redis

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9000.conf
# 新建 redis_9000.conf 文件,并添加以下配置信息
port 9000
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9000.pid
cluster-enabled yes
cluster-config-file nodes-9000.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9001.conf
# 新建 redis_9001.conf 文件,并添加以下配置信息
port 9001
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9001.pid
cluster-enabled yes
cluster-config-file nodes-9001.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9002.conf
# 新建 redis_9002.conf 文件,并添加以下配置信息
port 9002
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9002.pid
cluster-enabled yes
cluster-config-file nodes-9002.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9003.conf
# 新建 redis_9003.conf 文件,并添加以下配置信息
port 9003
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9003.pid
cluster-enabled yes
cluster-config-file nodes-9003.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9004.conf
# 新建 redis_9004.conf 文件,并添加以下配置信息
port 9004
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9004.pid
cluster-enabled yes
cluster-config-file nodes-9004.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9005.conf
# 新建 redis_9005.conf 文件,并添加以下配置信息
port 9005
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9005.pid
cluster-enabled yes
cluster-config-file nodes-9005.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# ls
dump.rdb  redis.conf       redis_9000.conf  redis_9002.conf  redis_9004.conf  sentinel_1.conf  sentinel_3.conf
exit      redis_6380.conf  redis_9001.conf  redis_9003.conf  redis_9005.conf  sentinel_2.conf

root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        22    20  0 16:22 pts/1    00:00:00 vim redis_9000.conf # 需关闭
root        54    20  0 16:46 pts/1    00:00:00 grep redis
# root@DESKTOP-9MBCA87:/etc/redis# sudo rm .redis_9000.conf.swp # 但依然存在
# root@DESKTOP-9MBCA87:/etc/redis# kill 22 # 但依然存在
# 重启Debian后发现已成功清除

root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        85    83  0 16:57 pts/1    00:00:00 grep redis

root@DESKTOP-9MBCA87:/etc/redis# rm -rf /var/run/redis_*

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9000.conf
86:C 15 May 2024 17:07:52.281 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode
86:C 15 May 2024 17:07:52.281 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

root@DESKTOP-9MBCA87:/etc/redis# sysctl vm.overcommit_memory=1
vm.overcommit_memory = 1

# 启动redis-server
root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9000.conf
93:C 15 May 2024 17:08:17.794 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9001.conf
95:C 15 May 2024 17:09:02.891 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9002.conf
101:C 15 May 2024 17:09:06.170 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9003.conf
107:C 15 May 2024 17:09:09.859 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9004.conf
113:C 15 May 2024 17:09:12.188 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9005.conf
119:C 15 May 2024 17:09:15.258 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

# 验证进程
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        87    77  0 17:07 ?        00:00:00 redis-server *:9000 [cluster]
root        96    77  0 17:09 ?        00:00:00 redis-server *:9001 [cluster]
root       102    77  0 17:09 ?        00:00:00 redis-server *:9002 [cluster]
root       108    77  0 17:09 ?        00:00:00 redis-server *:9003 [cluster]
root       114    77  0 17:09 ?        00:00:00 redis-server *:9004 [cluster]
root       120    77  0 17:09 ?        00:00:00 redis-server *:9005 [cluster]
root       126    83  0 17:10 pts/1    00:00:00 grep redis

# 验证现在集群还未搭建完成
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 9000
127.0.0.1:9000> CLUSTER INFO
cluster_state:fail
cluster_slots_assigned:0
cluster_slots_ok:0
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:1
cluster_size:0
cluster_current_epoch:0
cluster_my_epoch:0
cluster_stats_messages_sent:0
cluster_stats_messages_received:0
total_cluster_links_buffer_limit_exceeded:0
127.0.0.1:9000> exit

# 一主一从的方式搭建集群
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster create --cluster-replicas 1 127.0.0.1:9000 127.0.0.1:9001 127.0.0.1:9002 127.0.0.1:9003 127.0.0.1:9004 127.0.0.1:9005 # 注意ip地址，可参考【问题22.5】
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 127.0.0.1:9004 to 127.0.0.1:9000
Adding replica 127.0.0.1:9005 to 127.0.0.1:9001
Adding replica 127.0.0.1:9003 to 127.0.0.1:9002
>>> Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master # 提醒是在同一台机器上所做操作
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[0-5460] (5461 slots) master
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
Can I set the above configuration? (type 'yes' to accept): yes # yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
.
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   slots: (0 slots) slave
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   slots: (0 slots) slave
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   slots: (0 slots) slave
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered. # 哈希槽分配

# 验证集群搭建完成
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 9000
127.0.0.1:9000> CLUSTER INFO
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_ping_sent:61
cluster_stats_messages_pong_sent:65
cluster_stats_messages_sent:126
cluster_stats_messages_ping_received:60
cluster_stats_messages_pong_received:61
cluster_stats_messages_meet_received:5
cluster_stats_messages_received:126
total_cluster_links_buffer_limit_exceeded:0

127.0.0.1:9000> CLUSTER NODES
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715776781089 2 connected 5461-10922
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715776780086 2 connected
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715776781000 1 connected
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715776783095 3 connected
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715776780000 1 connected 0-5460
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715776782092 3 connected 10923-16383

127.0.0.1:9000> exit
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

127.0.0.1:9000> set name zhangsan
-> Redirected to slot [5798] located at 127.0.0.1:9001
OK

127.0.0.1:9001> get name
"zhangsan"
```

### Redis 集群分片机制
```bash
127.0.0.1:9001> CLUSTER KEYSLOT name
(integer) 5798 # 9001 slots:[5461-10922] (5462 slots) master
```

### Redis 集群分片操作

#### 添加新Node至集群
```bash
root@DESKTOP-9MBCA87:/etc/redis# ls
appendonlydir  nodes-9000.conf  nodes-9003.conf  redis.conf       redis_9001.conf  redis_9004.conf  sentinel_2.conf
dump.rdb       nodes-9001.conf  nodes-9004.conf  redis_6380.conf  redis_9002.conf  redis_9005.conf  sentinel_3.conf
exit           nodes-9002.conf  nodes-9005.conf  redis_9000.conf  redis_9003.conf  sentinel_1.conf

root@DESKTOP-9MBCA87:/etc/redis# cp redis_9005.conf redis_9006.conf

root@DESKTOP-9MBCA87:/etc/redis# ls
appendonlydir  nodes-9000.conf  nodes-9003.conf  redis.conf       redis_9001.conf  redis_9004.conf  sentinel_1.conf
dump.rdb       nodes-9001.conf  nodes-9004.conf  redis_6380.conf  redis_9002.conf  redis_9005.conf  sentinel_2.conf
exit           nodes-9002.conf  nodes-9005.conf  redis_9000.conf  redis_9003.conf  redis_9006.conf  sentinel_3.conf

root@DESKTOP-9MBCA87:/etc/redis# vim redis_9006.conf
port 9006
daemonize yes
protected-mode no
appendonly yes
pidfile /var/run/redis_9006.pid
cluster-enabled yes
cluster-config-file nodes-9006.conf
cluster-node-timeout 15000

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9006.conf
26:C 15 May 2024 23:02:33.349 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode
26:C 15 May 2024 23:02:33.349 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

root@DESKTOP-9MBCA87:/etc/redis# sysctl vm.overcommit_memory=1
vm.overcommit_memory = 1

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9006.conf
33:C 15 May 2024 23:02:47.801 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        27    14  0 23:02 ?        00:00:00 redis-server *:9006 [cluster]
root        37    20  0 23:03 pts/1    00:00:00 grep redis

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9000.conf
45:C 15 May 2024 23:05:53.754 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9001.conf
51:C 15 May 2024 23:05:57.713 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9002.conf
57:C 15 May 2024 23:06:01.410 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9003.conf
63:C 15 May 2024 23:06:05.113 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9004.conf
69:C 15 May 2024 23:06:08.689 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9005.conf
81:C 15 May 2024 23:06:13.801 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        27    14  0 23:02 ?        00:00:00 redis-server *:9006 [cluster]
root        46    14  0 23:05 ?        00:00:00 redis-server *:9000 [cluster]
root        52    14  0 23:05 ?        00:00:00 redis-server *:9001 [cluster]
root        58    14  0 23:06 ?        00:00:00 redis-server *:9002 [cluster]
root        64    14  0 23:06 ?        00:00:00 redis-server *:9003 [cluster]
root        70    14  0 23:06 ?        00:00:00 redis-server *:9004 [cluster]
root        82    14  0 23:06 ?        00:00:00 redis-server *:9005 [cluster]
root        91    20  0 23:06 pts/1    00:00:00 grep redis
# 经验证，此时9000-9005集群状态正常

root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster help
Cluster Manager Commands:
  create         host1:port1 ... hostN:portN
                 --cluster-replicas <arg>
  check          <host:port> or <host> <port> - separated by either colon or space
                 --cluster-search-multiple-owners
  info           <host:port> or <host> <port> - separated by either colon or space
  fix            <host:port> or <host> <port> - separated by either colon or space
                 --cluster-search-multiple-owners
                 --cluster-fix-with-unreachable-masters
  reshard        <host:port> or <host> <port> - separated by either colon or space
                 --cluster-from <arg>
                 --cluster-to <arg>
                 --cluster-slots <arg>
                 --cluster-yes
                 --cluster-timeout <arg>
                 --cluster-pipeline <arg>
                 --cluster-replace
  rebalance      <host:port> or <host> <port> - separated by either colon or space
                 --cluster-weight <node1=w1...nodeN=wN>
                 --cluster-use-empty-masters
                 --cluster-timeout <arg>
                 --cluster-simulate
                 --cluster-pipeline <arg>
                 --cluster-threshold <arg>
                 --cluster-replace
  add-node       new_host:new_port existing_host:existing_port
                 --cluster-slave
                 --cluster-master-id <arg>
  del-node       host:port node_id
  call           host:port command arg arg .. arg
                 --cluster-only-masters
                 --cluster-only-replicas
  set-timeout    host:port milliseconds
  import         host:port
                 --cluster-from <arg>
                 --cluster-from-user <arg>
                 --cluster-from-pass <arg>
                 --cluster-from-askpass
                 --cluster-copy
                 --cluster-replace
  backup         host:port backup_directory
  help

For check, fix, reshard, del-node, set-timeout, info, rebalance, call, import, backup you can specify the host and port of any working node in the cluster.

Cluster Manager Options:
  --cluster-yes  Automatic yes to cluster commands prompts

# 添加Node
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster add-node 127.0.0.1:9006 127.0.0.1:9000
>>> Adding node 127.0.0.1:9006 to cluster 127.0.0.1:9000
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   slots: (0 slots) slave
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   slots: (0 slots) slave
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   slots: (0 slots) slave
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
>>> Getting functions from cluster
>>> Send FUNCTION LIST to 127.0.0.1:9006 to verify there is no functions in it
>>> Send FUNCTION RESTORE to 127.0.0.1:9006
>>> Send CLUSTER MEET to node 127.0.0.1:9006 to make it join the cluster.
[OK] New node added correctly.

root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

127.0.0.1:9000> CLUSTER INFO
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:7
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_ping_sent:501
cluster_stats_messages_pong_sent:507
cluster_stats_messages_sent:1008
cluster_stats_messages_ping_received:506
cluster_stats_messages_pong_received:497
cluster_stats_messages_meet_received:1
cluster_stats_messages_received:1004
total_cluster_links_buffer_limit_exceeded:0

127.0.0.1:9000> CLUSTER NODES
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715786054000 1 connected 0-5460
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715786055123 1 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715786057000 3 connected 10923-16383
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715786057129 2 connected
e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006@19006 master - 0 1715786055000 0 connected # master
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715786058132 2 connected 5461-10922
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715786056125 3 connected

127.0.0.1:9000> exit

# 集群重新分片
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster reshard 127.0.0.1 9000
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   slots: (0 slots) slave
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   slots: (0 slots) slave
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
M: e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006
   slots: (0 slots) master
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   slots: (0 slots) slave
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
How many slots do you want to move (from 1 to 16384)? 2000
What is the receiving node ID? e57e1427b7045d8469c8fafcca7540c656b8cdc3
Please enter all the source node IDs.
  Type 'all' to use all the nodes as source nodes for the hash slots.
  Type 'done' once you entered all the source nodes IDs.
Source node #1: ca650cf3796e78fa346b96d1b8fef040a570e1ed
Source node #2: done

Ready to move 2000 slots.
  Source nodes:
    M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
       slots:[0-5460] (5461 slots) master
       1 additional replica(s)
  Destination node:
    M: e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006
       slots: (0 slots) master
  Resharding plan:
    Moving slot 0 from ca650cf3796e78fa346b96d1b8fef040a570e1ed
    ...
    Moving slot 1999 from ca650cf3796e78fa346b96d1b8fef040a570e1ed
Do you want to proceed with the proposed reshard plan (yes/no)? yes
    Moving slot 0 from 127.0.0.1:9000 to 127.0.0.1:9006:
    ...
    Moving slot 1999 from 127.0.0.1:9000 to 127.0.0.1:9006:

# 验证
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

127.0.0.1:9000> CLUSTER NODES
# redis-cli -p 9000 cluster nodes
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715786324000 1 connected 2000-5460
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715786323000 1 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715786323908 3 connected 10923-16383
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715786324910 2 connected
e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006@19006 master - 0 1715786323000 7 connected 0-1999
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715786324000 2 connected 5461-10922
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715786325913 3 connected

127.0.0.1:9000> exit
```

#### 删除集群中Node
```bash
# 集群重新分片
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster reshard 127.0.0.1 9000
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[2000-5460] (3461 slots) master
   1 additional replica(s)
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   slots: (0 slots) slave
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   slots: (0 slots) slave
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
M: e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006
   slots:[0-1999] (2000 slots) master
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   slots: (0 slots) slave
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
How many slots do you want to move (from 1 to 16384)? 2000
What is the receiving node ID? ca650cf3796e78fa346b96d1b8fef040a570e1ed
Please enter all the source node IDs.
  Type 'all' to use all the nodes as source nodes for the hash slots.
  Type 'done' once you entered all the source nodes IDs.
Source node #1: e57e1427b7045d8469c8fafcca7540c656b8cdc3
Source node #2: done

Ready to move 2000 slots.
  Source nodes:
    M: e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006
       slots:[0-1999] (2000 slots) master
  Destination node:
    M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
       slots:[2000-5460] (3461 slots) master
       1 additional replica(s)
  Resharding plan:
    Moving slot 0 from e57e1427b7045d8469c8fafcca7540c656b8cdc3
    ...
    Moving slot 1 from e57e1427b7045d8469c8fafcca7540c656b8cdc3
Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 0 from 127.0.0.1:9006 to 127.0.0.1:9000:
...
Moving slot 1999 from 127.0.0.1:9006 to 127.0.0.1:9000:

root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

127.0.0.1:9000> CLUSTER NODES
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715786708000 8 connected 0-5460
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715786713079 8 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715786714082 3 connected 10923-16383
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715786713000 2 connected
e57e1427b7045d8469c8fafcca7540c656b8cdc3 127.0.0.1:9006@19006 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715786714000 8 connected # slave
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715786715085 2 connected 5461-10922
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715786713000 3 connected

127.0.0.1:9000> exit

# 删除Node
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster del-node 127.0.0.1:9006@19006 e57e1427b7045d8469c8fafcca7540c656b8cdc3
>>> Removing node e57e1427b7045d8469c8fafcca7540c656b8cdc3 from cluster 127.0.0.1:9006
>>> Sending CLUSTER FORGET messages to the cluster...
>>> Sending CLUSTER RESET SOFT to the deleted node.

# 验证
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

127.0.0.1:9000> CLUSTER NODES
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715786893000 8 connected 0-5460
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715786893643 8 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715786894000 3 connected 10923-16383
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715786893000 2 connected
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715786892000 2 connected 5461-10922
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715786894645 3 connected

127.0.0.1:9000> exit
```

#### 集群故障恢复
```bash
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        27    14  0 23:02 ?        00:00:02 redis-server *:9006 [cluster]
root        46    14  0 23:05 ?        00:00:02 redis-server *:9000 [cluster]
root        52    14  0 23:05 ?        00:00:01 redis-server *:9001 [cluster]
root        58    14  0 23:06 ?        00:00:02 redis-server *:9002 [cluster]
root        64    14  0 23:06 ?        00:00:01 redis-server *:9003 [cluster]
root        70    14  0 23:06 ?        00:00:01 redis-server *:9004 [cluster]
root        82    14  0 23:06 ?        00:00:01 redis-server *:9005 [cluster]
root       108    20  0 23:29 pts/1    00:00:00 grep redis

root@DESKTOP-9MBCA87:/etc/redis# kill 27 # 9006

root@DESKTOP-9MBCA87:/etc/redis# kill 46 # 9000

root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9001

127.0.0.1:9001> CLUSTER NODES
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715787130987 3 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715787133996 3 connected 10923-16383
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 master - 1715787124969 1715787121000 8 disconnected 0-5460 # master
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 myself,master - 0 1715787132000 2 connected 5461-10922
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715787132993 2 connected
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715787132000 8 connected # slave

127.0.0.1:9001> CLUSTER NODES
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715787140014 3 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715787138008 3 connected 10923-16383
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 master,fail? - 1715787124969 1715787121000 8 disconnected 0-5460 # fail?
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 myself,master - 0 1715787139000 2 connected 5461-10922
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715787138000 2 connected
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715787139011 8 connected # slave

127.0.0.1:9001> CLUSTER NODES
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715787254375 3 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715787255378 3 connected 10923-16383
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 master,fail - 1715787124969 1715787121000 8 disconnected # fail
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 myself,master - 0 1715787253000 2 connected 5461-10922
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715787256381 2 connected
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 master - 0 1715787255000 9 connected 0-5460 # master

127.0.0.1:9001> exit

# 重新启动9000
root@DESKTOP-9MBCA87:/etc/redis# redis-server redis_9000.conf
111:C 15 May 2024 23:39:09.001 # WARNING: Changing databases number from 16 to 1 since we are in cluster mode

root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9001
127.0.0.1:9001> CLUSTER NODES
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715787565000 3 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715787564301 3 connected 10923-16383
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 slave 44117b0656484f9f847a7bdd33201ee9fcfeacdb 0 1715787565000 9 connected # slave
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 myself,master - 0 1715787564000 2 connected 5461-10922
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715787565304 2 connected
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 master - 0 1715787566307 9 connected 0-5460 # master

127.0.0.1:9001> exit
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -c -p 9000

# 手动主从切换：可进入从节点使用CLUSTER FAILOVER命令进行切换
127.0.0.1:9000> CLUSTER FAILOVER
OK

127.0.0.1:9000> CLUSTER NODES
8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001@19001 master - 0 1715787675279 2 connected 5461-10922
44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003@19003 slave ca650cf3796e78fa346b96d1b8fef040a570e1ed 0 1715787675000 10 connected # slave
8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005@19005 slave 34c1ea22a04c30d7e28223d0a21716a2325ce6af 0 1715787676282 3 connected
34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002@19002 master - 0 1715787677285 3 connected 10923-16383
03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004@19004 slave 8aeb37884db4ee8568c7fc3cbfef6be14003581f 0 1715787675000 2 connected
ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000@19000 myself,master - 0 1715787673000 10 connected 0-5460 # master
```

```bash

```

```bash

```

```bash

```

```bash

```

```bash

```

```bash

```

## 拓展内容

### Vim退出
* 退出输入模式，先按一下[ESC]键（有时要多按两下），然后执行：
* :w!
* :w ——保存当前文件
* :wq —— 存盘退出(与指令 :x 功能相同)
* :q —— 直接退出，如已修改会提示是否保存
* :q! ——不保存直接退出

### `ps -ef | grep redis`
```bash
ps -ef | grep redis
root        87    77  0 17:07 ?        00:00:05 redis-server *:9000 [cluster]
...
root       149   147  0 18:48 pts/1    00:00:00 grep redis
```
这个命令是在Unix或Linux系统中使用的，用于查找与`redis`相关的进程。
1. **命令**:
```bash
ps -ef | grep redis
```
* `ps -ef`: 这是一个常用的命令，用于显示系统上所有正在运行的进程的详细信息。
	+ `-e`: 显示所有进程。
	+ `-f`: 使用完整的格式显示进程信息。
* `|`: 这是一个管道符号，用于将一个命令的输出作为另一个命令的输入。
* `grep redis`: 这是一个文本搜索命令，它会搜索包含“redis”的行。
2. **输出解释**:
	* `root 87 77 0 17:07 ? 00:00:05 redis-server *:9000 [cluster]`
		+ `root`: 进程的所有者，这里是root用户。
		+ `87`: 进程的ID (PID)。
		+ `77`: 父进程的ID (PPID)。
		+ `0`: 进程使用的终端类型，`?` 表示没有与终端关联。
		+ `17:07`: 进程启动的时间。
		+ `00:00:05`: 进程已经运行的时间。
		+ `redis-server *:9000 [cluster]`: 这是启动进程的命令或程序名。这表示一个Redis服务器正在监听9000端口，并且它是集群模式。
	* 接下来的几行与第一行类似，只是它们显示的是其他Redis服务器的进程信息，分别监听9001、9002、9003、9004和9005端口。
	* `root 149 147 0 18:48 pts/1 00:00:00 grep redis`: 这是`grep redis`命令自身的进程信息。因为`grep`命令也在搜索与`redis`相关的进程，所以它自己的进程也会被显示出来。

### `redis-cli --cluster create --cluster-replicas 1`
```bash
redis-cli --cluster create --cluster-replicas 1 192.168.11.128:9000 192.168.11.128:9001 192.168.11.128:9002 192.168.11.128:9003 192.168.11.128:9004 192.168.11.128:9005
```
`redis-cli --cluster create` 命令用于创建 Redis 集群。在 Redis 3.0 及更高版本中，引入了集群模式，允许你在多个 Redis 实例之间自动分配数据，并提供高可用性。下面我将解释你给出的命令：
1. **redis-cli**: 这是 Redis 的命令行界面工具，用于与 Redis 服务器进行交互。
2. **--cluster**: 指示 `redis-cli` 使用集群模式进行操作。
3. **create**: 表示要创建一个新的 Redis 集群。
4. **--cluster-replicas 1**: 这意味着你希望为每个主节点（master node）配置一个从节点（replica node）。在你的例子中，你总共有6个 Redis 实例，所以它们将被配置为3个主节点和3个从节点。
5. **IP地址和端口号**:
	* `192.168.11.128:9000` 到 `192.168.11.128:9005`: 这些是你要加入集群的 Redis 实例的 IP 地址和端口号。
**创建集群的过程**：
1. `redis-cli` 会首先检查所有提供的实例是否都可以达到，并且它们是否都是干净的（即没有之前的数据）。
2. 然后，它会将实例组织成主节点和从节点的组合。由于你指定了 `--cluster-replicas 1`，它将创建3个主节点和3个从节点。
3. 接下来，它会使用哈希槽（hash slots）来分配数据。Redis 集群有 16384 个哈希槽，并且这些槽将被分配给主节点。
4. 从节点会复制其对应主节点的数据，提供数据的冗余和高可用性。
5. 最后，`redis-cli` 会提示你输入 `yes` 来确认创建集群。
注意：在运行此命令之前，请确保：
* 所有 Redis 实例都已正确配置并启动。
* 它们都可以相互通信（没有防火墙或网络问题）。
* 它们都是空的（即没有之前的数据），除非你确定要导入旧数据。
此外，创建集群后，你可能还需要进行一些额外的配置和优化，例如设置密码、调整内存限制等。

## 遇见问题

### 22.1【已解决】Debian Redis `redis-cli` 命令运行失败报错 `Could not connect to Redis at 127.0.0.1:6379: Connection refused`
```bash
root@DESKTOP-9MBCA87:/home/toubun# redis-cli
Could not connect to Redis at 127.0.0.1:6379: Connection refused
not connected> exit
```
* 解决方案：同时开启两个Debian窗口，其中一个运行`redis-server`，之后另一个窗口运行`redis-cli`后成功启动

### 22.2【已解决】win10 debian vim 复制的外部内容无法粘贴进vim文件
* 参考[文档](https://blog.csdn.net/weixin_43592873/article/details/115497734)
```bash
su
touch /etc/vim/vimrc.local
vim /etc/vim/vimrc.local
```
```bash
source /usr/share/vim/vim90/defaults.vim # 90为vim --version: VIM - Vi IMproved 9.0
let skip_defaults_vim = 1
if has('mouse')
    set mouse=r
endif
~
:wq
```

### 22.3【已解决】Debian Redis 使用`systemctl stop redis-server`命令关闭6379端口主机失败
```bash
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   406  0 19:44 ?        00:00:06 redis-server *:6379
root       450    26  0 20:27 ?        00:00:03 redis-server *:6380
root       465    26  0 20:46 ?        00:00:02 redis-server *:6381
root       499    26  0 21:07 ?        00:00:00 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:00 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:00 redis-server *:9102 [sentinel]
root       522    34  0 21:11 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# systemctl stop redis-server
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
toubun     409   406  0 19:44 ?        00:00:06 redis-server *:6379 # 依然存在
root       450    26  0 20:27 ?        00:00:03 redis-server *:6380
root       465    26  0 20:46 ?        00:00:02 redis-server *:6381
root       499    26  0 21:07 ?        00:00:00 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:00 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:00 redis-server *:9102 [sentinel]
root       526    34  0 21:11 pts/1    00:00:00 grep redis
```
* 主机启动方式为上上一问中新开Debian方式启动；而后参考文心一言：
`systemctl stop redis-server` 命令通常用于通过 systemd 管理 Redis 服务。但是，从你给出的输出来看，存在几个问题可能导致该命令没有停止 6379 端口的 Redis 服务器：
1. **systemd 单元文件配置**：系统可能配置了多个 Redis 的 systemd 单元文件，而 `redis-server` 这个名字可能只对应了其中一部分。例如，你可能有一个 `redis.service` 来控制 6379 端口的服务，但 `systemctl stop redis-server` 尝试停止的是另一个叫 `redis-server.service` 的服务（如果这样的服务存在的话）。
2. **手动启动的服务**：6379 端口上的 Redis 服务器可能是手动启动的，而不是通过 systemd。这意味着它不会受到 `systemctl` 命令的影响。
3. **使用不同的用户和配置**：你的系统中可能有多个 Redis 实例，它们使用不同的用户和配置文件运行。`systemctl` 命令可能只影响由 systemd 管理的那个实例。
为了解决这个问题，你可以尝试以下步骤：
- **确定 systemd 单元文件**：使用 `systemctl list-units --type=service | grep redis` 来列出所有与 Redis 相关的 systemd 单元文件。
- **停止特定的服务**：如果你找到了与 6379 端口相关的 systemd 单元文件（比如 `redis.service`），你可以使用 `systemctl stop redis.service` 来停止它。
- **手动停止服务**：如果 Redis 服务器是手动启动的，你可能需要找到启动它的命令或脚本，并使用相应的停止命令或脚本来关闭它。通常，这可以通过发送 `SIGTERM` 或 `SIGKILL` 信号给 Redis 进程来实现。
- **检查 Redis 配置文件**：查看 Redis 的配置文件（通常在 `/etc/redis/` 目录下），以确定是否有多个实例的配置，并了解它们是如何启动的。
- **使用 Redis CLI**：你还可以使用 Redis 的命令行界面（CLI）来连接到正在运行的服务器，并使用 `SHUTDOWN` 命令来关闭它。但是，请注意，这只会关闭你连接的那个 Redis 实例。
最后，如果你只是想临时停止 6379 端口的 Redis 服务器进行测试或维护，你可以直接使用 `kill` 命令发送信号给该进程。例如，`kill 409` 会发送 `TERM` 信号给进程 ID 为 409 的 Redis 服务器，尝试优雅地关闭它。如果它不响应，你可以使用 `kill -9 409` 来强制关闭它。但是，请注意，强制关闭可能会导致数据丢失或损坏，所以请谨慎使用。
```bash
root@DESKTOP-9MBCA87:/etc/redis# systemctl list-units --type=service | grep redis
redis-server.service    loaded inactive dead    Advanced key-value store
```
从您提供的输出 `systemctl list-units --type=service | grep redis` 可以看到，`redis-server.service` 的状态是 `loaded inactive dead`。这表示该服务已经定义（loaded），但当前没有运行（inactive dead）。
但是，您仍然有 Redis 进程在运行，并且它们似乎不是通过 systemd 管理的。这可能是因为它们是以不同的方式（如手动启动或通过其他 init 系统）启动的。
要停止 6379 端口上的 Redis 服务器，您可以使用 `kill` 命令直接发送信号给进程。但是，首先，您需要确保您知道该进程是否可以安全地关闭，因为直接杀死进程可能会导致数据丢失或其他问题。
如果您确定要停止该进程，可以使用以下命令：
```bash
sudo kill 409
```
但是，请注意以下几点：
1. **数据丢失**：如果 Redis 正在处理重要的数据，并且没有设置持久化（例如，RDB 快照或 AOF 日志），那么直接杀死进程可能会导致数据丢失。
2. **配置文件**：检查 Redis 的配置文件（通常在 `/etc/redis/` 目录下），看看是否有关于 6379 端口的设置，以及是否有关于持久化的设置。
3. **其他服务**：确保没有其他服务依赖于这个 Redis 实例。
4. **日志**：在停止 Redis 之前和之后，检查 Redis 的日志文件（通常也在 `/var/log/redis/` 或 `/var/log/syslog` 中），以获取有关启动、停止和任何潜在问题的更多信息。
如果您想更优雅地停止 Redis 服务器，可以尝试连接到它并使用 `SHUTDOWN` 命令（如果您有权限并且 Redis 正在接受连接）。但是，从您提供的信息来看，这似乎不是一个选项，因为您似乎没有通过 systemd 启动它。
```bash
root@DESKTOP-9MBCA87:/etc/redis# sudo kill 409
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root       450    26  0 20:27 ?        00:00:04 redis-server *:6380
root       465    26  0 20:46 ?        00:00:02 redis-server *:6381
root       499    26  0 21:07 ?        00:00:01 redis-server *:9100 [sentinel]
root       505    26  0 21:07 ?        00:00:01 redis-server *:9101 [sentinel]
root       511    26  0 21:08 ?        00:00:01 redis-server *:9102 [sentinel]
root       533    34  0 21:16 pts/1    00:00:00 grep redis
```
* 使用`sudo kill 409`成功关闭主机

### 22.4【已解决】Debian Redis 集群配置 `ps -ef | grep redis`命令下 `root        22    20  0 16:22 pts/1    00:00:00 vim redis_9000.conf`无法关闭
```
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        22    20  0 16:22 pts/1    00:00:00 vim redis_9000.conf
root        54    20  0 16:46 pts/1    00:00:00 grep redis
```
* 首先尝试打开`redis_9000.conf`
```bash
root@DESKTOP-9MBCA87:/etc/redis# vim redis_9000.conf

Found a swap file by the name ".redis_9000.conf.swp"
          owned by: root   dated: Wed May 15 16:23:49 2024
         file name: /etc/redis/redis_9000.conf
          modified: YES
         user name: root   host name: DESKTOP-9MBCA87
        process ID: 22 (STILL RUNNING)
While opening file "redis_9000.conf"
             dated: Wed May 15 16:53:30 2024
      NEWER than swap file!

(1) Another program may be editing the same file.  If this is the case,
    be careful not to end up with two different instances of the same
    file when making changes.  Quit, or continue with caution.
(2) An edit session for this file crashed.
    If this is the case, use ":recover" or "vim -r redis_9000.conf"
    to recover the changes (see ":help recovery").
    If you did this already, delete the swap file ".redis_9000.conf.swp"
    to avoid this message.

Swap file ".redis_9000.conf.swp" already exists!
[O]pen Read-Only, (E)dit anyway, (R)ecover, (Q)uit, (A)bort:
```
这个信息表示 Vim 在尝试打开 redis_9000.conf 文件时检测到了一个名为 .redis_9000.conf.swp 的交换文件（swap file），这通常是因为 Vim 在之前的编辑会话中异常退出或崩溃，而没有正确关闭。交换文件是 Vim 用来在编辑过程中保存更改的临时文件，以便在崩溃时能够恢复更改。
* 尝试手动删除该交换文件
```bash
root@DESKTOP-9MBCA87:/etc/redis# sudo rm .redis_9000.conf.swp
root@DESKTOP-9MBCA87:/etc/redis# vim redis_9000.conf # 打开后界面恢复正常
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        22    20  0 16:22 pts/1    00:00:00 vim redis_9000.conf
root        67    20  0 16:54 pts/1    00:00:00 grep redis
```
但Vim文本编辑器进程依然存在
* 尝试使用 kill 命令结束 Vim 进程 你可以通过发送一个终止信号来结束 Vim 进程。首先，使用 ps 命令找到 Vim 进程的 PID（进程ID），然后使用 kill 命令发送一个信号。
```bash
kill 22
```
进程依然存在，但重启Debian后发现进程已被成功清除

### 22.5【已解决】Debian Redis 集群配置 执行`redis-cli --cluster create --cluster-replicas 1 192.168.11.128:9000 192.168.11.128:9001 192.168.11.128:9002 192.168.11.128:9003 192.168.11.128:9004 192.168.11.128:9005`命令回车后界面无内容返回
```bash
root@DESKTOP-9MBCA87:/etc/redis# ps -ef | grep redis
root        87    77  0 17:07 ?        00:00:00 redis-server *:9000 [cluster]
root        96    77  0 17:09 ?        00:00:00 redis-server *:9001 [cluster]
root       102    77  0 17:09 ?        00:00:00 redis-server *:9002 [cluster]
root       108    77  0 17:09 ?        00:00:00 redis-server *:9003 [cluster]
root       114    77  0 17:09 ?        00:00:00 redis-server *:9004 [cluster]
root       120    77  0 17:09 ?        00:00:00 redis-server *:9005 [cluster]
root       126    83  0 17:10 pts/1    00:00:00 grep redis
root@DESKTOP-9MBCA87:/etc/redis# redis-cli -p 9000
127.0.0.1:9000> CLUSTER INFO
cluster_state:fail
cluster_slots_assigned:0
cluster_slots_ok:0
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:1
cluster_size:0
cluster_current_epoch:0
cluster_my_epoch:0
cluster_stats_messages_sent:0
cluster_stats_messages_received:0
total_cluster_links_buffer_limit_exceeded:0
127.0.0.1:9000> exit
root@DESKTOP-9MBCA87:/etc/redis# redis-cli --cluster create --cluster-replicas 1 192.168.11.128:9000 192.168.11.128:9001 192.168.11.128:9002 192.168.11.128:9003 192.168.11.128:9004 192.168.11.128:9005
# 回车后此处不再有内容
```
* 尝试另一种语序
```bash
redis-cli --cluster create 192.168.11.128:9000 192.168.11.128:9001 192.168.11.128:9002 192.168.11.128:9003 192.168.11.128:9004 192.168.11.128:9005 --cluster-replicas 1 # 选项--cluster-replicas 1意味着我们希望为每个创建的主节点创建一个副本
```
也不行
* 参考[stackoverflow](https://stackoverflow.com/questions/39568561/how-to-solve-redis-cluster-waiting-for-the-cluster-to-join-issue/55379831)的相关问题解答
```
If there is no firewall problem between these 6 nodes, you may check bind setting in redis.conf.

You should bind the redis service on LAN IP, of course, but one more thing:

Delete 127.0.0.1 or move 127.0.0.1 to the end after LAN IP!

Just like this: bind 10.2.1.x 127.0.0.1 or bind 10.2.1.x

I met this issue when I creating a cluster between 3 nodes on 3 servers, waiting for cluster to join forever. This is a bug in redis maybe, at least in Redis 5.0, when you put 127.0.0.1 at front of LAN IP.
```
尝试查看`redis.conf`中`bind`相关内容：
```bash
################################## NETWORK #####################################

# By default, if no "bind" configuration directive is specified, Redis listens
# for connections from all available network interfaces on the host machine.
# It is possible to listen to just one or multiple selected interfaces using
# the "bind" configuration directive, followed by one or more IP addresses.
# Each address can be prefixed by "-", which means that redis will not fail to
# start if the address is not available. Being not available only refers to
# addresses that does not correspond to any network interface. Addresses that
# are already in use will always fail, and unsupported protocols will always BE
# silently skipped.
#
# Examples:
#
# bind 192.168.1.100 10.0.0.1     # listens on two specific IPv4 addresses
# bind 127.0.0.1 ::1              # listens on loopback IPv4 and IPv6
# bind * -::*                     # like the default, all available interfaces
#
# ~~~ WARNING ~~~ If the computer running Redis is directly exposed to the
# internet, binding to all the interfaces is dangerous and will expose the
# instance to everybody on the internet. So by default we uncomment the
# following bind directive, that will force Redis to listen only on the
# IPv4 and IPv6 (if available) loopback interface addresses (this means Redis
# will only be able to accept client connections from the same host that it is
# running on).
#
# IF YOU ARE SURE YOU WANT YOUR INSTANCE TO LISTEN TO ALL THE INTERFACES
# COMMENT OUT THE FOLLOWING LINE.
#
# You will also need to set a password unless you explicitly disable protected
# mode.
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bind 127.0.0.1 -::1

# By default, outgoing connections (from replica to master, from Sentinel to
# instances, cluster bus, etc.) are not bound to a specific local address. In
# most cases, this means the operating system will handle that based on routing
# and the interface through which the connection goes out.
#
# Using bind-source-addr it is possible to configure a specific address to bind
# to, which may also affect how the connection gets routed.
#
# Example:
#
# bind-source-addr 10.0.0.1

# Protected mode is a layer of security protection, in order to avoid that
# Redis instances left open on the internet are accessed and exploited.
#
# When protected mode is on and the default user has no password, the server
# only accepts local connections from the IPv4 address (127.0.0.1), IPv6 address
# (::1) or Unix domain sockets.
#
# By default protected mode is enabled. You should disable it only if
# you are sure you want clients from other hosts to connect to Redis
# even if no authentication is configured.
protected-mode yes

# Redis uses default hardened security configuration directives to reduce the
# attack surface on innocent users. Therefore, several sensitive configuration
# directives are immutable, and some potentially-dangerous commands are blocked.
#
# Configuration directives that control files that Redis writes to (e.g., 'dir'
# and 'dbfilename') and that aren't usually modified during runtime
# are protected by making them immutable.
#
# Commands that can increase the attack surface of Redis and that aren't usually
# called by users are blocked by default.
#
# These can be exposed to either all connections or just local ones by setting
# each of the configs listed below to either of these values:
#
# no    - Block for any connection (remain immutable)
# yes   - Allow for any connection (no protection)
# local - Allow only for local connections. Ones originating from the
#         IPv4 address (127.0.0.1), IPv6 address (::1) or Unix domain sockets.
#
# enable-protected-configs no
# enable-debug-command no
# enable-module-command no

# Accept connections on the specified port, default is 6379 (IANA #815344).
# If port 0 is specified Redis will not listen on a TCP socket.
port 6379

# TCP listen() backlog.
#
# In high requests-per-second environments you need a high backlog in order
# to avoid slow clients connection issues. Note that the Linux kernel
# will silently truncate it to the value of /proc/sys/net/core/somaxconn so
# make sure to raise both the value of somaxconn and tcp_max_syn_backlog
# in order to get the desired effect.
tcp-backlog 511

# Unix socket.
#
# Specify the path for the Unix socket that will be used to listen for
# incoming connections. There is no default, so Redis will not listen
# on a unix socket when not specified.
#
# unixsocket /run/redis.sock
# unixsocketperm 700

# Close the connection after a client is idle for N seconds (0 to disable)
timeout 0

# TCP keepalive.
#
# If non-zero, use SO_KEEPALIVE to send TCP ACKs to clients in absence
# of communication. This is useful for two reasons:
#
# 1) Detect dead peers.
# 2) Force network equipment in the middle to consider the connection to be
#    alive.
#
# On Linux, the specified value (in seconds) is the period used to send ACKs.
# Note that to close the connection the double of the time is needed.
# On other kernels the period depends on the kernel configuration.
#
# A reasonable value for this option is 300 seconds, which is the new
# Redis default starting with Redis 3.2.1.
tcp-keepalive 300

# Apply OS-specific mechanism to mark the listening socket with the specified
# ID, to support advanced routing and filtering capabilities.
#
# On Linux, the ID represents a connection mark.
# On FreeBSD, the ID represents a socket cookie ID.
# On OpenBSD, the ID represents a route table ID.
#
# The default value is 0, which implies no marking is required.
# socket-mark-id 0
```
其中重点关注`bind 127.0.0.1 -::1`，参考文心一言的解释：
  如果你尝试使用 `redis-cli --cluster create` 命令来创建 Redis 集群，并且没有任何返回内容，这通常意味着命令正在执行中或者由于某种原因没有成功执行。不过，如果你的 Redis 服务器当前只绑定了 `127.0.0.1` 和 `::1`（即只监听本地连接），那么集群创建命令肯定无法成功，因为 Redis 节点无法从其他节点接收连接。
  为了解决这个问题，你需要修改 `redis.conf` 文件中的 `bind` 配置，以便 Redis 节点可以监听 LAN IP 地址。由于你所有 Redis 实例都在同一个 IP 地址（`192.168.11.128`）上运行，但使用不同的端口，你可以将 `bind` 配置修改为监听该 IP 地址。
  以下是修改 `redis.conf` 文件的步骤：
  1. 打开所有 Redis 实例的 `redis.conf` 文件（通常位于 `/etc/redis/` 或 `/etc/redis/6379/` 这样的目录下，但因为你使用了非标准端口，所以可能位于如 `/etc/redis/9000/` 这样的目录中）。
  2. 在每个 `redis.conf` 文件中，找到 `bind` 配置行。
  3. 将 `bind 127.0.0.1 -::1` 修改为 `bind 192.168.11.128`（或者如果你希望同时监听 IPv4 和 IPv6 地址，可以保留 `::1` 但通常对于集群来说，只需要监听 IPv4 地址就足够了）。
  4. 保存并关闭 `redis.conf` 文件。
  5. 重启所有 Redis 实例以使更改生效。根据你的系统配置，你可以使用 `systemctl restart redis@9000`（针对端口 9000 的实例）或者 `service redis restart`（如果你使用的是传统的 init 脚本）等命令来重启服务。确保对每个 Redis 实例都执行了重启操作。
  6. 一旦 Redis 实例重启完成，你可以再次尝试执行 `redis-cli --cluster create` 命令来创建集群。
  7. 如果一切正常，`redis-cli --cluster create` 命令应该会显示集群创建的进度，并最终显示成功消息。
  请注意，在执行集群创建命令时，你可能需要确保防火墙设置允许 Redis 端口（在你的例子中是 9000-9005）之间的通信，并且所有 Redis 实例都已正确启动并监听指定的端口。此外，如果你在创建集群时遇到任何问题，Redis 客户端通常会输出相关的错误信息，你可以根据这些信息进行故障排除。
* 由此想到课件中提到`192.168.11.128`是虚拟机地址，将其改为`127.0.0.1`
```bash
root@debian:/etc/redis# redis-cli --cluster create --cluster-replicas 1 127.0.0.1:9000 127.0.0.1:9001 127.0.0.1:9002 127.0.0.1:9003 127.0.0.1:9004 127.0.0.1:9005
```
成功拿到回复，问题解决
```bash
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 127.0.0.1:9004 to 127.0.0.1:9000
Adding replica 127.0.0.1:9005 to 127.0.0.1:9001
Adding replica 127.0.0.1:9003 to 127.0.0.1:9002
>>> Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: ca650cf3796e78fa346b96d1b8fef040a570e1ed 127.0.0.1:9000
   slots:[0-5460] (5461 slots) master
M: 8aeb37884db4ee8568c7fc3cbfef6be14003581f 127.0.0.1:9001
   slots:[5461-10922] (5462 slots) master
M: 34c1ea22a04c30d7e28223d0a21716a2325ce6af 127.0.0.1:9002
   slots:[10923-16383] (5461 slots) master
S: 44117b0656484f9f847a7bdd33201ee9fcfeacdb 127.0.0.1:9003
   replicates ca650cf3796e78fa346b96d1b8fef040a570e1ed
S: 03a84f1035f268f74074ae8cc3f939fa3f8ef2bd 127.0.0.1:9004
   replicates 8aeb37884db4ee8568c7fc3cbfef6be14003581f
S: 8faa96c289095cdc0853a3581352f781b5350a7d 127.0.0.1:9005
   replicates 34c1ea22a04c30d7e28223d0a21716a2325ce6af
```

### 22.6【】Redis集成SpringBoot 运行报错 `Unable to connect to Redis`
```
15:35:35.352 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils -- Could not detect default configuration classes for test class [com.example.SpringDataRedisApplicationTests]: SpringDataRedisApplicationTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
15:35:35.433 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper -- Found @SpringBootConfiguration com.example.SpringDataRedisApplication for test class com.example.SpringDataRedisApplicationTests

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)

2024-05-16T15:35:35.803+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : Starting SpringDataRedisApplicationTests using Java 17.0.7 with PID 18332 (started by Toubun in G:\NiHon-IT-Training-Plan\Redis\Spring-Data-Redis)
2024-05-16T15:35:35.804+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : No active profile set, falling back to 1 default profile: "default"
2024-05-16T15:35:36.074+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode
2024-05-16T15:35:36.076+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2024-05-16T15:35:36.099+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 9 ms. Found 0 Redis repository interfaces.
2024-05-16T15:35:36.631+08:00  INFO 18332 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : Started SpringDataRedisApplicationTests in 1.058 seconds (process running for 1.801)
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended

org.springframework.data.redis.RedisConnectionFailureException: Unable to connect to Redis
   ...
Caused by: io.lettuce.core.RedisConnectionException: Unable to connect to localhost/<unresolved>:6379
   ...
Caused by: io.netty.channel.AbstractChannel$AnnotatedConnectException: Connection refused: no further information: localhost/127.0.0.1:6379
Caused by: java.net.ConnectException: Connection refused: no further information
```
* 将先前的Redis集群在Debian中开启后报错依然存在
* 注意到`Connection refused: no further information: localhost/127.0.0.1:6379`，于是启动早前的docker相关配置内容
```bash
C:\Windows\System32>docker ps -a
CONTAINER ID   IMAGE             COMMAND                   CREATED        STATUS                    PORTS                               NAMES
260541ddadb7   redis             "docker-entrypoint.s…"   3 days ago     Exited (0) 45 hours ago                                       redis
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   12 days ago    Exited (255) 3 days ago   0.0.0.0:8081->8081/tcp              nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago   Exited (255) 3 days ago   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1

C:\Windows\System32>docker start 260541ddadb7
260541ddadb7

C:\Windows\System32>docker exec -it 260541ddadb7 redis-cli
127.0.0.1:6379>
```
但随后的运行依然失败报错
* 尝试使用`.yaml`方式docker启动Redis，但Windows默认没有右键从当前文件夹位置打开CMD的功能，于是参考[链接](https://blog.csdn.net/weixin_57451673/article/details/123424429)对右键菜单栏进行配置。需要注意的是，另存为`.reg`文件时的编码方式如果按原链接选择`ANSI`编码方式，则之后生成的右键CMD选项名称会乱码。我这里本地windows默认语言为英语。选择
```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\OpenCmdHere]
@="在此处打开命令窗口"
"Icon"="cmd.exe"

[HKEY_CLASSES_ROOT\Directory\shell\OpenCmdHere\command]
@="cmd.exe /s /k pushd "%V""

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
@="在此处打开命令窗口"
"Icon"="cmd.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere\command]
@="cmd.exe /s /k pushd \"%V\""

[HKEY_CLASSES_ROOT\Drive\shell\OpenCmdHere]
@="在此处打开命令窗口"
"Icon"="cmd.exe"

[HKEY_CLASSES_ROOT\Drive\shell\OpenCmdHere\command]
@="cmd.exe /s /k pushd \"%V\""

[HKEY_CLASSES_ROOT\LibraryFolder\background\shell\OpenCmdHere]
@="在此处打开命令窗口"
"Icon"="cmd.exe"

[HKEY_CLASSES_ROOT\LibraryFolder\background\shell\OpenCmdHere\command]
@="cmd.exe /s /k pushd \"%V\""
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240516160550.png)
* 通过解决【问题22.7】后使用docker运行端口为6379的redis后，再次运行IDEA中的原test，成功运行
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240516163925.png)
```bash
16:38:53.125 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils -- Could not detect default configuration classes for test class [com.example.SpringDataRedisApplicationTests]: SpringDataRedisApplicationTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
16:38:53.199 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper -- Found @SpringBootConfiguration com.example.SpringDataRedisApplication for test class com.example.SpringDataRedisApplicationTests

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)

2024-05-16T16:38:53.504+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : Starting SpringDataRedisApplicationTests using Java 17.0.7 with PID 29196 (started by Toubun in G:\NiHon-IT-Training-Plan\Redis\Spring-Data-Redis)
2024-05-16T16:38:53.505+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : No active profile set, falling back to 1 default profile: "default"
2024-05-16T16:38:53.721+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode
2024-05-16T16:38:53.724+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data Redis repositories in DEFAULT mode.
2024-05-16T16:38:53.746+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 8 ms. Found 0 Redis repository interfaces.
2024-05-16T16:38:54.184+08:00  INFO 29196 --- [Spring-Data-Redis] [           main] c.e.SpringDataRedisApplicationTests      : Started SpringDataRedisApplicationTests in 0.878 seconds (process running for 1.494)
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
zhangsan

Process finished with exit code 0
```


### 22.7【已解决】docker CMD配置`.yaml`文件 `docker compose -f '.\docker compose.yaml' up -d`命令 失败
```bash
G:\NiHon-IT-Training-Plan\Redis>docker compose -f '.\docker compose.yaml' up -d
Usage:  docker compose [OPTIONS] COMMAND

Define and run multi-container applications with Docker.

Options:
      --ansi string                Control when to print ANSI control
                                   characters ("never"|"always"|"auto")
                                   (default "auto")
      --compatibility              Run compose in backward compatibility mode
      --dry-run                    Execute command in dry run mode
      --env-file stringArray       Specify an alternate environment file.
  -f, --file stringArray           Compose configuration files
      --parallel int               Control max parallelism, -1 for
                                   unlimited (default -1)
      --profile stringArray        Specify a profile to enable
      --progress string            Set type of progress output (auto,
                                   tty, plain, quiet) (default "auto")
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the, first
                                   specified, Compose file)
  -p, --project-name string        Project name

Commands:
  build       Build or rebuild services
  config      Parse, resolve and render compose file in canonical format
  cp          Copy files/folders between a service container and the local filesystem
  create      Creates containers for a service.
  down        Stop and remove containers, networks
  events      Receive real time events from containers.
  exec        Execute a command in a running container.
  images      List images used by the created containers
  kill        Force stop service containers.
  logs        View output from containers
  ls          List running compose projects
  pause       Pause services
  port        Print the public port for a port binding.
  ps          List containers
  pull        Pull service images
  push        Push service images
  restart     Restart service containers
  rm          Removes stopped service containers
  run         Run a one-off command on a service.
  scale       Scale services
  start       Start services
  stop        Stop services
  top         Display the running processes
  unpause     Unpause services
  up          Create and start containers
  version     Show the Docker Compose version information
  wait        Block until the first service container stops
  watch       Watch build context for service and rebuild/refresh containers when files are updated

Run 'docker compose COMMAND --help' for more information on a command.
unknown docker command: "compose compose.yaml'"
```
* 随后尝试`docker-compose -f '.\docker compose.yaml' up -d`和`docker-compose -f .\docker compose.yaml up -d`和`docker-compose -f G:\NiHon-IT-Training-Plan\Redis\docker compose.yaml up -d`，但均报错依旧
* 最后修改`G:\NiHon-IT-Training-Plan\Redis\docker-compose.yaml`的文件名为`docker compose.yaml`后使用`docker-compose -f .\docker-compose.yaml up -d`成功运行，但还是有点小问题
```bash
G:\NiHon-IT-Training-Plan\Redis>docker-compose -f .\docker-compose.yaml up -d
[+] Running 1/0
 ✔ Network redis_default  Created                                                                                  0.0s
 - Container redis        Creating                                                                                 0.0s
Error response from daemon: Conflict. The container name "/redis" is already in use by container "260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4". You have to remove (or rename) that container to be able to reuse that name.
```
* 应该是原先CMD中执行的redis运行导致冲突。修改`docker-compose.yaml`中命名即可
```yml
version: "3.8"

services:
  cache:
    image: redis:latest
    container_name: redis-docker
    ports:
      - '6379:6379'
    command: redis-server --save 20 1 --loglevel warning --requirepass 123456
```
```bash
[+] Running 1/0ining-Plan\Redis>docker-compose -f .\docker-compose.yaml up -d
[+] Running 1/1edis-docker  Created                                                                                 0.0s
[+] Running 1/1edis-docker  Created                                                                                 0.0s
[+] Running 1/1edis-docker  Created                                                                                 0.0s
[+] Running 1/1edis-docker  Created                                                                                 0.0s
[+] Running 1/1edis-docker  Created                                                                                 0.0s
 ✔ Container redis-docker  Started                                                                                 0.0s
```