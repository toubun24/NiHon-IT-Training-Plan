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


# 启动RabbitMQ与验证


# 123



```

```bash

```

```bash

```

```bash

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

```bash

```

```bash

```

```bash

```

```bash

```















