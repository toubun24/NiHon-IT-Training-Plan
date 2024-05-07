package com.lalapodo.mapper;

import com.lalapodo.Dao.TestTable3;

import java.util.List;

public interface TestMapper2 {
    List<TestTable3> ifResult(TestTable3 testTable3);

    List<TestTable3> ifResult2(TestTable3 testTable3);

    boolean updateResult(TestTable3 testTable3);
}
