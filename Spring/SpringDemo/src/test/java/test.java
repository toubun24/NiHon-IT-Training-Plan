import User.User;
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
        User user = applicationContext.getBean("user", User.class);
        user.getUser();
    }
}
