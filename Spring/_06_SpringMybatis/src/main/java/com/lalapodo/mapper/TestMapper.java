package com.lalapodo.mapper;

import com.lalapodo.Dao.TestTable;
import com.lalapodo.Dao.TestTable3;
import com.lalapodo.Dao.TestTable4;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TestMapper {
    List<TestTable> getAll();

    TestTable getOne(Long id);

    TestTable getOne2Params(Long id, String name);

    TestTable getOne2Args(Long id, String name);

    TestTable getOne2Param(@Param("id") Long id, @Param("name") String name);

    boolean insertOne(TestTable testTable);

    TestTable getOneMap(Map<String, Object> map);

    List<TestTable> getAll2();

    List<TestTable> getAll3();

    List<TestTable4> getAll4();

    TestTable getOne2(Long id);

    boolean deleteMany(String id); // String

    boolean insertOne2(TestTable3 testTable3);
}
