package com.example.service;

import com.example.dao.Users;
import com.example.dao.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements UsersService{
    @Autowired
    private UsersRepository usersRepository; // 注入

    @Override
    public Users getUsersById(long id) {
        return usersRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
