package com.lalapodo.controller;

import com.lalapodo.Bean.User;
import org.springframework.web.bind.annotation.*;

@RestController // =@Controller+@ResponseBody
@RequestMapping("/user")
public class UserController {
    @GetMapping // 查询
    public String getUser(){
        return "获取所有User信息";
    }
    @PostMapping // 添加
    public String insertUser(@RequestBody User user){
        System.out.println(user);
        return "新增用户数据";
    }
    @PutMapping("/{userId}") // 更新
    public String updateUser(@PathVariable("userId") Long userId, @RequestBody User user){
        System.out.println(userId);
        System.out.println(user);
        return "更新用户数据";
    }
    @DeleteMapping("/{userId}") // 删除
    public String deleteUser(@PathVariable("userId") Long userId){
        System.out.println(userId);
        return "删除用户数据";
    }
}
