//vm和vc都可以用
export default {
    install(Vue) {
        //vue帮你调用install方法
        // console.log('install');
        // console.log(Vue); //vm的构造函数Vue

        //全局过滤器 // 已弃用
        // Vue.filter('mySlice', function (val) {
        //     return val.slice(0, 4);
        // });

        // 全局指令
        Vue.directive('fbind', { // Vue 2
            bind(el, binding) {
                console.log('bind')
                el.value = binding.value;
            },
            //指令被插入页面时
            // inserted(el, binding) { // 'binding' is defined but never used  no-unused-vars
            inserted(el) {
                console.log('inserted')
                el.focus();
            },
            //指令所在模版被重新解析时
            update(el, binding) {
                console.log('update');
                el.value = binding.value;
            }
        });

        Vue.directive('fbind2', { // Vue 3
            // 当被绑定的元素挂载到 DOM 中时调用  
            mounted(el, binding) {
                console.log("mounted")
                // 初始化，设置元素的 value  
                el.value = binding.value;
                // 监听 input 事件来更新绑定的值  
                el.addEventListener('input', (event) => {
                    // 更新绑定的值，这将会触发组件的更新  
                    binding.instance.name = event.target.value;
                });
            },
            // 当指令所在的组件更新时调用  
            updated(el, binding) {
                // 更新元素的 value，以反映新的绑定值  
                el.value = binding.value;
            },
            // 如果指令所在的模板被卸载，调用此钩子  
            unmounted(el) {
                // 清理工作，比如移除事件监听器  
                el.removeEventListener('input', el._fbind2EventListener)
            }
        });

        //全局混入
        Vue.mixin({
            data() {
                return {
                    x: 1,
                    y: 2
                }
            },
            computed: {
                mySlice() { // 全局过滤器
                    // if(this.name){ // if
                    //     return this.name.slice(0, 4);
                    // }
                    return this.name ? this.name.slice(0, 4) : ''
                }
            }
        });

        //给vue原型上添加一个方法 vc/vm都可以使用
        // Vue.prototype.hello = function () { // Vue 2 添加全局方法
        Vue.config.globalProperties.hello = function () { // Vue 3 添加全局方法
            alert('hello')
        }
    }
}