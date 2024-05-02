package com.example.demo.Config;

import com.example.demo.Job.TestJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @Configuration // 测试Spring Task时暂时关闭
public class QuartzConfig {
    @Bean
    public JobDetail jobDetail(){
        // return JobBuilder.newJob(TestJob.class).storeDurably().build();
        return JobBuilder.newJob(TestJob.class).usingJobData("ddd","abc123").storeDurably().build();
    }

    @Bean
    public Trigger trigger(){
        CronScheduleBuilder cronScheduleBuilder = CronScheduleBuilder.cronSchedule("* * * * * ?"); // Cron表达式定义任务执行频率
        return TriggerBuilder
                .newTrigger() // 触发器创建
                .forJob(jobDetail()) // 传递Job
                .withSchedule(cronScheduleBuilder) // 传递任务调度
                .build();
    }
}
