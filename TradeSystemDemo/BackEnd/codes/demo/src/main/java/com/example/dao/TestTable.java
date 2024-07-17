package com.example.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestTable {
    private Long id;
    private String username;
    private Integer state_id;
    private String password;
}