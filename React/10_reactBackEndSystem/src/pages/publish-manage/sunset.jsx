import MyPublish from "../../components/myPublish"
import { Button } from "antd"
import useNews from './../../components/useNews';

const Sunset = () => {
    const { table, handleDelete } = useNews(3) // {} // publishState = 3 => 已下线
    return (
        <div>
            <MyPublish table={table} button={(id) => <Button danger type="primary" onClick={() => { handleDelete(id) }}>删除</Button>} /> {/* 回调标签，不用{}包裹否则无法显示出来 */}
        </div>
    )
}
export default Sunset
