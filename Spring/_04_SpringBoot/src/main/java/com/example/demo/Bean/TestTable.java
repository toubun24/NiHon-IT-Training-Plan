package com.example.demo.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestTable { // MyBatis
    private Long id;
    private String name;
    private String age;
}
