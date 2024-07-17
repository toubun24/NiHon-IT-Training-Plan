package com.example.controller;

import com.example.dao.Users;
import com.example.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/users/{id}")
    public Users getUsersById(@PathVariable long id){
        return usersService.getUsersById(id);
    }
}
