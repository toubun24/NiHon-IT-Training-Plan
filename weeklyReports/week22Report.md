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
  * RabbitMQ-介绍 18:00-18:15
  * RabbitMQ-安装(Linux) 18:15-18:30 21:15-21:30 23:25-23:28
  * RabbitMQ-安装(Docker) 23:28-23:48
  * RabbitMQ-概念定义 23:48-00:03

* **2023.05.17 金曜日:** 
  * RabbitMQ-安装(Linux) 19:45-20:15 20:20-20:40
  * RabbitMQ-简单队列模式 
  * RabbitMQ-工作队列模式 
  * RabbitMQ-发布订阅模式 
  * RabbitMQ-路由模式 
  * RabbitMQ-主题模式 
  * RabbitMQ-持久化 
  * RabbitMQ-消息拒绝 
  * RabbitMQ-死信队列 
  * RabbitMQ-集成SpringBoot 

* **2023.05.18 土曜日:** 

* **2023.05.19 日曜日:** 


## 学习笔记

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

### 22.8【基本解决】RabbitMQ Debian 安装 `systemctl status rabbitmq-server` 命令报错 `System has not been booted with systemd as init system (PID 1). Can't operate. Failed to connect to bus: Host is down`
```bash
root@DESKTOP-9MBCA87:/home/toubun# systemctl status rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
* 首先是还没有启动`systemctl start rabbitmq-server`
```bash
root@DESKTOP-9MBCA87:/home/toubun# systemctl start rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
* 在CMD中检查WSL版本
```bash
C:\Windows\System32>wsl -l -v
  NAME                   STATE           VERSION
* docker-desktop         Running         2
  Debian                 Running         2
  docker-desktop-data    Running         2
  Ubuntu                 Stopped         2
```
* 尝试手动启动
```bash
root@DESKTOP-9MBCA87:/home/toubun# /usr/sbin/rabbitmq-server start
2024-05-17 20:04:21.568252+08:00 [info] <0.228.0> Feature flags: list of feature flags found:
2024-05-17 20:04:21.578855+08:00 [info] <0.228.0> Feature flags:   [ ] classic_mirrored_queue_version
2024-05-17 20:04:21.578933+08:00 [info] <0.228.0> Feature flags:   [ ] implicit_default_bindings
2024-05-17 20:04:21.578995+08:00 [info] <0.228.0> Feature flags:   [ ] maintenance_mode_status
2024-05-17 20:04:21.579011+08:00 [info] <0.228.0> Feature flags:   [ ] quorum_queue
2024-05-17 20:04:21.579042+08:00 [info] <0.228.0> Feature flags:   [ ] stream_queue
2024-05-17 20:04:21.579060+08:00 [info] <0.228.0> Feature flags:   [ ] user_limits
2024-05-17 20:04:21.579097+08:00 [info] <0.228.0> Feature flags:   [ ] virtual_host_metadata
2024-05-17 20:04:21.579125+08:00 [info] <0.228.0> Feature flags: feature flag states written to disk: yes
2024-05-17 20:04:21.818128+08:00 [notice] <0.44.0> Application syslog exited with reason: stopped
2024-05-17 20:04:21.818220+08:00 [notice] <0.228.0> Logging: switching to configured handler(s); following messages may not be visible in this log output

  ##  ##      RabbitMQ 3.10.8
  ##  ##
  ##########  Copyright (c) 2007-2022 VMware, Inc. or its affiliates.
  ######  ##
  ##########  Licensed under the MPL 2.0. Website: https://rabbitmq.com

  Erlang:      26.2.5 [jit]
  TLS Library: OpenSSL - OpenSSL 3.0.11 19 Sep 2023
  Release series support status: supported

  Doc guides:  https://rabbitmq.com/documentation.html
  Support:     https://rabbitmq.com/contact.html
  Tutorials:   https://rabbitmq.com/getstarted.html
  Monitoring:  https://rabbitmq.com/monitoring.html

  Logs: /var/log/rabbitmq/rabbit@DESKTOP-9MBCA87.log
        /var/log/rabbitmq/rabbit@DESKTOP-9MBCA87_upgrade.log
        <stdout>

  Config file(s): (none)

  Starting broker... completed with 0 plugins.
```
* 由于上述Debian窗口被占用无法继续输入指令，于是在另一个Debian窗口中重新尝试先前的指令
```bash
root@DESKTOP-9MBCA87:/home/toubun# systemctl start rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
```bash
root@DESKTOP-9MBCA87:/home/toubun# systemctl status rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
* 参考文心一言的解释：既然您已经能够手动启动 RabbitMQ，那么您应该能够继续使用 RabbitMQ 而无需通过 systemctl。但是，如果您希望在启动 Debian 实例时自动启动 RabbitMQ，您可能需要考虑其他方法
* 再尝试确认系统是否使用systemd：一些老旧的Linux发行版或者特殊用途的系统（如容器）可能不使用systemd作为初始化系统。你可以通过查看`/sbin/init`的链接或者运行`ps -p 1`来确认`PID 1`是哪个进程
```bash
root@DESKTOP-9MBCA87:/home/toubun# ps -p 1
  PID TTY          TIME CMD
    1 hvc0     00:00:00 init(Debian)
```
从输出结果来看，您的 Debian 系统中 PID 为 1 的进程是 init(Debian)，这表示您的系统使用的是传统的 SysV init 系统而不是 systemd。在这种情况下，systemctl 命令将不可用，因为它依赖于 systemd。
* 由于后续`创建管理员账户`等相关操作均能正常实现，此处便不再纠结于`systemctl`