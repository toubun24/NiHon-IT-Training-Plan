import { Redirect } from "umi";

const error = () => {
    return (
        <Redirect to='/home' />
    )
}

export default error;