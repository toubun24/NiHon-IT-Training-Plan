package com.lalapodo.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // @ToString, @EqualsAndHashCode, @Getter / @Setter and @RequiredArgsConstructor
@AllArgsConstructor // 自动添加全属性构造方法，顺序按照属性的定义顺序
@NoArgsConstructor // 自动添加无参构造方法 // 没有会报错
public class User {
    private Long id;
    private String name;
    private String password;
}
