import User.User;
import com.lalapodo.Service.Impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test { // IOC容器创建并存储User对象，再用applicationContext拿到相关对象
    @Test // Alt+Enter
    public void test1(){
        // BeanFactory applicationContext = new ClassPathXmlApplicationContext("application.xml"); // BeanFactory
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("application.xml"); // ApplicationContext
        // User user = (User) applicationContext.getBean("user");
        System.out.println("--user--");
        User user = applicationContext.getBean("user", User.class);
        user.getUser();
        System.out.println("--user1--");
        User user1 = applicationContext.getBean("user1", User.class);
        user1.getUser();
        System.out.println("--user2--");
        User user2 = applicationContext.getBean("user2", User.class);
        user2.getUser();
        System.out.println("--user3--");
        User user3 = applicationContext.getBean("user3", User.class);
        user3.getUser();
        System.out.println("--user4--");
        User user4 = applicationContext.getBean("user4", User.class);
        user4.getUser();
        System.out.println("--user5--");
        User user5 = applicationContext.getBean("user5", User.class);
        user5.getUser();
//--user--
//null
//0
//null
//--user1--
//张三
//18
//null
//--user2--
//张三
//18
//User.Pet@74f6c5d8
//--user3--
//张三
//18
//User.Pet@27912e3
//--user4--
//张三
//18
//User.Pet@74f6c5d8
//--user5--
//张三
//18
//User.Pet@34b9f960
    }

    @Test
    public void test2(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("application.xml");
        UserServiceImpl userService = applicationContext.getBean("userService", UserServiceImpl.class);
        userService.getUser();
    }
}