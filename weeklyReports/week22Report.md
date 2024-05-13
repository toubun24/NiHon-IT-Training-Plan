# Week 22 Report

## 学习内容及时长

* **2023.05.13 月曜日:** 
  * Redis-字符串数据类型 21:15-21:41
  * Redis-列表数据类型 21:41-22:00
  * Redis-集合Set 22:30-23:03
  * Redis-有序集合ZSet 23:03-
  * Redis-哈希Hash 
  * Redis-地理位置GEO 
  * Redis-位图Bitmap 
  * Redis-基数统计HyperLoglog
  * Redis-RDB持久化 
  * Redis-AOF持久化 
  * Redis-主从模式 
  * Redis-哨兵模式介绍 
  * Redis-哨兵模式搭建 
  * Redis-集群搭建 
  * Redis-集群分片机制 
  * Redis-集群分片操作 
  * Redis-集成SpringBoot 

* **2023.05.14 火曜日:** 

* **2023.05.15 水曜日:** 

* **2023.05.16 木曜日:** 

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