import { Redirect } from "umi";

const error = () => {
    return (
        <Redirect to='/home' />
    )
}
error.wrappers = ['@/wrappers/Auth'] // error.
export default error;