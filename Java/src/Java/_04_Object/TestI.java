package Java._04_Object;

public class TestI {
    public static void main(String[] args) {
        DogI dogI =new DogI();
        dogI.eat(); // dog eat interface
        System.out.println(dogI.a); // 1
        System.out.println(dogI.b); // v

        dogI.run(); // run default // 接口默认方法
        PetI.test(); // test static // 接口静态方法
    }
}
