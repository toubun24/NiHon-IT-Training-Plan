package Java._06_Exception;

public class InvalidAgeException extends Exception{ // 自定义异常
    public InvalidAgeException(String message){
        super(message);
    }
}
