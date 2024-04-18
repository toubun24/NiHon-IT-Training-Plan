package Java._09_Generic;

public class MyClass<T> { // 泛型类
    private T data;

    public MyClass(T data) {
        this.data = data;
    }

    public MyClass() { // 不然报错

    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
