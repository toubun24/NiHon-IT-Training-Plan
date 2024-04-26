package User;

public class User {
//    public void getUser(){
//        System.out.println("getUser");
//    }

    private String name;
    private int age;
    private Pet pet;

    // setter(); // set注入
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void setPet(Pet pet) {
        this.pet = pet;
    }

    // 有参构造注入
    public User(String name, int age, Pet pet) {
        this.name = name;
        this.age = age;
        this.pet = pet;
    }

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", pet=" + pet +
                '}';
    }

    public void getUser(){
        System.out.println(name);
        System.out.println(age);
        System.out.println(pet);
    }
}