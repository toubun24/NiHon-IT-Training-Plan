// 有文件夹(userManage)即嵌套路由，则需要创建userManage/_layout.jsx，放布局、权限判断等内容
// 但以上是umi3.x的内容，新版嵌套路由参考https://github.com/umijs/umi/issues/8850#issuecomment-1206194329

const index = (props) => { // props
    return (
        <div>
            {props.children}
        </div>
    )
}
// index.wrappers = ['@/wrappers/Auth'] // 只需要在_layout处配置一次，则会在该文件夹下的所有路由中应用该权限判断 // 所有人都有该部分权限，除了新闻分类板块
export default index