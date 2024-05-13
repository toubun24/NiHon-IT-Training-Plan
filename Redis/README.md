# Redis

## Redis介绍

### Redis简介
* Redis是一个内存中的数据结构项目，实现了一个具有可选持久性的分布式内存 key-value 数据库。
* Redis是NoSQL，即Not Only SQL，指非关系型数据库。
* Redis支持不同类型的抽象数据结构，如字符串、列表、映射、集合、有序集合、超级日志、位图、流和空间索引。

### Redis使用场景
* 用例包括会话缓存、全页缓存、消息队列应用程序、排行榜和计数等等。
* AWS Azure Google Cloud等云供应商在其产品中提供了 Redis。

### 缓存
* 高性能：从用户角度来看，一个请求过来，操作 MySQL（IO操作），查出一个结果，耗时大概 600ms；用缓存速度提高300倍，将常用的数据放在缓存里，可以提高性能，提升用户体验。
* 高并发：从系统来看，数据库IO操作比如MySQL单机最高峰支持2000QPS，大概10000个请求就会挂掉，而用缓存可以支持最多十几万的并发量。

## Redis安装

### Install Redis on Windows

#### Windows Subsystem for Linux (WSL)
* [官方文档](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)
* `Control Panel\Programs\Turn Windows features on or off`中同时打开`Virtual Machine Platform`和`Windows Subsystem for Linux`

![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240511195958.png)

#### Debian方式安装Redis
* `Microsoft Store/Debian`直接安装
```bash
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: toubun
New password: 123456
Retype new password: 123456
passwd: password updated successfully
Installation successful!
```
* 开启管理员权限
```bash
sudo su
```
* 查看LSB和版本的相关信息工具
```bash
sudo apt install lsb-release
```
```bash
[sudo] password for toubun: 123456
Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  lsb-release
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 6,416 B of archives.
After this operation, 17.4 kB of additional disk space will be used.
Get:1 http://deb.debian.org/debian bookworm/main amd64 lsb-release all 12.0-1 [6,416 B]
Fetched 6,416 B in 1s (8,852 B/s)
Selecting previously unselected package lsb-release.
(Reading database ... 9548 files and directories currently installed.)
Preparing to unpack .../lsb-release_12.0-1_all.deb ...
Unpacking lsb-release (12.0-1) ...
Setting up lsb-release (12.0-1) ...
```
* 安装数字签名
```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
```
* 执行安装
```bash
sudo apt-get update
sudo apt-get install redis
```
* 使用`systemctl enable`命令来启用Redis服务，以便在系统启动时自动运行
```bash
sudo systemctl enable redis-server.service
```
* 查看当前Redis情况
```bash
systemctl status redis-server
```
```bash
redis-server.service - Advanced key-value store
    Loaded: loaded (/usr/lib/systemd/system/redis-server.service, enabled)
    Active: inactive (dead)
```
* 连接Redis
```bash
redis-cli
```
* 测试
```bash
127.0.0.1:6379> SET mykey "Hello Redis!"
OK
127.0.0.1:6379> GET mykey
"Hello Redis!"
```
* 退出Redis
```bash
exit
```
* Redis配置文件
```bash
cd /etc/redis/
ls
cat redis.conf
```
* 卸载包管理工具所安装Redis
```bash
apt-get purge --auto-remove redis-server
cd /home/user/
ls
redis-cli
redis-server
```

#### 二进制方式安装Redis
```bash
gcc -v

# 官网下载最新Redis版本
wget https://download.redis.io/redis-stable.tar.gz

# 解压缩包 执行编译
tar -xzvf redis-stable.tar.gz
cd redis-stable
make

# 执行安装
make install

redis-server

/usr/local/bin/redis-cli

exit

# 卸载
cd redis-stable
ls
systemctl status redis-server # Unit redis-server.service could not be found.
make uninstall
cd ..
```

#### Docker方式安装Redis
* [官方文档](https://hub.docker.com/_/redis)
```bash
C:\Windows\System32>docker ps -a
CONTAINER ID   IMAGE             COMMAND                   CREATED        STATUS                            PORTS                               NAMES
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   8 days ago     Exited (255) About a minute ago   0.0.0.0:8081->8081/tcp              nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago   Exited (255) About a minute ago   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1

C:\Windows\System32>docker run --name redis -d redis
Unable to find image 'redis:latest' locally
latest: Pulling from library/redis
b0a0cf830b12: Pull complete
214d0afb35ca: Pull complete
16a9d12e7a2c: Pull complete
cb9709829e8b: Pull complete
00e912971fa2: Pull complete
f7ebca356832: Pull complete
4f4fb700ef54: Pull complete
c16c264be546: Pull complete
Digest: sha256:f14f42fc7e824b93c0e2fe3cdf42f68197ee0311c3d2e0235be37480b2e208e6
Status: Downloaded newer image for redis:latest
260541ddadb78c81506b4f3af65012a499a06beb5bb0917684b27a96c7e781f4

C:\Windows\System32>docker ps -a
CONTAINER ID   IMAGE             COMMAND                   CREATED          STATUS                       PORTS                               NAMES
260541ddadb7   redis             "docker-entrypoint.s…"   16 seconds ago   Up 12 seconds                6379/tcp                            redis
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   8 days ago       Exited (255) 3 minutes ago   0.0.0.0:8081->8081/tcp              nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago     Exited (255) 3 minutes ago   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-mysql-1

C:\Windows\System32>docker images
REPOSITORY        TAG       IMAGE ID       CREATED        SIZE
sonatype/nexus3   latest    eaf32f10ff03   4 weeks ago    568MB
redis             latest    9509c4dd19fb   5 weeks ago    116MB
mysql             latest    56b21e040954   3 months ago   632MB

# 启动即可
docker run --name redis -d redis
```

### Redis配置

#### 配置参数获取
```bash
redis-cli
config get parameter [parameter ...]
```

## Redis基本数据类型

### redis-cli 连接到另一个服务器
```bash
redis-cli -h host -p port -a password
```

### Redis 字符串 (String)
* String 是 Redis 最基本的数据类型，一个 Redis 中字符串 value 最多可以是 512M.
* String 是二进制安全的。意味着 Redis 的 String 可以包含任何数据。
  * String 的数据结构是简单动态字符串(Simple Dynamic String)。
  * 内部结构实现上类似于 Java 的 ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配。
* String常用命令：
  > SET 设置指定 key 的值 \
  > SETNX 在 key 不存在时设置 key 的值 \
  > SETEX 设置指定 key 的值并设过期时间 \
  > MSET 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在 \
  > GET 获取指定 key 的值 \
  > GETSET 设置新值同时获得旧值 \
  > INCR/DECR 对 key 的值进行加1或者减1操作 \
  > INCRBY/DECRBY 对 key 的值进行自定义加减 \
  > SETRANGE 用指定的字符串覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始 \
  > GETRANGE 获取存储在指定 key 中字符串的子字符串。字符串的截取范围由 start 和 end 两个偏移量决定

### Redis 列表 (List)
* List是简单的字符串列表，按照插入顺序排序。
  * 底层是双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。
* List常用命令：
  > LPUSH 将一个或多个值插入到列表左端 \
  > RPUSH 将一个或多个值插入到列表右端 \
  > LPOP 移出并获取列表的第一个元素 \
  > BLPOP 移出并获取列表的第一个元素,如列表没有元素会阻塞列表直到超时或发现元素为止 \
  > RPOP 移除并获取列表的最后一个元素 \
  > BRPOP 移除并获取列表的最后一个元素,如列表没有元素会阻塞列表直到超时或发现元素为止 \
  > LRANGE 从左到右获取列表元素 \
  > LSET 通过索引来设置元素的值 \
  > LREM 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素
* List命令搭配：
  > LPUSH + LPOP = 栈 先进后出 \
  > RPUSH + RPOP = 栈 先进后出 \
  > LPUSH + RPOP = 队列 先进先出 \
  > RPUSH + LPOP = 队列 先进先出 \
  > LPUSH + BRPOP = 队列 阻塞效果 \
  > RPUSH + BLPOP = 队列 阻塞效果

### Redis 集合(Set)
* Set提供的功能与 List 类似。
* 特殊之处在于 Set 是可以自动排重，当需要存储一个列表数据，又不希望出现重复数据时，Set 是一个很好的选择。
* Set 提供了判断某个成员是否在一个 Set 集合内的重要接口。
* Set 是 String 类型的无序集合。
* 底层是一个 value 为 null 的 哈希表和整型数组。
* Set常用命令：
  > SADD 向集合添加一个或多个成员 \
  > SREM 移除集合中一个或多个成员 \
  > SISMEMBER 判断 member 元素是否是集合 key 的成员 \
  > SMEMBERS 返回集合中的所有成员 \
  > SMOVE 将 member 元素从 源集合移动到 目标集合 \
  > SINTER 返回所有给定集合的交集 \
  > SUNION 返回所有给定集合的并集 \
  > SDIFF 返回第一个集合与其他集合之间的差异(注意比较的两个集合有顺序)

### Redis 有序集合 (ZSet)
* ZSet与 Set 非常类似。
* 特殊之处是ZSet的每个成员都关联了一个评分(score),这个评分被用来按照从最低分到最高分的方式排序集合中的成员。
* 集合的成员是唯一的，但是评分可以重复。
* 底层是压缩列表和跳跃列表。
* ZSet常用命令：
  > ZADD 向有序集合添加一个或多个成员，或者更新已存在成员的分数 \
  > ZREM 移除有序集合中的一个或多个成员 \
  > ZSCORE 返回有序集中，成员的分数值 \
  > ZRANGE 通过索引区间返回有序集合指定区间内的成员 \
  > ZRANK 返回有序集合中指定成员的排名，从小到大排序 \
  > ZREVRANK 返回有序集合中指定成员的排名，从大到小排序 \
  > ZCOUNT 计算在有序集合中指定区间分数的成员数

### Redis 哈希 (Hash)
* Hash是一个键值对集合。
* 特别适合用于存储对象。类似 Java 里面的 Map<String,Object>。
* 底层是压缩列表和哈希表。
* Hash常用命令：
  > HSET 将哈希表 key 中的字段 field 的值设为 value \
  > HGET 获取存储在哈希表中指定字段的值 \
  > HDEL 删除一个或多个哈希表字段 \
  > HMSET 同时将多个 field-value (域-值)对设置到哈希表 key 中 \
  > HMGET 获取所有给定字段的值 \
  > HVALS 获取哈希表中所有值

## Redis特殊数据类型

### 地理位置（GEO）
* Redis 3.2 版本中，新增了存储地理位置信息的功能。
* GEO，地理信息的缩写，该类型是元素的 2 维坐标，在地图上就是经纬度。
* 提供了经纬度设置，查询，范围查询，距离查询，经纬度 Hash 等常见操作。
* 它的底层通过 Redis 有序集合实现。不过 GEO 并没有与 Zset 共用一套的命令，而是拥有自己的一套命令。
* GEO常用命令：
  > GEOADD 将指定的地理空间位置（纬度、经度、名称）添加到指定的 key 中
  > GEOPOS 从 key 里返回所有给定位置元素的位置（即经度和纬度）
  > GEODIST 返回两个地理位置间的距离，如果两个位置之间的其中一个不存在，那么返回空值
  > GEORADIUSBYMEMBER 根据给定地理位置(具体的位置元素)获取指定范围内的地理位置集合

### 位图（Bitmaps）
* 位图（Bitmaps）同样属于 String 数据类型。Redis 中一个字符串类型的值最多能存储 512 MB 的内容。
* 位图适用于一些特定的应用场景，比如用户签到次数、或者登录次数等。
* 位图中的每一条记录仅占用一个 bit 位，大大降低了内存空间使用率。
* Bitmaps常用命令：
  > SETBIT 设置或者清除某一位上的值，其返回值是原来位上存储的值，key 在初始状态下所有的位都为 0
  > GETBIT 获取某一位上的值
  > BITCOUNT 统计指定位区间上，值为 1 的个数


### 基数统计（HyperLoglog）
* Redis 2.8.9 版本中，新增了HyperLogLog类型。
* HyperLoglog 是 Redis 重要的数据类型之一，它非常适用于海量数据的计算、统计，其特点是占用空间小，计算速度快。
* 基数：一个集合中不重复的元素个数，比如集合 {1,2,3,1,2} ，它的基数集合为 {1,2,3} ，基数为 3。
* 适用于统计网站用户月活量，或者网站页面的 UV(网站独立访客)数据等。
* HyperLoglog常用命令：
  > PFADD 添加指定元素到 HyperLogLog 中
  > PFMERGE 将多个 HyperLogLog 合并为一个 HyperLogLog
  > PFCOUNT 返回给定 HyperLogLog 的基数估算值

