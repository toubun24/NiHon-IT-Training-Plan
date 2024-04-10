package Java._06_Exception;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) throws InvalidAgeException  {
        if(age < 18) throw new InvalidAgeException("年龄不合法");
        this.name = name;
        this.age = age;
    }

    public String getName() { // generate getter
        return name;
    }

    public int getAge() { // generate getter
        return age;
    }
}
