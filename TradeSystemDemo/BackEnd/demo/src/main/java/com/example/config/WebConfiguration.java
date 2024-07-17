package com.example.config;

//import com.example.Interceptor.MyInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.pattern.PathPatternParser;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@EnableWebMvc // JSON数据处理和响应
public class WebConfiguration implements WebMvcConfigurer {
    /*中文支持*/
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.stream()
                .filter(converter -> converter instanceof StringHttpMessageConverter)
                .forEach(converter -> ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8));
    }

    /*PathPattern配置开启*/
//    @Override
//    public void configurePathMatch(PathMatchConfigurer configurer) {
//        configurer.setPatternParser(new PathPatternParser());
//    }

    /*SpringMVC拦截器: Generate-addInterceptors*/
//    @Autowired
//    MyInterceptor myInterceptor;
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        // WebMvcConfigurer.super.addInterceptors(registry);
//        registry.addInterceptor(myInterceptor).addPathPatterns("/","/**");
//        // registry.addInterceptor(myInterceptor).addPathPatterns("/","/*"); // 多个，preHandle从上往下执行，postHandle和afterCompletion从下往上执行
//        // ...
//    }
}
//preHandle
//444
//User(id=444, name=wsx22, password=qwe22)
//postHandle
//afterCompletion
