package com.example.demo.Factory;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.env.PropertiesPropertySource; // PropertiesPropertySource
import org.springframework.core.env.PropertySource; // PropertySource
import org.springframework.core.io.support.DefaultPropertySourceFactory;
import org.springframework.core.io.support.EncodedResource;

import java.io.IOException;
import java.util.Properties;

/*使用环境对象Environment,默认获取application配置文件的内容，如需要加载.yml文件，就需要继承DefaultPropertySourceFactory类并修改*/
public class YamlConfig extends DefaultPropertySourceFactory {
    @Override
    public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
        String sourceName = name != null ? name : resource.getResource().getFilename();
        if (!resource.getResource().exists()) {
            assert sourceName != null;
            return new PropertiesPropertySource(sourceName, new Properties());
        } else {
            assert sourceName != null;
            if (sourceName.endsWith(".yml") || sourceName.endsWith(".yaml")) {
                Properties propertiesFromYaml = loadYml(resource);
                return new PropertiesPropertySource(sourceName, propertiesFromYaml);
            } else {
                return super.createPropertySource(name, resource);
            }
        }
    }

    private Properties loadYml(EncodedResource resource) {
        YamlPropertiesFactoryBean factory = new YamlPropertiesFactoryBean();
        factory.setResources(resource.getResource());
        factory.afterPropertiesSet();
        return factory.getObject();
    }
}
