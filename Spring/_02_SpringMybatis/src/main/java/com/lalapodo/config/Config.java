package com.lalapodo.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
@Configuration
@ComponentScan("com.lalapodo")
@EnableTransactionManagement // 事务配置
public class Config {

}
