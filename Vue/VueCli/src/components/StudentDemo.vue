<template>
    <div class="demo">
        <h1>信息：{{ msg }}</h1>
        <h2>props姓名：{{ name }}</h2>
        <h2>props性别：{{ sex }}</h2>
        <h2>props年龄(:age)：{{ age + 100 }}</h2>
        <h2>props字符串(num)：{{ num + 100 }}</h2>
        <h2>props字符串*1转数字(num*1)：{{ num * 1 + 100 }}</h2>
        <button @click="updateName">改props名</button>
        <button @click="updateName2">改vc名</button>
        <h2>vc姓名：{{ name2 }}</h2>
        <button @click="updateAge">改:age</button>
    </div>
</template>

<script>
export default {
    name: 'StudentDemo',
    // 1
    // props: ['name', 'sex', 'age', 'num'],
    // 2
    // props: {
    //     name: String,
    //     sex: String,
    //     age: Number,
    //     // num: Number, // Invalid prop: type check failed for prop "num". Expected Number with value 13, got String with value "13".
    //     num: String,
    // },
    // 3
    props: {
        name: {
            type: String,
            required: true
        },
        sex: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 99 // default
        },
        num: {
            type: String,
            required: true
        },
    },
    data() {
        console.log(this)
        return { // {}
            msg: "msg",
            name2: this.name // 把props传递过来的值当成vc的状态，这样改name是不会出问题的，因为你没有直接去修改props
        }
    },
    methods: {
        updateName() { // [Vue warn]: Unhandled error during execution of native event handler // runtime-core.esm-bundler.js:385 Uncaught TypeError: Cannot set properties of undefined (setting 'name')
            this.props.name = '111' // this.props.
        },
        updateName2() {
            this.name2 = '222' // this.
        },
        updateAge() { // [Vue warn]: Unhandled error during execution of native event handler // runtime-core.esm-bundler.js:385 Uncaught TypeError: Cannot set properties of undefined (setting 'name')
            this.props.age = '333' // this.props.
        },
    }
}
</script>