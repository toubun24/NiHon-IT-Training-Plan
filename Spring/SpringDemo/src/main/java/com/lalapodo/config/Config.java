package com.lalapodo.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration // 配置类
@ComponentScan("com.lalapodo") // 扫描com.lalapodo包下的所有相关注解
@EnableAspectJAutoProxy // 开启AspectJ
public class Config { // AOP注解方式

}
