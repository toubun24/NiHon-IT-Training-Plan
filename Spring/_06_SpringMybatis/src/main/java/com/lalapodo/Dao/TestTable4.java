package com.lalapodo.Dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestTable4 {
    private Long id;
    private String uGroup;
    // private Long uid;
    private List<TestTable3> test1;
}
