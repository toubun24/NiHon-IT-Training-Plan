import { Redirect } from "umi";

const index = () => {
    return (
        <Redirect to='/home' />
    )
}

index.wrappers = ['@/wrappers/Auth']; // 权限判断，有token则跳转到home
export default index;