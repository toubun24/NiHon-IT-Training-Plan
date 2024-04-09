package Java._04_Object;

public class Cat extends Animal implements Jumpable{
    public Cat(String name) {
        super(name);
    }

    public void makeSound(){
        System.out.println(name+"cat makesound");
    }

    public static void main(String[] args) {
        Animal cat = new Cat("name");
        cat.makeSound(); // 抽象方法
        cat.eat();
    }


    @Override
    public void jump() {
        System.out.println(name+"cat jump");
    }
}
