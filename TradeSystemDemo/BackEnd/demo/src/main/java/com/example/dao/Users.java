package com.example.dao;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity // 映射数据库表的对象
@Table(name="users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    public Integer getState_id() {
        return state_id;
    }

    public void setState_id(Integer state_id) {
        this.state_id = state_id;
    }

    @Column(nullable = false)
    private Integer state_id;

    @Column(nullable = false)
    private String password;

//    // 对于数组或列表类型，可以使用JSON字符串存储，并在应用中进行序列化和反序列化
//    @Column
//    private String starList;  // 假设以JSON字符串形式存储这个列表
//
//    @Column
//    private String location;
//
//    @Column
//    private String followList;
//
//    @Column// (nullable = false)//, defaultValue = "0")
//    private Integer auditNum;
//
//    @Column// (nullable = false)//, defaultValue = "0.00")
//    private BigDecimal balance;
//
//    @Column
//    private Long registerTime;
//
//    @Column
//    private String avatar;
//
//    @Column
//    private String followerList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
