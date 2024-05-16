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

## Redis RDB持久化

### Redis持久化是什么?
* Redis 是基于内存的非关系型数据库，它将数据存储在内存中。
* 但 Redis 服务器出现意外情况，如宕机或者断电等，那么内存中的数据就会全部丢失。
* 因此须有一种机制能够保证 Redis 储存的数据不会因故障而丢失，这就是 Redis 的数据持久化机制。
* 数据持久化存储是 Redis 的重要特性之一，它能够将内存中的数据保存到本地磁盘中，实现对数据的持久存储。
* Redis 提供了两种持久化机制：RDB AOF。

### RDB是什么?
* RDB 即快照模式，它是 Redis 默认的数据持久化方式，它会将数据库的快照保存在 dump.rdb(默认名称可设置)这个二进制文件中。
* Redis 使用操作系统的多进程 COW(Copy On Write) 机制来实现快照持久化操作。
* RDB 实际上是 Redis 内部的一个定时器事件，它每隔一段固定时间就去检查当前数据发生改变的次数和改变的时间频率，看它们是否满足配置文件中规定的持久化触发条件。
* 当满足条件时，Redis 就会通过操作系统调用 fork() 来创建一个子进程，该子进程与父进程享有相同的地址空间。
* Redis 通过子进程遍历整个内存空间来获取存储的数据，从而完成数据持久化操作。
* 注意，此时的主进程则仍然可以对外提供服务，父子进程之间通过操作系统的 COW 机制实现了数据段分离，从而保证了父子进程之间互不影响。

### RDB 手动命令
* 通过SAVE命令或者BGSAVE命令将内存数据保存到磁盘文件中。
* SAVE与BGSAVE区别:
  * SAVE:阻塞 Redis 服务器进程，直到 dump.rdb 文件创建完毕为止，在这个过程中，服务器不能处理任何的命令请求。
  * BGSAVE:非阻塞式，并不影响 Redis 服务器处理客户端的其他请求。
  * SAVE命令执行速度要略快于BGSAVE命令。

### RDB 优缺点
* 优点：适合于大规模的数据恢复，还原速度快，相对的节省磁盘空间等等。
* 缺点：最后一次持久化的数据可能会出现丢失的情况，二进制rdb文件无可读性等等。

## Redis AOF持久化

### AOF
* AOF 称为追加模式，或日志模式。是 Redis 提供的另一种持久化策略。
* 它能够存储 Redis 服务器已经执行过的的命令，并且只记录对内存有过修改的命令。
* 这种数据记录方法，叫做“增量复制”，其文件为appendonly.aof(默认名称可设置)。

### AOF与RDB同时开启
* AOF 和 RDB 同时开启时，系统默认读取 AOF 的数据（数据不会存在丢失）。

### 命令重演
* 每当有一个修改数据库的命令被执行时，服务器就将命令写入到 appendonly.aof 文件中。
* 该文件存储了服务器执行过的所有修改命令，因此只要服务器重新执行一次 .aof 文件，实现还原数据，此过程被形象地称为命令重演。

### AOF机制
* 写入机制：
  * Redis 在收到客户端修改命令后，先进行相应的校验，如没问题，就立即将该命令追加到 .aof 文件中。
  * 先写到磁盘中，然后服务器再执行命令。
  * 这样就算遇到了突发的宕机断电等等情况，也只需进行一次命令重演就可以恢复到宕机前的状态。
  * 写入是一个 IO 操作。
  * Redis 为了提升写入效率，它不会将内容直接写入到磁盘中。
  * 而是将其放到一个内存缓存区（buffer）中，等到缓存区被填满时才真正将缓存区中的内容写入到磁盘里。
* 重写机制：
  * Redis 在长期运行的过程中，aof 文件会越变越长。
  * 如果机器宕机重启，命令重演会非常耗时，导致长时间 Redis 无法对外提供服务。
  * 因此就存在重写机制对aof文件进行精简。
  * 手动命令是:BGREWRITEAOF。
  * 重写期间，服务器不会被阻塞，它可以正常处理客户端发送的命令。

### AOF 优缺点
* 优点：丢失数据概率更低，日志文本可读等等。
* 缺点：恢复备份速度稍慢，相对占用更多的磁盘空间等等。

## Redis 主从模式

### 主从模式
* 主从模式（Master-Slave）是使用较多的一种软件架构。
* 主（Master）和从（Slave）分别部署在不同的服务器上，当主节点服务器写入数据时，同时也会将数据同步至从节点服务器。
* 主从模式下，数据的同步是自动完成的，这个数据同步的过程，又称为全量复制。
* 通常情况下，主节点负责写入数据，而从节点负责读取数据。
* 这种读写分离的模式可以大大减轻 Redis 主机的数据读取压力，从而提高了Redis 的效率，并同时提供了多个数据备份。
* 主从模式是搭建 Redis Cluster 集群最简单的一种方式。

## Redis 哨兵模式

### 哨兵模式
* Redis 主从模式中，因为系统不具备自动恢复功能，所以当主机宕机后，需要手动把一台从机切换为主机。
* 这个过程需要人为干预，并且会造成一段时间内服务器不可用，同时数据安全性也得不到保障，因此主从模式的可用性较低，不适用于线上生产环境。
* Redis 官方推荐一种高可用方案，也就是Redis 哨兵模式，它弥补了主从模式的不足。
* 哨兵模式是一种特殊的模式，Redis 为其提供了专属的哨兵命令，它是一个独立的进程，能够独立运行。
* 哨兵通过监控的方式获取主机的工作状态是否正常，当主机发生故障时会自动进行故障转移操作。
* 并将其监控的从机提升主机，保证系统的高可用性。
* 实际生产情况中，为避免哨兵发生意外，它一般是由 3～5 个节点组成，这样就算挂了个别节点，该集群仍然可以正常运转。

### 哨兵模式原理

#### 主观下线
* 主观下线，适用于主机和从机。如果在规定的时间内哨兵节点没有收到目标服务器的有效回复，则判定该服务器为“主观下线”。

#### 客观下线
* 客观下线，只适用于主机。哨兵节点发现主服务器出现了故障，它会通过相应的命令，询问其它哨兵节点对主服务器的状态判断。
* 如果超过半数以上的哨兵节点认为主机宕机，则判定主机为“客观下线”。

#### 投票选举
* 所有哨兵节点会通过投票机制，按照谁发现谁去处理的原则，选举发现故障的哨兵节点为领头节点去做故障转移操作。
* 领头节点则按照一定的规则在所有从节点中选择一个最优的作为主机，然后通过发布订阅功能通知其余的从节点更改配置文件，跟随新上任的主机。
* 完成主从切换的操作。

## Redis 集群

### Redis集群
* 主从模式实现了数据的多备份，哨兵模式实现了Redis的高可用。
* 但是还有问题没有解决，这两种模式都只有一个主节点负责写操作，在高并发的写操作场景，主节点存在写请求性能瓶颈与单机Redis容量有限的问题。
* 而Redis的集群模式中可以实现多个节点同时提供写操作，采用无中心结构，每个节点都保存数据，节点之间互相连接从而知道整个集群状态。
* 集群模式其实就是多个主从复制的结构组合起来的。

## Redis 集群分片

### 哈希槽?
* Redis 引入了哈希槽的概念。
* Redis Cluster 采用虚拟哈希槽分区，所有的键根据哈希函数映射到 0 ~ 16383 整数槽内。
* 每个key通过CRC16校验后对16384取模来决定放置哪个槽(Slot)。
* 每一个节点负责维护一部分槽以及槽所映射的键值数据。
* 在Redis Cluster中，只有Master才拥有槽的所有权
* 如果是某个Master的Slave，那么这个Slave只有使用权，没有所有权。
* 计算公式：slot = CRC16(key) % 16384

### 集群分片机制
* 主节点的数量为3，16384除以3，那么每个节点大约得到5460个槽。
* 存储数据时，对要存储的键进行CRC16哈希运算，得到一个值，并取模16384，判断这个值在哪个节点的范围区间。
  * 如键key中包含"{}"，且"{}"中至少包含1个字符，"{}"中的部分是CRC16哈希运算部分。
  * 如键中不包含"{}"，那么整个键都是CRC16哈希运算部分。
* 查询数据时，对要查询的键进行CRC16哈希运算，得到一个值，并取模16384，判断这个值在哪个节点的范围区间。
  * 如键key中包含"{}"，且"{}"中至少包含1个字符，"{}"中的部分是CRC16哈希运算部分。
  * 如键中不包含"{}"，那么整个键都是CRC16哈希运算部分。
* 这样的结构很容易添加或者删除节点，并且无论是添加删除或者修改节点，都不会造成集群不可用。
  * 需要增加节点时，只需要把其他节点的某些哈希槽挪到新节点即可。
  * 需要删除节点时，只需要把移除节点上的哈希槽挪到其他节点即可。

### 添加新Node至集群
```bash
# 添加Node
redis-cli --cluster add-node new_host:new_port existing_host:existing_port
# 集群重新分片
redis-cli --cluster reshard <host:port> or <host> <port>
```

### 删除集群中Node
```bash
# 集群重新分片
redis-cli --cluster reshard <host:port> or <host> <port>
# 添加Node
redis-cli --cluster del-node host:port node_id
```

### 集群故障恢复
* 如果主节点宕机，默认15秒后，从节点能自动升为主节点。
* 如果某一段插槽的主从都挂掉，而 cluster-require-full-coverage为 yes，那么整个集群都挂掉。
* cluster-require-full-coverage为no，那么该节点对应的插槽数据全都不能使用，也无法存储。
```bash
# cluster-require-full-coverage默认值为yes
127.0.0.1:9000> config get cluster-require-full-coverage
1) "cluster-require-full-coverage"
2) "yes
```
* 手动主从切换：可进入从节点使用CLUSTER FAILOVER命令进行切换

## Redis集成Springboot

### Spring-Data-Redis
* Spring-Data-Redis是Spring-Data模块的一部分,专门用来支持在Spring管理项目对Redis的操作。
* 使用Java操作Redis最常用的是使用Jedis,但并不是只有Jedis可以使用。
* Spring-Data-Redis提供了Redis的Java客户端的抽象,和Spring原生集成。
* 比起单纯的使用Redis其他推荐客户端,例如Jedis,会更加稳定、管理起来更加自动化。

### Spring-Data-Redis功能
1. 提供了一个高度封装的“RedisTemplate”类，里面封装了对Redis的数据结构的各种操作
2. RedisTemplate采用是lettuce(基于netty采用异步非阻塞式lO)进行通信，大并发下比Jedis效率更高。
3. RedisTemplate使用序列化器操作Redis数据
> `JdkSerializationRedisSerializer` 默认的Key序列化器，POJO类通过ObjectInputstream/ObjectOutputstream进行序列化操作，最终redis-server中将存储字节序列 \
> `StringRedisSerializer` 适用于Key或者Value为字符串的场景,最轻量级和高效的策略 \
> `GenericJackson2JsonRedisSerializer` jackson-json提供JavaBean与JSON之间的转换能力，能将POJO实例序列化成JSON格式存储在Redis中，也可以将JSON格式的数据转换成POJO实例

### Spring-Data-Redis快速入门
1. 创建项目，导入Maven坐标引入依赖
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240516151002.png)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```
2. SpringBoot配置文件添加Redis配置
```yml
# Redis/Spring-Data-Redis/src/main/resources/application.yml
spring:
  data:
    redis:
      host: localhost # 本地IP 或是 虚拟机IP
      port: 6379
      password: 123456
      database: 0 # 默认使用 0号 db
```
3. 可按需求配置RedisTemplate序列化器
```java
// Redis/Spring-Data-Redis/src/main/java/config/RedisConfig.java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

        //默认的Key序列化器为：JdkSerializationRedisSerializer
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new StringRedisSerializer());

        redisTemplate.setConnectionFactory(redisConnectionFactory);

        return redisTemplate;
    }
}
```

4. 测试
```java
@SpringBootTest
class SpringDataRedisApplicationTests {

	@Autowired
	private RedisTemplate<Object,Object> redisTemplate;

	@Test
	public void contextLoads(){
		redisTemplate.opsForValue().set("name","zhangsan");
		System.out.println(redisTemplate.opsForValue().get("name")); // zhangsan
	}

	@Test
	public void contextLoads2(){
		redisTemplate.opsForList().leftPushAll("nameList","zhangsan","lisi","wangwu");
		System.out.println(redisTemplate.opsForList().range("nameList",0,-1)); // [wangwu, lisi, zhangsan]
	}

}
```

## 代码附录

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