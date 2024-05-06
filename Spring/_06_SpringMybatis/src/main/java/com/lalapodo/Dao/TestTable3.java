package com.lalapodo.Dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestTable3 {
    private Long id;
    private String name;
    private String age;
    // private TestTable2 test2;
    private Long gid;
}