package com.lalapodo.Service.Impl;

import com.lalapodo.Service.UserService;
import org.springframework.stereotype.Service;

/*AOPXML方式*/
//public class UserServiceImpl implements UserService {
//    @Override
//    public void getUser() { // 方法复写
//        System.out.println("getUser");
//    }
//}

/*AOP注解方式*/
@Service
public class UserServiceImpl implements UserService {
    @Override
    public void getUser() { // 方法复写
        System.out.println("getUser");
    }
}
