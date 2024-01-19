import MyPublish from "../../components/myPublish"
import { Button } from "antd"
import useNews from './../../components/useNews';

const Unpublished = () => {
    const { table, handlePublish } = useNews(1) // {} // publishState = 1 => 未发布
    return (
        <div>
            <MyPublish table={table} button={(id) => <Button type="primary" onClick={() => { handlePublish(id) }}>发布</Button>} /> {/* 回调标签，不用{}包裹否则无法显示出来 */}
        </div>
    )
}
export default Unpublished
