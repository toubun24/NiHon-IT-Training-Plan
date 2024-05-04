import com.lalapodo.Dao.TestTable;
import com.lalapodo.mapper.TestMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class SqlTest {
    @Test
    public void testsql() throws IOException {
        // 1.加载核心配置文件
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        // 2.获取SqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        // 3.获取SqlSession 开启自动提交事务
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        // 4.获取mapper接口对象
        TestMapper mapper = sqlSession.getMapper(TestMapper.class);
        // 5.测试功能
        // 调用TestMapper接口中的方法
        List<TestTable> testTable = mapper.getAll();
        // 输出
        System.out.println(testTable);
        // [TestTable(id=1, name=updatedname, age=1000), TestTable(id=2, name=lisi, age=19), TestTable(id=3, name=wangwu, age=20), TestTable(id=4, name=aaa, age=18), TestTable(id=5, name=aaa, age=18), TestTable(id=7, name=aaa, age=18), TestTable(id=8, name=aaa, age=18), TestTable(id=10, name=add, age=123)]
        // 关闭
        sqlSession.close();
    }
}
