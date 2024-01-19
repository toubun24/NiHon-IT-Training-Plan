import MyPublish from "../../components/myPublish"
import { Button } from "antd"
import useNews from './../../components/useNews';

const Published=()=> {
    const { table, handleSunset } = useNews(2) // {} // publishState = 2 => 已发布
    return (
        <div>
            <MyPublish table={table} button={(id) =>  <Button danger type="primary" onClick={()=>{handleSunset(id)}}>下线</Button> } /> {/* 回调标签，不用{}包裹否则无法显示出来 */}
        </div>
    )
}
export default Published
