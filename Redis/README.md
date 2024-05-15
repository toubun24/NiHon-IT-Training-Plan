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







