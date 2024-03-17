import { useEffect } from "react";
import { Redirect } from "umi";

const error = () => {
    const tokenContent = localStorage.getItem('token')
    const { state: { rights } } = tokenContent == '' ? { state: { rights: '' } } : JSON.parse(tokenContent) // JSON.parse
  
    useEffect(async () => {
      console.log(rights)
      console.log('publish',rights.includes('/publish'))
      console.log('homepage',rights.includes('/homepage'))
      console.log(rights.includes(location.pathname))
    }, [])
  
    return (
        // <Redirect to='/home' />
        <div>404</div>
    )
}
// error.wrappers = ['@/wrappers/Auth'] // error.
export default error;