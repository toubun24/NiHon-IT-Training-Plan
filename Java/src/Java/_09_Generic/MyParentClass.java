package Java._09_Generic;

public class MyParentClass<T> { // 泛型类继承
    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}