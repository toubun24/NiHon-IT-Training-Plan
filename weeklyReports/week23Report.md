# Week 23 Report

## 学习内容及时长

* **2023.05.20 月曜日:** 
  * RabbitMQ-简单队列模式 23:25-00:35

* **2023.05.21 火曜日:** 

* **2023.05.22 水曜日:** 
  * RabbitMQ-工作队列模式 22:45-23:45

* **2023.05.23 木曜日:** 
  * RabbitMQ-发布订阅模式 21:45-22:23

* **2023.05.24 金曜日:** 
  * RabbitMQ-路由模式 21:00-21:47
  * RabbitMQ-主题模式 21:47-
  * RabbitMQ-持久化 
  * RabbitMQ-消息拒绝 
  * RabbitMQ-死信队列 
  * RabbitMQ-集成SpringBoot 

* **2023.05.25 土曜日:** 

* **2023.05.26 日曜日:** 

## 学习笔记

## 拓展内容

## 遇见问题

### 23.1【已解决】RabbitMQ 简单队列模式 Spring IDEA 导入Maven依赖失败`Connection refused: connect`
```bash
Connection refused: connect

Try to run Maven import with -U flag (force update snapshots)
```
* 在Docker中启动`sonatype/nexus3`后报错更新
```bash
org.slf4j:slf4j-log4j12:pom:1.7.5 failed to transfer from http://localhost:8081/repository/maven-public/ during a previous attempt. This failure was cached in the local repository and resolution is not reattempted until the update interval of maven-public has elapsed or updates are forced. Original error: Could not transfer artifact org.slf4j:slf4j-log4j12:pom:1.7.5 from/to maven-public (http://localhost:8081/repository/maven-public/): transfer failed for http://localhost:8081/repository/maven-public/org/slf4j/slf4j-log4j12/1.7.5/slf4j-log4j12-1.7.5.pom

Try to run Maven import with -U flag (force update snapshots)
```
* 尝试在`http://localhost:8081/`中进入登录状态后，报错依旧
* 点击报错信息中的`Try to run Maven import with -U flag (force update snapshots)`后，强制进入下载状态，随后依赖成功加载

### 23.2【已解决】RabbitMQ 简单队列模式 `Run 'HelloProducer.main()'`命令失败报错`Connection refused: no further information`, `No appenders found for logger`, `Please configure log4j properly`
```bash
Exception in thread "main" java.net.ConnectException: Connection refused: no further information
	at java.base/sun.nio.ch.Net.pollConnect(Native Method)
	at java.base/sun.nio.ch.Net.pollConnectNow(Net.java:672)
	at java.base/sun.nio.ch.NioSocketImpl.timedFinishConnect(NioSocketImpl.java:542)
	at java.base/sun.nio.ch.NioSocketImpl.connect(NioSocketImpl.java:597)
	at java.base/java.net.SocksSocketImpl.connect(SocksSocketImpl.java:327)
	at java.base/java.net.Socket.connect(Socket.java:633)
	at com.rabbitmq.client.impl.SocketFrameHandlerFactory.create(SocketFrameHandlerFactory.java:59)
	at com.rabbitmq.client.impl.recovery.RecoveryAwareAMQConnectionFactory.newConnection(RecoveryAwareAMQConnectionFactory.java:63)
	at com.rabbitmq.client.impl.recovery.AutorecoveringConnection.init(AutorecoveringConnection.java:160)
	at com.rabbitmq.client.ConnectionFactory.newConnection(ConnectionFactory.java:1216)
	at com.rabbitmq.client.ConnectionFactory.newConnection(ConnectionFactory.java:1173)
	at com.rabbitmq.client.ConnectionFactory.newConnection(ConnectionFactory.java:1131)
	at com.rabbitmq.client.ConnectionFactory.newConnection(ConnectionFactory.java:1294)
	at HelloWorld.HelloProducer.main(HelloProducer.java:23)
```
* 在Docker中启动`rabbitmq:3.13.2-management`后以`guest`身份登入`http://localhost:15672/#/`，重新运行后报错变化
```bash
log4j:WARN No appenders could be found for logger (com.rabbitmq.client.impl.ConsumerWorkService).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
```
参考该报错给出的[链接](http://logging.apache.org/log4j/1.2/faq.html#noconfig)，注意到文档对应项内容
```bash
Why do I see a warning about "No appenders found for logger" and "Please configure log4j properly"?
This occurs when the default configuration files log4j.properties and log4j.xml can not be found and the application performs no explicit configuration. log4j uses Thread.getContextClassLoader().getResource() to locate the default configuration files and does not directly check the file system. Knowing the appropriate location to place log4j.properties or log4j.xml requires understanding the search strategy of the class loader in use. log4j does not provide a default configuration since output to the console or to the file system may be prohibited in some environments. Also see FAQ: Why can't log4j find my properties in a J2EE or WAR application?.
```
* 参考[stackoverflow](https://stackoverflow.com/questions/12532339/no-appenders-could-be-found-for-loggerlog4j)，在`HelloProducer.main()`中引入
```java
BasicConfigurator.configure();
```
随后重新运行，控制台得到期望输出
```bash
"D:\Amazon Corretto\jdk17.0.7_7\bin\java.exe" "-javaagent:D:\IntelliJ IDEA Community Edition 2023.1.2\lib\idea_rt.jar=64442:D:\IntelliJ IDEA Community Edition 2023.1.2\bin" -Dfile.encoding=UTF-8 -classpath G:\NiHon-IT-Training-Plan\RabbitMQ\SpringRabbitMQ\target\classes;C:\Users\Toubun\.m2\repository\com\rabbitmq\amqp-client\5.16.0\amqp-client-5.16.0.jar;C:\Users\Toubun\.m2\repository\org\slf4j\slf4j-api\1.7.36\slf4j-api-1.7.36.jar;C:\Users\Toubun\.m2\repository\org\slf4j\slf4j-log4j12\1.7.5\slf4j-log4j12-1.7.5.jar;C:\Users\Toubun\.m2\repository\log4j\log4j\1.2.17\log4j-1.2.17.jar HelloWorld.HelloProducer
0 [main] DEBUG com.rabbitmq.client.impl.ConsumerWorkService  - Creating executor service with 12 thread(s) for consumer work service
```
且`http://localhost:15672/#/queues`中显示相应队列
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240521001637.png)

### 23.3【已解决】RabbitMQ 工作队列模式 直接启动上一部分已完成的IDEA内容时失败报错`NoClassDefFoundError`
```bash
Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/log4j/BasicConfigurator
	at HelloWorld.HelloProducer.main(HelloProducer.java:16)
Caused by: java.lang.ClassNotFoundException: org.apache.log4j.BasicConfigurator
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:641)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:520)
	... 1 more
```
* 先尝试在Docker中开启rabbitmq和nexus并分别进行登录
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240522225320.png)
*但是依然报错，且很多导入的依赖项都爆红，重启IDEA后恢复正常

### 23.4【已解决】RabbitMQ 工作队列模式 `WorkConsumer.java`启动失败报错 `NOT_FOUND - no queue 'WorkQueue' in vhost '/'`
```bash
"D:\Amazon Corretto\jdk17.0.7_7\bin\java.exe" "-javaagent:D:\IntelliJ IDEA Community Edition 2023.1.2\lib\idea_rt.jar=57938:D:\IntelliJ IDEA Community Edition 2023.1.2\bin" -Dfile.encoding=UTF-8 -classpath G:\NiHon-IT-Training-Plan\RabbitMQ\SpringRabbitMQ\target\classes;C:\Users\Toubun\.m2\repository\com\rabbitmq\amqp-client\5.16.0\amqp-client-5.16.0.jar;C:\Users\Toubun\.m2\repository\org\slf4j\slf4j-api\1.7.36\slf4j-api-1.7.36.jar;C:\Users\Toubun\.m2\repository\org\slf4j\slf4j-log4j12\1.7.5\slf4j-log4j12-1.7.5.jar;C:\Users\Toubun\.m2\repository\log4j\log4j\1.2.17\log4j-1.2.17.jar WorkQueue.WorkConsumer
0 [main] DEBUG com.rabbitmq.client.impl.ConsumerWorkService  - Creating executor service with 12 thread(s) for consumer work service
Exception in thread "main" java.io.IOException
	at com.rabbitmq.client.impl.AMQChannel.wrap(AMQChannel.java:129)
	at com.rabbitmq.client.impl.AMQChannel.wrap(AMQChannel.java:125)
	at com.rabbitmq.client.impl.ChannelN.basicConsume(ChannelN.java:1384)
	at com.rabbitmq.client.impl.recovery.AutorecoveringChannel.basicConsume(AutorecoveringChannel.java:543)
	at com.rabbitmq.client.impl.recovery.AutorecoveringChannel.basicConsume(AutorecoveringChannel.java:497)
	at com.rabbitmq.client.impl.recovery.AutorecoveringChannel.basicConsume(AutorecoveringChannel.java:480)
	at WorkQueue.WorkConsumer.main(WorkConsumer.java:38)
Caused by: com.rabbitmq.client.ShutdownSignalException: channel error; protocol method: #method<channel.close>(reply-code=404, reply-text=NOT_FOUND - no queue 'WorkQueue' in vhost '/', class-id=60, method-id=20)
	at com.rabbitmq.utility.ValueOrException.getValue(ValueOrException.java:66)
	at com.rabbitmq.utility.BlockingValueOrException.uninterruptibleGetValue(BlockingValueOrException.java:36)
	at com.rabbitmq.client.impl.AMQChannel$BlockingRpcContinuation.getReply(AMQChannel.java:502)
	at com.rabbitmq.client.impl.ChannelN.basicConsume(ChannelN.java:1378)
	... 4 more
Caused by: com.rabbitmq.client.ShutdownSignalException: channel error; protocol method: #method<channel.close>(reply-code=404, reply-text=NOT_FOUND - no queue 'WorkQueue' in vhost '/', class-id=60, method-id=20)
	at com.rabbitmq.client.impl.ChannelN.asyncShutdown(ChannelN.java:517)
	at com.rabbitmq.client.impl.ChannelN.processAsync(ChannelN.java:341)
	at com.rabbitmq.client.impl.AMQChannel.handleCompleteInboundCommand(AMQChannel.java:182)
	at com.rabbitmq.client.impl.AMQChannel.handleFrame(AMQChannel.java:114)
	at com.rabbitmq.client.impl.AMQConnection.readFrame(AMQConnection.java:739)
	at com.rabbitmq.client.impl.AMQConnection.access$300(AMQConnection.java:47)
	at com.rabbitmq.client.impl.AMQConnection$MainLoop.run(AMQConnection.java:666)
	at java.base/java.lang.Thread.run(Thread.java:833)
```
* 参考文心一言
  * 确认队列存在：确保在RabbitMQ服务器上有一个名为'WorkQueue'的队列。你可以使用RabbitMQ的管理界面（如果已安装并配置）来查看所有队列，或者通过命令行工具（如rabbitmqctl）来检查。
  * 创建队列：如果队列不存在，你需要创建一个。这通常在你的生产者（Producer）代码中完成，当第一次尝试向该队列发送消息时。但是，你也可以手动在RabbitMQ管理界面上创建队列，或者使用命令行工具。
* 上述失败时是在没有启动`WorkProducer.java`的情况下先启动了`WorkConsumer.java`，所以先运行一次`WorkProducer.java`，在RabbitMQ中创建出WorkQueue队列后再运行消费者即可正常实现
![](https://github.com/toubun24/NiHon-IT-Training-Plan/blob/main/imgStorage/QQ20240522232613.png)

### 23.5【已解决】RabbitMQ 路由模式 原本正确绑定的路由修改消费者路由名称并解绑原先正确绑定的路由后依然能成功收到消息
```java
// channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange");
channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orang");
```
* RabbitMQ中`Unbind`解绑正确路由，终止并重启终端中正运行代码，重启IDEA，重登RabbitMQ，将路由名称换做`aaa`等依然能收到消息
* 最后在Docker中重启RabbitMQ后恢复正常，不再能收到消息