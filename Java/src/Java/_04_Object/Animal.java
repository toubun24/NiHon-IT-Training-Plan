package Java._04_Object;

public abstract class Animal {
    String name;

    public Animal(String name) {
        this.name=name;
    }

    public abstract void makeSound(); // 抽象方法
    public void eat(){
        System.out.println("eat");
    }
}