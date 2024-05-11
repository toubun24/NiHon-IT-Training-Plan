package com.lalapodo.mapper;

import com.lalapodo.Dao.TestTable3;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TestMapper2 {
    List<TestTable3> ifResult(TestTable3 testTable3);

    List<TestTable3> ifResult2(TestTable3 testTable3);

    boolean updateResult(TestTable3 testTable3);

    List<TestTable3> ifResult3(TestTable3 testTable3);

    boolean deleteResult(@Param("ids") Long[] longs);

    List<TestTable3> ifResult4(TestTable3 testTable3);
}
