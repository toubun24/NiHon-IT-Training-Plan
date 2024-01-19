import { Table } from 'antd'; // Modal: 对话框

const MyPublish = (props) => { // props.table
  const columns = [ // 涉及修改所以放到函数组件中
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
      title: '开关',
      // dataIndex: '',
      render: (item) => { // item
        return <div>
          {props.button(item.id)} {/* 向父组件的回调标签传参id */}
        </div>
      }
    },
  ];
  return (
    <div>
      <Table dataSource={props.table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} /> {/* pagination: 分页器 */}
    </div>
  )
}
export default MyPublish