package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class SpringDataRedisApplicationTests {

	@Autowired
	private RedisTemplate<Object,Object> redisTemplate;

	@Test
	public void contextLoads(){
		redisTemplate.opsForValue().set("name","zhangsan");
		System.out.println(redisTemplate.opsForValue().get("name")); // zhangsan
	}

	@Test
	public void contextLoads2(){
		redisTemplate.opsForList().leftPushAll("nameList","zhangsan","lisi","wangwu");
		System.out.println(redisTemplate.opsForList().range("nameList",0,-1)); // [wangwu, lisi, zhangsan]
	}

}
