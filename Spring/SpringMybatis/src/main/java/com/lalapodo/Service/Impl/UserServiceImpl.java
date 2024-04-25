package com.lalapodo.Service.Impl;

import com.lalapodo.Bean.TestTable;
import com.lalapodo.Mapper.TestMapper;
import com.lalapodo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // new

import java.util.List;

@Service // new
public class UserServiceImpl implements UserService {

    @Autowired
    TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }
}
