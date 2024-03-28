export const mixin = {
    methods: {
        showName() {
            alert(this.name)
        }
    },
    mounted() {
        console.log('你好')
    }
}

export const shareData = {
    data() {
        return {
            x: 100,
            y: 200
        }
    }
}