package Java._09_Generic;

public class MyClass2<T, U> extends MyParentClass<T> { // 泛型类继承
    private U anotherData;

    public U getAnotherData() {
        return anotherData;
    }

    public void setAnotherData(U anotherData) {
        this.anotherData = anotherData;
    }
}
