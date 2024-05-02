package com.example.demo.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

@Configuration
public class SpringTaskConfig implements SchedulingConfigurer {
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        //设置线程池大小 默认为1
        threadPoolTaskScheduler.setPoolSize(10);
        //设置线程名称前缀
        threadPoolTaskScheduler.setThreadNamePrefix("aaa-");
        //设置线程池关闭时是否等待任务完成
        threadPoolTaskScheduler.setWaitForTasksToCompleteOnShutdown(true);
        //设置线程池关闭前最大等待时间
        threadPoolTaskScheduler.setAwaitTerminationSeconds(60);
        //初始化
        threadPoolTaskScheduler.initialize();
        taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }
}