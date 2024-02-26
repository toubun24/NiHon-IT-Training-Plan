import React, { useState } from 'react';
import { Card, List, Skeleton, Space } from 'antd';
import { useHistory } from 'umi';
import OtherAvatar from './otherAvatar';
import moment from 'moment'; // 时间戳格式化

const { Meta } = Card;

const MyList = ({ data, tabId }) => { // {data}
  const history = useHistory()
  // console.log(data)
  return (
    <>
      <List
        grid={{ // 随窗口宽度缩放而变化展示数量
          gutter: 16, // 栅格间隔
          xs: 1, // <576px 展示的列数
          sm: 2, // >=576px 展示的列数
          md: 4, // >=768px 展示的列数
          lg: 5, // >=992px 展示的列数
          xl: 7, // >=1200px 展示的列数
          xxl: 10, // >=1600px 展示的列数
        }}
        dataSource={data ? data : []}
        pagination={{ position: 'bottom', align: 'center', pageSize: 20 }}
        renderItem={(item) => ( // data=>item
          <List.Item>
            <Card
              hoverable
              size="small"
              style={{ width: 150 }}
              // title={item.title}
              // style={{ maxHeight: "200px", objectFit: "cover" }}
              cover={<img style={{ maxHeight: "150px", objectFit: "cover" }} alt="example" src={require(`@/images/goods/${item.tupian}`)} />}
              onClick={() => { history.push(`/goods/detail/${item.id}`) }}
            >
              <Skeleton loading={data ? false : true} active>
                <Meta
                  title={<span style={{ fontSize: "14px" }}>{item.introduction}</span>} // 换行 whiteSpace:"pre-wrap"
                  description={
                    <div>
                      <span style={{ color: 'red', marginRight: "4px" }}>¥{item.shoujia}</span>
                      <span style={{ textDecoration: 'line-through', fontSize: '10px', marginRight: "15px" }}>{"¥"}{item.yuanjia}</span>
                      <span style={{ fontSize: '10px',float:'right',marginTop:'5.5px' }}>{item.editTime ? moment(item.editTime).format('YY/MM/DD') : "-"}</span>
                      <br />
                      <Space size={5}>
                        <OtherAvatar userIdInfo={item.userId} size={"small"} />
                        <div style={{ textAlign: 'right', width: "10px", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.user.username}</div>
                      </Space>


                    </div>
                  }
                />
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}
export default MyList;