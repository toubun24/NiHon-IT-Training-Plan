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