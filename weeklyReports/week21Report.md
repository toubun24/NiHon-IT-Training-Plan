# Week 21 Report

## 学习内容及时长

* **2023.05.06 月曜日:** 
  * SpringMybatis-自定义结果映射 07:05-07:30
  * SpringMybatis-association标签 07:30-08:05
  * SpringMybatis-collection标签 16:55-17:33
  * SpringMybatis-SQL执行(上) 17:33-18:00

* **2023.05.07 火曜日:** 
  * SpringMybatis-SQL执行(下) 17:30-17:49
  * SpringMybatis-if与where标签 17:49-18:19
  * SpringMybatis-choose与set标签 18:19-18:38

* **2023.05.08 水曜日:** 

* **2023.05.09 木曜日:** 

* **2023.05.10 金曜日:** 

* **2023.05.11 土曜日:** 
  * SpringMybatis-trim与foreach标签 09:20-10:01
  * SpringMybatis-分页插件 10:01-11:25
  * SpringMybatis-缓存 19:00-19:20
  * Redis-介绍 19:20-19:30
  * Redis-安装 19:30-19:50 20:00-21:05 00:40-01:15
  * Redis-简单配置 01:15-01:30
  * Redis-Docker启动 
  * Redis-字符串数据类型 
  * Redis-列表数据类型 
  * Redis-集合Set 
  * Redis-有序集合ZSet 
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

* **2023.05.12 日曜日:** 

## 学习笔记


## 内容拓展

### Spring Mybatis 自定义结果映射 开启驼峰命名
在`Spring/_06_SpringMybatis/src/main/resources/mybatisConfig.xml`中
```xml
<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true" />
    </settings>
    ...
</configuration>
```

### 遇见问题

### 【已解决】Spring Mybatis 自定义结果映射 多对一映射关系 association标签 运行报错`There is no getter for property named 'test2' in 'class com.lalapodo.Dao.TestTable'`
```bash
org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'test2' in 'class com.lalapodo.Dao.TestTable'
### The error may exist in mappers/TestMapper.xml
### The error may involve com.lalapodo.mapper.TestMapper.getAll3
### The error occurred while handling results
### SQL: select *, t2.id t2id from test_table t left join test_table2 t2 on t2.uid = t.id where t.id = 1
### Cause: org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'test2' in 'class com.lalapodo.Dao.TestTable'

  ...
Caused by: org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'test2' in 'class com.lalapodo.Dao.TestTable'
  ...
```
* 回看课件发现是`private TestTable2 test2;`放错位置了，修正如下
```java
// Spring/_06_SpringMybatis/src/main/java/com/lalapodo/Dao/TestTable.java
public class TestTable {
    private Long id;
    private String name;
    private String age;
    private TestTable2 test2;
}
```
```java
// Spring/_06_SpringMybatis/src/main/java/com/lalapodo/Dao/TestTable2.java
public class TestTable2 {
    private Long id;
    private String uGroup; // u_group
    private Long uid; // int
    // private TestTable2 tt2;
}
```
* 随后报错变为
```bash
java: no suitable constructor found for TestTable(<nulltype>,java.lang.String,java.lang.String)
    constructor com.lalapodo.Dao.TestTable.TestTable(java.lang.Long,java.lang.String,java.lang.String,com.lalapodo.Dao.TestTable2) is not applicable
      (actual and formal argument lists differ in length)
    constructor com.lalapodo.Dao.TestTable.TestTable() is not applicable
      (actual and formal argument lists differ in length)
```
* 注意爆红位置为
```java
// Spring/_06_SpringMybatis/src/test/java/SqlTest.java
/*获取实体类类型*/
@Test
public void testsql6() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
    TestMapper mapper = sqlSession.getMapper(TestMapper.class);
    boolean b = mapper.insertOne(new TestTable(null, "insertOne", "12321")); // 爆红
    System.out.println(b); // true
    sqlSession.close();
}
```
* 注释掉这段后成功运行

### 【已解决】Spring Mybatis 自定义结果映射 一对多映射关系 collection标签 运行报错 `java.lang.IllegalArgumentException: argument type mismatch`
```bash
org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: org.apache.ibatis.reflection.ReflectionException: Could not set property 'test1' of 'class com.lalapodo.Dao.TestTable4' with value 'TestTable3(id=1, name=zhangsan, age=18, gid=1)' Cause: java.lang.IllegalArgumentException: argument type mismatch
### The error may exist in mappers/TestMapper.xml
### The error may involve com.lalapodo.mapper.TestMapper.getAll4
### The error occurred while handling results
### SQL: select *, t3.id t3id from test_table4 t4 left join test_table3 t3 on t3.gid = t4.id where t4.id = 1
### Cause: org.apache.ibatis.reflection.ReflectionException: Could not set property 'test1' of 'class com.lalapodo.Dao.TestTable4' with value 'TestTable3(id=1, name=zhangsan, age=18, gid=1)' Cause: java.lang.IllegalArgumentException: argument type mismatch

  ...
Caused by: org.apache.ibatis.reflection.ReflectionException: Could not set property 'test1' of 'class com.lalapodo.Dao.TestTable4' with value 'TestTable3(id=1, name=zhangsan, age=18, gid=1)' Cause: java.lang.IllegalArgumentException: argument type mismatch
  ...
```
* 原因：`collection`标签使用了从`association`标签相关代码复制而来的`javaType`，但其实应该使用`ofType`
```xml
<resultMap id="customResult3" type="com.lalapodo.Dao.TestTable4">
    <id property="id" column="id"/>
    <result property="uGroup" column="u_group"/>
    <!--<collection property="test1" javaType="com.lalapodo.Dao.TestTable3">-->
    <collection property="test1" ofType="com.lalapodo.Dao.TestTable3">
        <id property="id" column="t3id"/>
        <result property="name" column="name"/>
        <result property="age" column="age"/>
        <result property="gid" column="gid"/>
    </collection>
</resultMap>
<select id="getAll4" resultMap="customResult3">
    select *, t3.id t3id from test_table4 t4 left join test_table3 t3 on t3.gid = t4.id where t4.id = 1
</select>
```

### 【已解决】Spring Mybatis 引入PageHelper包失败`Dependency 'com.github.pagehelper:pagehelper:6.1.0' not found`
```bash
com.github.pagehelper:pagehelper:pom:6.1.0 failed to transfer from http://localhost:8081/repository/maven-public/ during a previous attempt. This failure was cached in the local repository and resolution is not reattempted until the update interval of maven-public has elapsed or updates are forced. Original error: Could not transfer artifact com.github.pagehelper:pagehelper:pom:6.1.0 from/to maven-public (http://localhost:8081/repository/maven-public/): transfer failed for http://localhost:8081/repository/maven-public/com/github/pagehelper/pagehelper/6.1.0/pagehelper-6.1.0.pom

Try to run Maven import with -U flag (force update snapshots)
```
```bash
Dependency 'com.github.pagehelper:pagehelper:6.1.0' not found
```
* 注意到报错中提到的`http://localhost:8081/repository/maven-public/`，这是之前配置Maven远程Nexus仓库时用过的内容，在MyBatis板块照理来说是没用到的，但还是尝试在IDEA中打开项目从`Spring/_06_SpringMybatis`返回到了上一级完整的`Spring`文件夹，发现`_06_SpringMybatis`还没有被识别为Module，于是在Maven侧边栏中首先将其加入为module，随后报错依旧
* 成功启动Maven远程仓库nexus3后报错依旧
* 点击`Try to run Maven import with -U flag (force update snapshots)`后强制安装成功，报错消失


### 【已解决】Maven远程仓库 nexus3 CMD启动失败
```bash
docker run -d -p 8081:8081 --name nexus sonatype/nexus3
```
```bash
docker: Error response from daemon: Conflict. The container name "/nexus" is already in use by container "0211e0409935e82f19fe6642daf86f6e7b2bf5b244e37f582af0eccbf327dad6". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
* 首先参考`https://blog.csdn.net/libin9iOak/article/details/134322883`，使用命令`docker ps -a`来列出所有容器，包括非活动的，以检查现有容器
```bash
docker ps -a
```
```bash
CONTAINER ID   IMAGE             COMMAND                   CREATED        STATUS                     PORTS                    NAMES
0211e0409935   sonatype/nexus3   "/opt/sonatype/nexus…"   6 days ago     Up About a minute          0.0.0.0:8081->8081/tcp   nexus
c6471e03b8f8   mysql:latest      "docker-entrypoint.s…"   3 months ago   Exited (0) 9 minutes ago                            mysql-mysql-1
```
* 随后参考`docker run --name mycontainer myimage`尝试
```bash
docker run --name nexus nexus3
```
```bash
Unable to find image 'nexus3:latest' locally
docker: Error response from daemon: pull access denied for nexus3, repository does not exist or may require 'docker login': denied: requested access to the resource is denied.
See 'docker run --help'.
```
* 虽然还是报错，但有加载时间，且`http://localhost:8081/`成功进入界面

### 【已解决】Redis 配置 没有`Windows Subsystem for Linux (WSL)`选项
* 参考[官方文档](https://learn.microsoft.com/en-us/windows/wsl/install)
```bash
wsl --install
```
```bash
Installing: Ubuntu
Ubuntu has been installed.
Launching Ubuntu...
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username:
```

### 【已解决】Redis Debian 安装数字签名失败报错`gpg: command not found`, `curl: command not found`
```bash
toubun@DESKTOP-9MBCA87:~$ curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
"deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo: gpg: command not found
-bash: curl: command not found
toubun@DESKTOP-9MBCA87:~$ echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb bookworm main
```
* 参考文心一言，使用`apt`安装相应工具
```bash
sudo apt update
sudo apt install gpg curl
```

### 【基本解决】Redis Debian `systemctl status redis-server`查看当前Redis情况失败`System has not been booted with systemd as init system (PID 1). Can't operate. Failed to connect to bus: Host is down`
```bash
toubun@DESKTOP-9MBCA87:~$ systemctl status redis-server
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```
* 尝试[安装systemctl](https://blog.csdn.net/xiao_yi_xiao/article/details/120672705)
```bash
sudo apt install systemctl
```
* 随后报错变化
```bash
toubun@DESKTOP-9MBCA87:~$ systemctl status redis-server
redis-server.service - Advanced key-value store
    Loaded: loaded (/usr/lib/systemd/system/redis-server.service, disabled)
    Active: inactive (dead)
```
* 使用`systemctl enable`命令来启用Redis服务，以便在系统启动时自动运行
```bash
sudo systemctl enable redis-server.service
```
* 随后报错变化（此处起执行了`sudo su`）
```bash
root@DESKTOP-9MBCA87:/home/toubun# systemctl status redis-server
redis-server.service - Advanced key-value store
    Loaded: loaded (/usr/lib/systemd/system/redis-server.service, enabled)
    Active: failed (failed)
```
* 重启后报错变为
```bash
redis-server.service - Advanced key-value store
    Loaded: loaded (/usr/lib/systemd/system/redis-server.service, enabled)
    Active: inactive (dead)
```
* 测试端口连通性
```bash
redis-cli -h localhost -p 6379 ping
```
```bash
PONG
```
* 端口监听也正常
* 尝试直接运行并测试
```bash
root@DESKTOP-9MBCA87:/home/toubun# redis-cli
127.0.0.1:6379> SET mykey "Hello Redis!"
OK
127.0.0.1:6379> GET mykey
"Hello Redis!"
```
又可以正常执行，但即使在一边Debian运行中另一边新开窗口查看状态`systemctl status redis-server`也依然`Active: inactive (dead)`，只能暂时先不管了
* `exit`后状态变化为`inactive`
```bash
127.0.0.1:6379> exit
root@DESKTOP-9MBCA87:/home/toubun# systemctl status redis-server
redis-server.service - Advanced key-value store
    Loaded: loaded (/usr/lib/systemd/system/redis-server.service, enabled)
    Active: inactive (dead)
```
* 测试
```bash
root@DESKTOP-9MBCA87:/home/toubun# redis-server
```
```bash
54:C 12 May 2024 01:21:08.676 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
54:C 12 May 2024 01:21:08.676 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
54:C 12 May 2024 01:21:08.676 * Redis version=7.2.4, bits=64, commit=00000000, modified=0, pid=54, just started
54:C 12 May 2024 01:21:08.676 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
54:M 12 May 2024 01:21:08.676 * Increased maximum number of open files to 10032 (it was originally set to 1024).
54:M 12 May 2024 01:21:08.676 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 7.2.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 54
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

54:M 12 May 2024 01:21:08.676 # Warning: Could not create server TCP listening socket *:6379: bind: Address already in use
54:M 12 May 2024 01:21:08.676 # Failed listening on port 6379 (tcp), aborting.
```