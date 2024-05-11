import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lalapodo.Dao.TestTable3;
import com.lalapodo.mapper.TestMapper2;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class SqlTest2 {
    /*动态SQL if&where标签*/
    @Test
    public void testsql21() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2
        List<TestTable3> tt3 = mapper2.ifResult(new TestTable3(null,"zhangsan","18",1L));
        System.out.println(tt3); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)]
        List<TestTable3> ttall = mapper2.ifResult(new TestTable3(null,null,null,null));
        System.out.println(ttall); // all
        sqlSession.close();
    }

    /*动态SQL choose&when&otherwise标签*/
    @Test
    public void testsql22() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2
        List<TestTable3> tt3 = mapper2.ifResult2(new TestTable3(1L,"zhangsan","18",1L));
        System.out.println(tt3); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)]
        List<TestTable3> ttnull = mapper2.ifResult2(new TestTable3(null,null,null,null));
        // <otherwise> age = 18 </otherwise>
        System.out.println(ttnull); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)]
        sqlSession.close();
    }

    /*动态SQL set标签*/
    @Test
    public void testsql23() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2

        mapper2.updateResult(new TestTable3(1L,"张三","18",1L));
        List<TestTable3> tt3 = mapper2.ifResult2(new TestTable3(1L,null,null,null));
        System.out.println(tt3); // [TestTable3(id=1, name=张三, age=18, gid=1)]

        mapper2.updateResult(new TestTable3(1L,"zhangsan",null,1L));
        List<TestTable3> tt32 = mapper2.ifResult2(new TestTable3(1L,null,null,null));
        System.out.println(tt32); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)]

        // mapper2.updateResult(new TestTable3(1L,"zhangsan","18",1L));
        sqlSession.close();
    }

    /*动态SQL trim标签*/
    @Test
    public void testsql24() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2

        List<TestTable3> tt3 = mapper2.ifResult3(new TestTable3(1L, "zhangsan", "18", 1L));
        System.out.println(tt3); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)]

        List<TestTable3> tt32 = mapper2.ifResult3(new TestTable3(null, "zhangsan", "18", 1L));
        System.out.println(tt32); // [TestTable3(id=1, name=zhangsan, age=18, gid=1)] // 能够智能去除and前缀

        List<TestTable3> tt33 = mapper2.ifResult3(new TestTable3(null, null, null, null));
        System.out.println(tt33); // all

        sqlSession.close();
    }

    /*动态SQL foreach标签*/
    @Test
    public void testsql25() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2

        Long[] longs = {1L, 2L, 3L};
        boolean b = mapper2.deleteResult(longs); // 删除所有!!!
        System.out.println(b);

        sqlSession.close();
    }

    /*动态SQL sql标签*/
    @Test
    public void testsql26() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2

        List<TestTable3> tt33 = mapper2.ifResult4(new TestTable3(1L, null, null, null));
        System.out.println(tt33); // [TestTable3(id=null, name=zhangsan, age=18, gid=null)]

        sqlSession.close();
    }

    /*动态SQL PageHelper分页插件*/
    @Test
    public void testPageHelper() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatisConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        org.apache.ibatis.session.SqlSession sqlSession = sqlSessionFactory.openSession(true);
        TestMapper2 mapper2 = sqlSession.getMapper(TestMapper2.class); // TestMapper2

        //访问第一页，每页三条数据
        PageHelper.startPage(1,2);
        //查询数据
        List<TestTable3> tt3 = mapper2.getAll();
        //获取PageInfo
        PageInfo<TestTable3> pageInfo = new PageInfo<>(tt3);
        System.out.println(pageInfo);
        // PageInfo{pageNum=1, pageSize=2, size=2, startRow=1, endRow=2, total=4, pages=2, list=Page{count=true, pageNum=1, pageSize=2, startRow=0, endRow=2, total=4, pages=2, reasonable=false, pageSizeZero=false}[TestTable3(id=1, name=zhangsan, age=18, gid=1), TestTable3(id=2, name=lisi, age=19, gid=1)], prePage=0, nextPage=2, isFirstPage=true, isLastPage=false, hasPreviousPage=false, hasNextPage=true, navigatePages=8, navigateFirstPage=1, navigateLastPage=2, navigatepageNums=[1, 2]}
        // 输出一下每条数据
        tt3.forEach(System.out::println);
        // TestTable3(id=1, name=zhangsan, age=18, gid=1)
        // TestTable3(id=2, name=lisi, age=19, gid=1)
        //其他分页的数据
        System.out.println("总条数："+pageInfo.getTotal()); // 总条数：4
        System.out.println("总页数："+pageInfo.getPages()); // 总页数：2
        System.out.println("当前页："+pageInfo.getPageNum()); // 当前页：1
        System.out.println("每页显示长度："+pageInfo.getPageSize()); // 每页显示长度：2
        System.out.println("是否第一页："+pageInfo.isIsFirstPage()); // 是否第一页：true
        System.out.println("是否最后一页："+pageInfo.isIsLastPage()); // 是否最后一页：false
        //关闭sqlSession
        sqlSession.close();
    }
}