package com.example.mapper;

import com.example.dao.TestTable;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // 标记数据访问层的组件的注解,它会被spring扫描并注入到ioc容器中
@Mapper // 如果已经在 Spring 配置中通过 @MapperScan 注解指定了包含 Mapper 接口的包路径，那么这个 @Mapper 注解就是可选的。
public interface TestMapper {
    List<TestTable> getAll();
}
