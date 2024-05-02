package com.example.demo.Job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class TestJob extends QuartzJobBean {
    @Override // implement method
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        System.out.println(context.getJobDetail().getJobDataMap().getString("ddd")); // abc123 in Config/QuartzConfig
        System.out.println("TestJob执行了"); // TestJob执行了
    }
}
