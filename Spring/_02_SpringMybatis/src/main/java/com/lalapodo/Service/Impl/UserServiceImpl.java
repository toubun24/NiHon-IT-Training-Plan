package com.lalapodo.Service.Impl;

import com.lalapodo.Bean.TestTable;
import com.lalapodo.Mapper.TestMapper;
import com.lalapodo.Service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // new
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service // new // 注册到IOC容器
public class UserServiceImpl implements UserService {

    @Autowired
    TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }

    // 事务
    @Override
    // @Transactional // 开启事务注解后，两个table都不发生变化
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE, timeout=-1)
    // PROPAGATION_REQUIRES_NEW -- 新建事务，如果当前存在事务，把当前事务挂起
    // SERIALIZABLE -- 这是花费最高代价但是最可靠的事务隔离级别，事务被处理为顺序执行。除了防止脏读、不可重复读外，还避免了幻像读
    // timeout: 该属性用于设置事务的超时秒数，默认值为-1表示永不超时
    public void insertUser(String name, String age) {
        testMapper.insertUser(name,age);
        // System.out.println(1/0); // java.lang.ArithmeticException: / by zero // test_table新增数据而下一语句未被执行，test2_table未发生变化
        testMapper.insertUser2(name,age);
    }

    @Override
    public void insertUser2(String name, String age) {
        // no
    }
}
