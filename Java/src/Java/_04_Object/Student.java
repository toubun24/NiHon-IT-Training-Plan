package Java._04_Object;

public class Student extends Person {
    private String school;

    public Student(String name, int age, String school) { // 不提供有参构造则报错，因为父类只有有参构造
        super(name, age); // super
        this.school = school;
    }

    public Student() {
        super(); // 不写也行
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    void print(){
        super.setName("zhangsan222");
        System.out.println(super.name); // 除非是protected否则不能直接super.name
        System.out.println(super.getName()); // 都行
    }
}
