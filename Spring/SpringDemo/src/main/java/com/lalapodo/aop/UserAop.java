package com.lalapodo.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before; // 注意是来自aspectj的
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/*AOPXML方式*/
//public class UserAop { // 切面类
//    public void insertUser(){
//        System.out.println("insertUser");
//    }
//}

/*AOP注解方式*/
@Aspect
@Component // 纳入IOC容器管理范围
public class UserAop { // 切面类
    @Pointcut("execution(* com.lalapodo.Service.UserService.*(..))") // 切入点表达式<aop:pointcut id="pointcut" expression="execution(* com.lalapodo.Service.UserService.*(..))"/>
    private void pointcut(){ // 切入点

    }

    @Before("pointcut()") // 在getUser之前 // ()
    public void insertUser(){
        System.out.println("insertUser");
    }
}
//<aop:config proxy-target-class="true">
//  <aop:pointcut id="pointcut" expression="execution(* com.lalapodo.Service.UserService.*(..))"/>
//  <aop:aspect ref="UserAop">
//      <aop:before method="insertUser" pointcut-ref="pointcut"/>
//  </aop:aspect>
//</aop:config>