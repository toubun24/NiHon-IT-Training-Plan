package Java._04_Object;

public class Object06 {
    public static void main(String[] args) {
        Object05 object05 = new Object05("zhangsan", 18);
        object05.print();

        Object05 object06 = new Object05("zhangsan");
        object06.print();

        Object05 object07 = new Object05();
        object07.print();
    }
}
