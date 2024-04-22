package User;

public class UserService { // IoC 控制反转
    public static void main(String[] args) {
        // UserDao userDao = new UserDao();
        UserDao userDao = UserFactory.backDao(); // UserFactory
        userDao.getDao(); // dao
    }
}
