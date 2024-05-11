package com.lalapodo.Dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestTable3 implements Serializable { // implements Serializable: 二级缓存实现序列化接口
    private Long id;
    private String name;
    private String age;
    // private TestTable2 test2;
    private Long gid;
}