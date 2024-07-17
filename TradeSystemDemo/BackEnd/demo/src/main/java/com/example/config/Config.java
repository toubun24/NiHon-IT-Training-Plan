package com.example.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.example")
// @MapperScan("com.example.mapper") // 扫描Mapper接口
public class Config {
}
