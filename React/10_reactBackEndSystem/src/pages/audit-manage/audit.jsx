import { Table, Button, notification } from 'antd'; // notification
import { useState, useEffect } from 'react';
import axios from 'axios';

const Audit = () => {
    const [table, setTable] = useState([]);
    const tokenContent = localStorage.getItem('token');
    const { username, region, roleId } = tokenContent == '' ? { username: '', region: '', roleId: '' } : JSON.parse(tokenContent) // JSON.parse // region: region2 重命名别名
    const [api] = notification.useNotification()
    useEffect(
        () => {
            const roleObj = { // 映射id信息
                "1": 'superAdmin',
                "2": 'admin',
                "3": 'editor',
            }
            axios.get('http://localhost:5000/news?auditState=1&_expand=category').then(
                response => {
                    // setTable(response.data)
                    setTable(roleObj[roleId] === 'superAdmin' ? response.data : [
                        ...response.data.filter(item => item.author === username),
                        ...response.data.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
                    ])
                }
            )
        }, [roleId, username, region]
    )
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title', // label => title
            render: (title, item) => { // 预览页面 // item
                return <a href={`/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => {
                return category.title
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => { handleNews(item, 2, 1) }}>通过</Button> {/* onClick={()=>{}} */}{/* 2,1: 通过,待发布 */}
                    <Button danger onClick={() => { handleNews(item, 3, 0) }} >不通过</Button>{/* 3,0: 不通过,未发布 */}
                </div>
            }
        },
    ];
    const handleNews = (item, auditState, publishState) => {
        setTable(table.filter(data => data.id !== item.id))
        axios.patch(`http://localhost:5000/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            api.info({ // antd notification
                message: `通知`,
                description:
                    '请到审核列表查看',
                placement: 'buttomRight',
            });
        })
    }

    return (
        <>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} />
        </>
    )
}

export default Audit;