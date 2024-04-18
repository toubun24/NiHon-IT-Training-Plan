package Java._09_Generic;

public class Test03 { // 泛型类继承
    public static void main(String[] args) {
        MyClass2<String , Integer> o2 = new MyClass2<>();
        o2.setData("aaa"); // MyParentClass
        o2.setAnotherData(123); // MyClass2
        String data = o2.getData();
        Integer anotherData = o2.getAnotherData();
        System.out.println(data); // aaa
        System.out.println(anotherData); // 123
    }
}
