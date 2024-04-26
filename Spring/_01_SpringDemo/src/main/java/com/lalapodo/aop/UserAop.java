package com.lalapodo.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

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
    private void pointcut(){ // 切入点 // pointcut: 切入点表达式别名，便于复用

    }

    @Before("pointcut()") // 在getUser之前 // () // 直接使用切入点表达式别名(方法名) // value=
    // public void insertUser(){
    public void insertUser(JoinPoint joinPoint){ // joinPoint获取参数
        System.out.println("--Before--");
        System.out.println(Arrays.toString(joinPoint.getArgs())); // [3]
        System.out.println(joinPoint.getTarget()); // .sout // com.lalapodo.Service.Impl.UserServiceImpl@655ef322
        System.out.println(joinPoint.getClass()); // class org.springframework.aop.aspectj.MethodInvocationProceedingJoinPoint
        System.out.println("--Before--"); // insertUser
    }

    @AfterReturning(value = "pointcut()",returning = "res") // returning
    public void afterReturningUser(JoinPoint joinPoint, Object res){ // res
        System.out.println("--AfterReturning--");
        System.out.println(Arrays.toString(joinPoint.getArgs()));
        System.out.println(joinPoint.getTarget());
        System.out.println(joinPoint.getClass());
        System.out.println(res); // null // 没有返回值
        System.out.println("--AfterReturning--");
    }

    @Around("pointcut()")
    public void aroundUser(ProceedingJoinPoint proceedingJoinPoint) throws Throwable { // ProceedingJoinPoint
        System.out.println("--Around--");
        proceedingJoinPoint.proceed(); // throws Throwable // 目标方法执行
        System.out.println("--Around--");
    }

    @AfterThrowing(value = "pointcut()",throwing = "exp")
    public void afterThrowingUser(Exception exp) {
        System.out.println("--AfterThrowing--");
        System.out.println(exp); // System.out.println(1/0); in UserServiceImpl
        System.out.println("--AfterThrowing--");
    }
//--Around--
//--Before--
//[3]
//com.lalapodo.Service.Impl.UserServiceImpl@3fb6cf60
//class org.springframework.aop.aspectj.MethodInvocationProceedingJoinPoint
//--Before--
//--AfterThrowing--
//java.lang.ArithmeticException: / by zero
//--AfterThrowing--
//--After--
//com.lalapodo.Service.Impl.UserServiceImpl@3fb6cf60
//--After--

    @After("pointcut()")
    public void afterUser(JoinPoint joinPoint) {
        System.out.println("--After--");
        System.out.println(Arrays.toString(joinPoint.getArgs()));
        System.out.println("--After--");
    }
}
//<aop:config proxy-target-class="true">
//  <aop:pointcut id="pointcut" expression="execution(* com.lalapodo.Service.UserService.*(..))"/>
//  <aop:aspect ref="UserAop">
//      <aop:before method="insertUser" pointcut-ref="pointcut"/>
//  </aop:aspect>
//</aop:config>

//--Around--
//--Before--
//[3]
//com.lalapodo.Service.Impl.UserServiceImpl@3fb6cf60
//class org.springframework.aop.aspectj.MethodInvocationProceedingJoinPoint
//--Before--
//getUser
//--AfterReturning--
//[3]
//com.lalapodo.Service.Impl.UserServiceImpl@3fb6cf60
//class org.springframework.aop.aspectj.MethodInvocationProceedingJoinPoint
//null
//--AfterReturning--
//--After--
//[3]
//--After--
//--Around--