

const home = () => {
    return (
        <div>
            home
        </div>
    )
}
home.wrappers = ['@/wrappers/Auth'] // 如果不是通过localhost8000而是直接通过后缀名访问的话可能也会涉及权限判断 // home.
export default home;