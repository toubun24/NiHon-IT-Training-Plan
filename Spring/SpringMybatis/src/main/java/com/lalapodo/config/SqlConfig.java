package com.lalapodo.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class SqlConfig {
    @Value("com.mysql.cj.jdbc.Driver")
    private String driver;
    // @Value("jdbc:mysql://localhost:3306/lalapodo")
    @Value("jdbc:mysql://localhost:3306/mydatabase") // 名称不同
    private String url;
    @Value("root")
    private String username;
    @Value("12345678")
    private String password;

    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
