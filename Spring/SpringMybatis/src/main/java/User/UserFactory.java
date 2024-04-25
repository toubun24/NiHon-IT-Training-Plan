package User;

public class UserFactory {
    public static UserDao backDao(){
        return new UserDao();
    }
}
