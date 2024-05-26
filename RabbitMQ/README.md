# RabbitMQ

## RabbitMQ介绍

### MQ消息总线(Message Queue)
* 消息总线(Message Queue)，是一种跨进程、异步的通信机制，用于上下游传递消息。由消息系统来确保消息的可靠传递。

### RabbitMQ简介
* RabbitMQ是一个Erlang开发的高级消息队列协议（Advanced Message Queuing Protocol）的开源实现。
* AMQP 是在 2006 年的 6 月，由 Cisco 、Red Hat、iMatix 等联合制定的公开标准。
* RabbitMQ由RabbitMQ科技有限公司开发并且提供商业支持的。该公司在2010年4月被SpringSource收购。在2013年5月被并入Pivotal。

### RabbitMQ使用场景
* 对于一个大型的软件系统来说，它会有很多的组件或者说模块，又或者说子系统。
* 那么不同的模块可以部署到不同的机器上，那这些模块又如何通信？会有很多问题需要解决。如：
  * 信息的发送者和接收者如何维持这个连接，如果一方的连接中断，这期间的数据的丢失问题？
  * 如何降低发送者和接收者的耦合度？
  * 如何做到可扩展？
  * 如何保证接收者接收到了完整，正确的数据？…​
* AMQP协议解决了以上的问题，而RabbitMQ实现了AMQP。

### 常见几种MQ的比较

#### ActiveMQ：
* 单机吞吐量万级，时效性毫秒ms级，可用性高，基于主从架构实现高可用性，较低的概率丢失数据
* 官方社区现在对 ActiveMQ 的维护越来越少，高吞吐量场景较少使用。

#### RocketMQ：
* 单机吞吐量十万级，可用性非常高。分布式架构，消息可以做到0丢失。MQ 功能较为完善，而且分布式结构扩展性好。支持 10 亿级别的消息堆积，不会因为堆积导致性能下降。
* 支持的客户端语言不多。社区活跃度一般。

#### RabbitMQ：
* 由于 Erlang 语言的高并发特性，性能较好。吞吐量万级，MQ 功能比较备，健壮、稳定、易用、跨平台、支持多种语言。
* 社区活跃度高，更新频率高。

#### Kafka：
* 单机吞吐量约百万条/秒。时效性毫秒ms级，分布式架构，在日志领域比较成熟。支持简单的 MQ 功能，在大数据领域的实时计算以及日志采集被大规模使用
* 消息消费失败不支持重试。支持消息顺序， 但是一台代理宕机后，就会产生消息乱序。

#### 总结：
* RocketMQ适用于金融互联网领域对于可靠性要求很高的场景，比如电商里面的订单扣款。
* RabbitMQ结合 Erlang 语言本身的并发优势，性能好时效性微秒级，社区活跃度高，管理界面方便，中小型公司优先选择功能比较完备的 RabbitMQ。
* Kafka适用于大数据，如有日志采集需求，首选Kafka。

### RabbitMQ安装

#### RabbitMQ Linux Debian安装
```bash
# 安装一些必需的依赖项
root@DESKTOP-9MBCA87:/home/toubun# sudo apt-get install software-properties-common curl gnupg2 apt-transport-https -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
software-properties-common is already the newest version (0.99.30-4).
curl is already the newest version (7.88.1-10+deb12u5).
gnupg2 is already the newest version (2.2.40-1.1).
apt-transport-https is already the newest version (2.6.1).
The following packages were automatically installed and are no longer required:
  initscripts insserv orphan-sysvinit-scripts startpar sysv-rc ucf
Use 'sudo apt autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 15 not upgraded.
```
```bash
# 自动添加存储库(Debian环境)
root@DESKTOP-9MBCA87:/home/toubun# curl -1sLf 'https://dl.cloudsmith.io/public/rabbitmq/rabbitmq-erlang/setup.deb.sh' | sudo -E bash
Executing the  setup script for the 'rabbitmq/rabbitmq-erlang' repository ...

   OK: Checking for required executable 'curl' ...
   OK: Checking for required executable 'apt-get' ...
   OK: Detecting your OS distribution and release using system methods ...
 ^^^^: ... Detected/provided for your OS/distribution, version and architecture:
 >>>>:
 >>>>: ... distro=debian  version=12  codename=bookworm  arch=x86_64
 >>>>:
   OK: Checking for apt dependency 'apt-transport-https' ...
   OK: Checking for apt dependency 'ca-certificates' ...
   OK: Checking for apt dependency 'gnupg' ...
   OK: Checking for apt signed-by key support ...
   OK: Importing 'rabbitmq/rabbitmq-erlang' repository GPG keys ...
   OK: Checking if upstream install config is OK ...
   OK: Installing 'rabbitmq/rabbitmq-erlang' repository via apt ...
   OK: Updating apt repository metadata cache ...
   OK: The repository has been installed successfully - You're ready to rock!
```
```bash
# 执行安装Erlang与RabbitMQ
root@DESKTOP-9MBCA87:/home/toubun# apt-get update
...
Fetched 298 kB in 38s (7824 B/s)
Reading package lists... Done
```
```bash
root@DESKTOP-9MBCA87:/home/toubun# apt-get install erlang erlang-nox
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
curl is already the newest version (7.88.1-10+deb12u5).
The following packages were automatically installed and are no longer required:
  initscripts insserv orphan-sysvinit-scripts startpar sysv-rc ucf
Use 'sudo apt autoremove' to remove them.
...
0 upgraded, 63 newly installed, 2 to remove and 15 not upgraded.
Need to get 27.5 MB of archives.
After this operation, 118 MB of additional disk space will be used.
...
Processing triggers for libc-bin (2.36-9+deb12u4) ...
ldconfig: /usr/lib/wsl/lib/libcuda.so.1 is not a symbolic link
Processing triggers for libgdk-pixbuf-2.0-0:amd64 (2.42.10+dfsg-1+b1) ...
```
```bash
root@DESKTOP-9MBCA87:/home/toubun# apt-get install rabbitmq-server -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
...
0 upgraded, 3 newly installed, 0 to remove and 15 not upgraded.
Need to get 15.4 MB of archives.
After this operation, 25.0 MB of additional disk space will be used.
...
Adding system user `rabbitmq' (UID 103) ...
Adding new user `rabbitmq' (UID 103) with group `rabbitmq' ...
Not creating home directory `/var/lib/rabbitmq'.
Created symlink /etc/systemd/system/multi-user.target.wants/rabbitmq-server.service -> /lib/systemd/system/rabbitmq-server.service.
invoke-rc.d: could not determine current runlevel
Processing triggers for libc-bin (2.36-9+deb12u4) ...
ldconfig: /usr/lib/wsl/lib/libcuda.so.1 is not a symbolic link
```
```bash
# 启动RabbitMQ与验证
root@DESKTOP-9MBCA87:/home/toubun# erl -v
Erlang/OTP 26 [erts-14.2.5] [source] [64-bit] [smp:12:12] [ds:12:12:10] [async-threads:1] [jit:ns]
Eshell V14.2.5 (press Ctrl+G to abort, type help(). for help)
1> # Ctrl+C Ctrl+C
BREAK: (a)bort (A)bort with dump (c)ontinue (p)roc info (i)nfo
       (l)oaded (v)ersion (k)ill (D)b-tables (d)istribution
```
```bash
# 启动RabbitMQ与验证【问题22.8】
root@DESKTOP-9MBCA87:/home/toubun# systemctl start rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
```bash
# 启动RabbitMQ与验证【问题22.8】
root@DESKTOP-9MBCA87:/home/toubun# systemctl status rabbitmq-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
```bash
# 手动方式启动RabbitMQ【问题22.8】
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
```bash
# 创建 RabbitMQ 管理员帐户
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqctl add_user admin admin
Adding user "admin" ...
Done. Don't forget to grant the user permissions to some virtual hosts! See 'rabbitmqctl help set_permissions' to learn more.
```
```bash
# 在管理员帐户上设置管理员Tag
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...
```
```bash
# 在管理员帐户上设置所需的权限
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "/" ...
```
```bash
# 列出所有权限
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqctl list_permissions -p /
Listing permissions for vhost "/" ...
user    configure       write   read
guest   .*      .*      .*
admin   .*      .*      .*
```
```bash
# 开启 RabbitMQ 管理仪表板
root@DESKTOP-9MBCA87:/home/toubun# rabbitmq-plugins enable rabbitmq_management
Enabling plugins on node rabbit@DESKTOP-9MBCA87:
rabbitmq_management
The following plugins have been configured:
  rabbitmq_management
  rabbitmq_management_agent
  rabbitmq_web_dispatch
Applying plugin configuration to rabbit@DESKTOP-9MBCA87...
The following plugins have been enabled:
  rabbitmq_management
  rabbitmq_management_agent
  rabbitmq_web_dispatch

started 3 plugins.
```
```bash
# RabbitMQ 管理仪表板默认端口15672进行检查
root@DESKTOP-9MBCA87:/home/toubun# ss -tunelp | grep 15672
tcp   LISTEN 0      1024         0.0.0.0:15672      0.0.0.0:*    users:(("beam.smp",pid=1091,fd=36)) uid:103 ino:28883 sk:5 cgroup:/ <->
# http://127.0.0.1:15672/
# Username: admin
# Password: admin
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240517235558.png)
```bash
# bash: wget: command not found
sudo apt update
sudo apt install wget
```
```bash
# 下载 RabbitMQ 提供的 rabbitmqadmin
root@DESKTOP-9MBCA87:/home/toubun# wget http://127.0.0.1:15672/cli/rabbitmqadmin
--2024-05-18 00:04:45--  http://127.0.0.1:15672/cli/rabbitmqadmin
Connecting to 127.0.0.1:15672... connected.
HTTP request sent, awaiting response... 200 OK
Length: 42416 (41K) [application/octet-stream]
Saving to: 'rabbitmqadmin'

rabbitmqadmin                100%[==============================================>]  41.42K  --.-KB/s    in 0.001s

2024-05-18 00:04:45 (67.2 MB/s) - 'rabbitmqadmin' saved [42416/42416]
```
```bash
# 复制到系统位置
root@DESKTOP-9MBCA87:/home/toubun# ls
dump.rdb  rabbitmqadmin

root@DESKTOP-9MBCA87:/home/toubun# mv rabbitmqadmin /usr/bin/
```
```bash
# 设置权限
root@DESKTOP-9MBCA87:/home/toubun# chmod 775 /usr/bin/rabbitmqadmin
```
```bash
# 验证 rabbitmqadmin
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqadmin --version
rabbitmqadmin 3.10.8
```
```bash
# RabbitMQ 配置备份
root@DESKTOP-9MBCA87:/home/toubun# rabbitmqadmin export rabbitmq-backup-config.json
Exported definitions for localhost to "rabbitmq-backup-config.json"

root@DESKTOP-9MBCA87:/home/toubun# ls
dump.rdb  rabbitmq-backup-config.json
```
```bash
# RabbitMQ 备份恢复
root@DESKTOP-9MBCA87:/home/toubun# cat rabbitmq-backup-config.json
{"rabbit_version":"3.10.8","rabbitmq_version":"3.10.8","product_name":"RabbitMQ","product_version":"3.10.8","users":[{"name":"admin","password_hash":"z6ee5hlHzOf4op2CaMpoMMy7rdAZ7xIQjUHpEz0ePXcF7MbG","hashing_algorithm":"rabbit_password_hashing_sha256","tags":["administrator"],"limits":{}},{"name":"guest","password_hash":"N5bvdJUyMqLc6ha/TpXWeBzzgOv4aR8sKnyIBj6mH8lvNqP2","hashing_algorithm":"rabbit_password_hashing_sha256","tags":["administrator"],"limits":{}}],"vhosts":[{"name":"/"}],"permissions":[{"user":"guest","vhost":"/","configure":".*","write":".*","read":".*"},{"user":"admin","vhost":"/","configure":".*","write":".*","read":".*"}],"topic_permissions":[],"parameters":[],"global_parameters":[{"name":"internal_cluster_id","value":"rabbitmq-cluster-id-OB0QC4LHcunGsaFfKQHWBw"}],"policies":[],"queues":[],"exchanges":[],"bindings":[]}
```

#### RabbitMQ Docker安装
```bash
C:\Windows\System32>docker run -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13.2-management
Unable to find image 'rabbitmq:3.13.2-management' locally
3.13.2-management: Pulling from library/rabbitmq
a8b1c5f80c2d: Pull complete
4dedb6d843e5: Pull complete
5c1196c9f92f: Pull complete
89aa66202de9: Pull complete
7482e2b5f1fd: Pull complete
cae0f9147f71: Pull complete
5e8608f82ef5: Pull complete
76a071de98b9: Pull complete
140f907150d0: Pull complete
53c7a9878ba6: Pull complete
Digest: sha256:eee9afbc17c32424ba6309dfd2d9efc9b9b1863ffe231b3d2be2815758b0d649
Status: Downloaded newer image for rabbitmq:3.13.2-management
...

  ##  ##      RabbitMQ 3.13.2
  ##  ##
  ##########  Copyright (c) 2007-2024 Broadcom Inc and/or its subsidiaries
  ######  ##
  ##########  Licensed under the MPL 2.0. Website: https://rabbitmq.com

  Erlang:      26.2.5 [jit]
  TLS Library: OpenSSL - OpenSSL 3.1.5 30 Jan 2024
  Release series support status: supported

  Doc guides:  https://www.rabbitmq.com/docs
  Support:     https://www.rabbitmq.com/docs/contact
  Tutorials:   https://www.rabbitmq.com/tutorials
  Monitoring:  https://www.rabbitmq.com/docs/monitoring
  Upgrading:   https://www.rabbitmq.com/docs/upgrade

  Logs: <stdout>

  Config file(s): /etc/rabbitmq/conf.d/10-defaults.conf

  Starting broker...2024-05-16 15:37:44.527576+00:00 [info] <0.254.0>
```
```bash
localhost:15672
Username: guest
Password: guest
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240516234358.png)

#### RabbitMQ Docker yaml安装
```yml
version: "3.8"

services:
  queue:
    image: rabbitmq:3.13.2-management
    container_name: rabbitmq-yaml
    ports:
      - '5672:5672'
      - '15672:15672'
```
```bash
G:\NiHon-IT-Training-Plan\RabbitMQ>docker-compose -f .\docker-compose.yaml up -d
[+] Running 1/0
[+] Running 1/1abbitmq-yaml  Created                                                                                0.0s
 ✔ Container rabbitmq-yaml  Created                                                                                0.0s
Error response from daemon: driver failed programming external connectivity on endpoint rabbitmq-yaml (33f9cbc54615ed299b57011db6269d770ce247fb7df25684923b646e3afa1d9e): Bind for 0.0.0.0:15672 failed: port is already allocated
```
* 此处安装失败应该是因为15672端口先前docker方式安装的RabbitMQ还正在运行，就不再重复安装了

## RabbitMQ概念定义

### RabbitMQ Server
* 也叫Broker Server，是一种传输服务。它的任务是维护一条从Producer(生产者)到Consumer(消费者)的路线，保证数据能够按照指定的方式进行传输。
* 简单说就是消息队列服务器实体。
* 虽然这个保证不是100%的保证，但是对于普通的应用来说已经足够了。
* 当然对于商业系统来说，可以再做一层数据一致性的guard，彻底保证系统的一致性。

### Producer(生产者)
* 数据发送方。
* 一个Message有两个部分：payload(有效载荷)和label(标签)
* payload是传输的数据。label是exchange的名字或者说是一个tag，它描述了payload。
* 而且RabbitMQ也是通过这个label来决定把这个Message发给哪个Consumer(消费者)。
* AMQP仅仅描述了label，而RabbitMQ决定了如何使用这个label的规则。

### Consumer(消费者)
* 数据接收方。
* 可以把queue比作一个邮箱。当有Message到达某个邮箱后，RabbitMQ把它发送给它的某个消费者即Consumer。
* 当然可能会把同一个Message发送给很多的Consumer。
* 对于消费者来说，它是不知道谁发送的这个信息的。
* 当然如果Message本身包含了生产者的信息就另当别论了。

### Connection(连接)
* 一个TCP连接。Producer和Consumer都通过TCP连接到RabbitMQ Server。

### Channel(通道)
* 虚拟连接。它建立在上述的TCP连接中。数据流动都是在Channel中进行的。
* 也就是说，一般情况是程序起始建立TCP连接，第二步就是建立Channel。
* 在客户端的每个连接里，可建立多个Channel，每个Channel代表一个会话任务。

### Queue
* 消息队列，每个消息都会被投入到一个或多个队列。

### Exchange(消息交换机)
* 指定消息按什么规则，路由到哪个队列。

### Routing Key
* 路由关键字，Exchange根据这个关键字进行消息投递。

### Binding
* 绑定，它的作用就是把Exchange和Queue按照路由规则绑定起来。

### VHost
* 虚拟主机，一个Broker里可以开设多个VHost，用作不同用户的权限分离。
* `http://localhost:15672/#/users/guest - Admin - Users / Virtual Hosts`

## RabbitMQ简单队列

### Hello World简单队列
* 最简单的队列模式，一个消息生产者来发送消息、一个消息消费者来消费消息。
* 先进先出，公平调度。

#### `Run 'HelloProducer.main()'`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521001319.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521001458.png)
* 点击`http://localhost:15672/#/queues`中的`HelloWorldQueue`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521002224.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521002254.png)
* 运行`HelloConsumer.main()`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521002405.png)
* 关闭终端中正在运行的`HelloProducer.main()`和`HelloConsumer.main()`后，将
```java
channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
```
修改为
```java
channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {});
```
随后重新分别运行一次`HelloProducer.main()`和`HelloConsumer.main()`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521002952.png)
发现终端中可以得到消息`Hello World`，但队列中并未被签收，注意`Unacked`状态
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521003146.png)

## RabbitMQ工作队列

### Work Queues工作队列
* 在前面的Hello World简单队列模式，因其公平调度机制，如有多个消费者，其中一个消费者的速度较慢，将会拖累整个队列消息处理速度。
* 在Work Queues工作队列模式中，可以为速度快的消费者提供更多消息，从而提高任务处理速度。
* 不需要设置交换机，需要指定唯一的消息队列来进行消息传递，可以有多个消费者。
* 消费者必须要等消费完一条消息后才可以准备接收下一条消息。
* 操作方式:关闭自动应答即可，进行手动应答。

## RabbitMQ发布订阅

### Publish/Subscribe发布订阅模式
* 消息生产者把消息发送给Broker Server,然后Broker Server中的交换机把消息转发到绑定此交换机的每个队列，每个绑定交换机的队列将接收到来自交换机消息。
* 根据交换机的具体定义,发布订阅模式可实现一条消息同时被多个消费者消费。

### 交换机类型
* Direct:直连，routingKey与交换机绑定，相同的routingKey会获得相同的消息。
* Fanout:扇出，与routingKey无关，将消息交给所有绑定到交换机的队列。
* Topic:主题，队列通过消息主题与交换机绑定，把消息交给符合routing pattern(路由模式)的队列。
* Headers:头，与routingKey无关，匹配消息头中的属性信息。

### Run `_03_PubSubQueue`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240523222127.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240523222238.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240523222315.png)

## RabbitMQ路由模式

### Routing路由模式
* 路由模式和发布订阅模式类似，只是在发布订阅模式的基础上改变了交换机的类型(fanout ⇒ direct)。
* 路由模式下，交换机根据routingKey进行完全匹配。如果匹配上则消费者收到消息。

### Run `_04_Routing`

#### `_04_Routing/RoutingProducer.java`
```java
channel.basicPublish(EXCHANGE_NAME, "orange", null, message.getBytes(StandardCharsets.UTF_8));
```

#### `_04_Routing/RoutingConsumer.java`
```java
channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange");
```
由于路由对应正确，`RoutingConsumer`将接收到`RoutingProducer`的所有消息
* 随后尝试修改该路由名称
```java
channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orang");
```
发现依然能接收到所有消息
* 在`http://localhost:15672/#/queues/%2F/RoutingQueue`中查看
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240524212441.png)
发现原先的路由也还在绑定状态，`Unbind`后重试运行（甚至可能需要重启Docker中的RabbitMQ，见**【问题23.5】**），不再能收到消息

## RabbitMQ主题模式

### Topics主题模式
* 主题模式和路由模式类似，只是在路由模式的基础上改变了交换机的类型(direct ⇒ topic)。
* 主题模式下，生产者向交换机发送消息后，消费者可以使用匹配字符进行匹配。
* 提供两种匹配字符， `*` 和 `#` ，`*` 匹配单层级，`#` 可匹配多层级或无层级。

### Run `_05_Topic`

#### `_05_Topic/TopicConsumer.java`
```java
channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*");
```

#### `_05_Topic/TopicConsumer1.java`
```java
channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.#");
```

#### `_05_Topic/TopicProducer.java`
```java
channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8));
```
此时`TopicConsumer`和`TopicConsumer1`均可收到全部消息
```java
channel.basicPublish(EXCHANGE_NAME, "orange.to.black", null, message.getBytes(StandardCharsets.UTF_8)); // 【问题23.5】
```
此时`TopicConsumer`不再能收到消息，而`TopicConsumer1`仍可收到全部消息（依旧需要注意**【问题23.5】**）

## RabbitMQ持久化

### 持久化
* RabbitMQ的持久化主要在三个方面，交换机持久化，队列持久化，消息持久化。

### 队列持久化
* 队列持久化：声明队列有一个参数durable，代表RabbitMQ服务器重启时，是否自动创建队列。
```java
/**
* 声明队列
* 参数1.queue:队列名称
* 参数2.durable:队列是否持久化，默认false存储在内存中
* 参数3.exclusive:是否排他.如果一个队列声明为排他队列，该队列对首次声明它的连接可见，并在连接断开时自动删除
* 参数4.autoDelete:是否自动删除 最后一个消费者断开连接以后 该队列是否自动删除
* 参数5.arguments:封装描述队列的其他信息
*/
channel.queueDeclare(QUEUE_NAME, true, false, false, null);
```

### 交换机持久化
* 交换机持久化：声明交换机有一个参数durable，代表RabbitMQ服务器重启时，是否自动创建交换机。
```java
/**
* 声明交换机
* 参数1.exchange:交换机名称
* 参数2.type:交换机类型
* 参数3.durable:交换机是否持久化
*/
channel.exchangeDeclare(EXCHANGE_NAME, "topic", true);
```

### 消息持久化
* 消息持久化：前提条件需要队列持久化。
* 消息持久化与之前的持久化操作有所不同，消息持久化在于创建消息的时候，需要添加一个持久化消息的属性。
* 发送消息时有参数：BasicProperties，里面可以封装消息的各种属性，如持久化，优先级等属性。
```java
String contentType 消息的内容类型
String contentEncoding 消息内容编码
Map<String, Object> headers 消息的header
Integer deliveryMode 持久化
Integer priority 优先级
String correlationId 关联ID
String replyTo 指定回复的队列的名称
String expiration 消息的失效时间
String messageId 消息ID
Date timestamp 消息时间戳
String type 类型
String userId 用户ID
String appId 应用程序ID
String clusterId 集群ID
```
* 持久化的key值为"deliveryMode"，当"deliveryMode"为1时表示消息不持久化，为2时表示消息持久化
```java
//BasicProperties构建器
AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder();
//设置消息持久化属性，还可以设置其他BasicProperties属性等等
builder.deliveryMode(2).headers(xxx);
AMQP.BasicProperties properties = builder.build();
channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes());
```

### 基于`_05_Topic`进行持久化测试

#### `_05_Topic/TopicConsumer.java`
* 首先重启Docker中的RabbitMQ，回到初始状态
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525005650.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525005739.png)
* 修改代码并运行
```java
// channel.exchangeDeclare(EXCHANGE_NAME,"topic"); // 主题模式
channel.exchangeDeclare(EXCHANGE_NAME,"topic", false); // 持久化测试false
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525005935.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525005829.png)
* 断开`_05_Topic/TopicConsumer.java`后再次重启Docker中的RabbitMQ
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010149.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010213.png)
* 对代码进行修改，开启持久化
```java
// channel.exchangeDeclare(EXCHANGE_NAME,"topic", false); // 持久化false
channel.exchangeDeclare(EXCHANGE_NAME,"topic", true); // 持久化true
// channel.queueDeclare(QUEUE_NAME,false,false,false,null);
channel.queueDeclare(QUEUE_NAME,true,false,false,null); // 持久化true
```
* 运行`_05_Topic/TopicConsumer.java`后断开，重启Docker中的RabbitMQ，此时交换机和队列依然存在，且`durable:	true`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010603.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010743.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010803.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525010828.png)

#### `_05_Topic/TopicProducer.java`
```java
// channel.exchangeDeclare(EXCHANGE_NAME, "topic");
channel.exchangeDeclare(EXCHANGE_NAME, "topic", true); // 消息持久化
AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder(); // 消息持久化
builder.deliveryMode(2); // 消息持久化
AMQP.BasicProperties properties = builder.build(); // 消息持久化
for (int i = 0; i < 50; i++) {
    // ...
    // channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8));
    channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes(StandardCharsets.UTF_8)); // 消息持久化
}
```
* 运行`TopicProducer.java`（此时没有正在运行的`Consumer`）
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525011758.png)
* 关闭`TopicProducer.java`后，重启Docker中的RabbitMQ，消息依然存在，同时尝试`Get messages`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525012206.png)

## RabbitMQ消息拒绝

### 消息拒绝
* RabbitMQ的消息拒绝：前提条件需要手动ACK。消费者可以根据信息的内容，拒绝消费这个消息。
* 提供两种方式，分别是 Reject 和 Nack。

### `_06_Reject/RejectConsumer1.java`
```java
// channel.basicReject(delivery.getEnvelope().getDeliveryTag(),true); // reject方式 // RejectMessage RejectMessage RejectMessage ...
// channel.basicNack(delivery.getEnvelope().getDeliveryTag(),false,true); // nack方式, 重回队列false // RejectMessage RejectMessage RejectMessage ...
channel.basicNack(delivery.getEnvelope().getDeliveryTag(),false,false); // nack方式, 重回队列true // RejectMessage
```
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525212441.png)

## RabbitMQ死信队列

### 死信
* 消息成为死信一般是以下三种情况：
  * 消息被消费者拒绝，并且设置 requeue 参数为 false。
  * 消息过期(默认情况下 RabbitMQ 中的消息不过期，但是可以设置消息过期时间)
  * 消息队列达到最大长度(如消息队列设置了最大队列长度或大小并且达到最大值时)
* 当满足上面三种情况时，消息会成为死信消息,并通过死信交换机投递到相应的死信队列中。
* 我们只需要监听相应的死信队列,就可以对死信消息进行最后的处理。

### `_07_Dead`

#### 先停留在普通队列几秒后再进入死信队列
* 注意先`delete``http://127.0.0.1:15672/#/exchanges`中先前设置的持久化交换机，防止与当前测试的非持久化参数同名交换机设置产生冲突；随后运行`DeadConsumer.java`，运行成功后**关闭**`DeadConsumer.java`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525220834.png)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525220904.png)
* 确认**关闭**`DeadConsumer.java`后，启动`DeadProducer.java`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525222301.png)
* 几秒后
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525222336.png)

#### 直接进入死信队列
* 先在`DeadConsumer.java`中添加一句`channel.basicReject(delivery.getEnvelope().getDeliveryTag(),false);`
```java
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
    System.out.println(new String(delivery.getBody()));
    // channel.basicReject(delivery.getEnvelope().getDeliveryTag(),true); // 消息拒绝
    // // 先停留在普通队列几秒后再进入死信队列
    channel.basicReject(delivery.getEnvelope().getDeliveryTag(),false); // 直接进入死信队列
};
```
* 先启动`DeadConsumer.java`（这次保持运行状态，不关闭），随后启动`DeadProducer.java`，`DeadQueue`直接从上一步的`101`变为`202`
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525223310.png)

#### 队列最大长度测试
* 相关代码
```java
// DeadConsumer.java
params.put("x-max-length", 5);
```
* 在`DeadProducer.java`中将
```java
// String message = "RejectMessage"; // 消息拒绝
String message = "DeadMessage";
// channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8)); // 消息拒绝
channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes(StandardCharsets.UTF_8));
```
改为
```java
for (int i = 0; i < 10; i++) { // 队列最大长度测试
    // String message = "DeadMessage"; // new
    String message = "DeadMessage"+i; // 队列最大长度测试
    channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes(StandardCharsets.UTF_8));
} // 队列最大长度测试
```
* 在`DeadConsumer.java`中也进行调整
```java
//        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { // 队列最大长度测试
});
```
* 首先重启Docker中的RabbitMQ以清除队列消息数据，启动`DeadConsumer.java`后**中断**，再启动`DeadProducer.java`，
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525224908.png)
* 几秒后
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525224943.png)

#### 死信消费者
* 运行`DeadConsumer1.java`，便将先前死信队列`DeadQueue`积攒的消息全部消费掉了
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240525225457.png)

## Rabbit集成Springboot

### Spring AMQP
Spring AMQP 是对 Spring 基于 AMQP 的消息收发解决方案，不依赖于特定的 AMQP Broker 实现和客户端的抽象。

提供模板化的发送和接收消息的抽象层，提供基于消息驱动的 POJO。

### Spring AMQP核心组件
ConnectionFactory：Spring AMQP 的连接工厂接口，用于创建连接。

RabbitAdmin：AmqpAdmin 的实现，封装了对 RabbitMQ 的基础管理操作。

Message：Spring AMQP 对消息的封装。

RabbitTemplate：AmqpTemplate 的一个实现，用来简化消息的收发。

Messager Listener：Spring AMQP 异步消息投递的监听器接口，用于处理消息队列推送来的消息。

### Spring AMQP快速入门
1. [Spring Initializr](https://start.spring.io/)
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240526180410.png)
2. SpringBoot配置文件添加RabbitMQ配置
  * 删除默认生成的`RabbitMQ/_02_SpringBootRabbitMQ/src/main/resources/application.propertiesc`，创建`RabbitMQ/_02_SpringBootRabbitMQ/src/main/resources/application.yml`
```yml
spring:
rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
    virtual-host: /
    listener:
    simple:
        acknowledge-mode: manual # manual代表手动Ack
```
3. 配置RabbitMQ(这里使用RabbitAdmin 声明交换机、队列和绑定)
4. 创建消费者
5. 消息生产者

### Run `RabbitMQ/_02_SpringBootRabbitMQ/src/test/java/com/example/ApplicationTests.java`

#### `rabbitTemplate.convertAndSend()`
```java
@Test
	void contextLoads() {
		MessageProperties messageProperties = new MessageProperties();
		messageProperties.getHeaders().put("name","zhangsan");
		messageProperties.getHeaders().put("age","18");
		String mess = "hello world";
		Message message = new Message(mess.getBytes(),messageProperties);// import org.springframework.amqp.core.Message;
    rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message); // 路由#随便写
	}
```
```bash
hello world
2024-05-26T20:10:24.999+08:00  INFO 8588 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Waiting for workers to finish.
(Body:'[B@73cbabfd(byte[11])' MessageProperties [headers={name=zhangsan, age=18}, contentType=application/octet-stream, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=spring_topic_exchange, receivedRoutingKey=aaa.bbb, deliveryTag=1, consumerTag=amq.ctag-2_pol4zFd4Ky75D4GFjXtA, consumerQueue=topic_queue])
2024-05-26T20:10:25.011+08:00  INFO 8588 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Successfully waited for workers to finish.
```

#### `rabbitTemplate.convertAndSend()`带`messagePostProcessor`参数
```java
@Test
	void contextLoads() {
		// ...
//		rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message);
		rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message, message1 -> {
			message1.getMessageProperties().getHeaders().put("test","test1");
			message1.getMessageProperties().setExpiration("10000");
			return message1;
		});
	}
```
```bash
hello world
(Body:'[B@f0026bd(byte[11])' MessageProperties [headers={test=test1, name=zhangsan, age=18}, contentType=application/octet-stream, contentLength=0, receivedDeliveryMode=PERSISTENT, expiration=10000, priority=0, redelivered=false, receivedExchange=spring_topic_exchange, receivedRoutingKey=aaa.bbb, deliveryTag=1, consumerTag=amq.ctag-zTYJ3VipjbGdlqIUEpsoLw, consumerQueue=topic_queue])
2024-05-26T20:15:21.600+08:00  INFO 17064 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Waiting for workers to finish.
2024-05-26T20:15:21.610+08:00  INFO 17064 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Successfully waited for workers to finish.
```

#### `rabbitTemplate.send()`
```java
@Test
void contextLoads() {
    // ...
//		rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message, message1 -> {
//			message1.getMessageProperties().getHeaders().put("test","test1");
//			message1.getMessageProperties().setExpiration("10000");
//			return message1;
//		});
  rabbitTemplate.send(EXCHANGE_NAME,"aaa.bbb",message);
}
```
```bash
hello world
2024-05-26T20:18:33.702+08:00  INFO 2832 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Waiting for workers to finish.
(Body:'[B@4dabccd(byte[11])' MessageProperties [headers={name=zhangsan, age=18}, contentType=application/octet-stream, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=spring_topic_exchange, receivedRoutingKey=aaa.bbb, deliveryTag=1, consumerTag=amq.ctag-JPfcql0V0vLpo523rM8_1Q, consumerQueue=topic_queue])
2024-05-26T20:18:33.714+08:00  INFO 2832 --- [_02_SpringBootRabbitMQ] [ntContainer#0-2] o.s.a.r.l.SimpleMessageListenerContainer : Successfully waited for workers to finish.
```