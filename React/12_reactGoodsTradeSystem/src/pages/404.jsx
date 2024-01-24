import { Redirect } from "umi";

const error = () => {
    return (
        // <Redirect to='/home' />
        <div>404</div>
    )
}
error.wrappers = ['@/wrappers/Auth'] // error.
export default error;