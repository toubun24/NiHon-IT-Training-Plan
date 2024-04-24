package com.lalapodo.Service.Impl;

import com.lalapodo.Service.UserService;

public class UserServiceImpl implements UserService {
    @Override
    public void getUser() { // 方法复写
        System.out.println("getUser");
    }
}
