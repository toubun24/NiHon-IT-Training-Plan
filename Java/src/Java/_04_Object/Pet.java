package Java._04_Object;

// final public class Pet { // final后无法重写
public class Pet {
    // final void print() throws RuntimeException { // final后无法重写
    void print() throws RuntimeException {
        System.out.println("Pet");
    }
    static void aaa(){

    }
    // 方法重载
    // static void eat(){
    public void eat(){
        System.out.println("pet eat");
    }
    private static int eat(int a){
        return 1;
    }
    protected static String eat(String a){
        return "a";
    }
}
