# Week 23 Report

## 学习内容及时长

* **2023.05.20 月曜日:** 
  * RabbitMQ-简单队列模式 23:25-00:35
  * RabbitMQ-工作队列模式 
  * RabbitMQ-发布订阅模式 
  * RabbitMQ-路由模式 
  * RabbitMQ-主题模式 
  * RabbitMQ-持久化 
  * RabbitMQ-消息拒绝 
  * RabbitMQ-死信队列 
  * RabbitMQ-集成SpringBoot 

* **2023.05.21 火曜日:** 

* **2023.05.22 水曜日:** 

* **2023.05.23 木曜日:** 

* **2023.05.24 金曜日:** 

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



