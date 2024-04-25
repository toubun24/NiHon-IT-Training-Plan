import User.User;
import com.lalapodo.Service.Impl.UserServiceImpl;
import com.lalapodo.Service.UserService;
import com.lalapodo.config.Config;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test {
    @Test
    public void test4(){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
        UserService userService = applicationContext.getBean(UserService.class);
        System.out.println(userService.getAll());
    }
    // [TestTable{id=1, name='zhangsan', age='18'}, TestTable{id=2, name='lisi', age='19'}, TestTable{id=3, name='wangwu', age='20'}]

    
}