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
  * SpringMybatis-trim与foreach标签 09:20-10:00
  * SpringMybatis-分页插件 
  * SpringMybatis-缓存 

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
```
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
```
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
```
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