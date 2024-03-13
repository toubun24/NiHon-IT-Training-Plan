import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Tag, Modal, Radio, Space, Form, notification } from 'antd';
import { useParams } from 'umi'; // useParams
import axios from 'axios';
import { EnvironmentOutlined, StarOutlined, CommentOutlined, EditOutlined, ScissorOutlined, DeleteOutlined } from '@ant-design/icons';
import OtherAvatar from '../../../components/otherAvatar';
import { useHistory } from 'umi';
import MyBack from '../../../components/myBack';
import moment from 'moment'; // 时间戳格式化

const fahuofangshiList = {
  "zishe": "邮费: ¥",
  "baoyou": "包邮",
  "ziti": "仅限自提"
}

const Goods = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  // const [information, setInformation] = useState([]);
  const [detailData, setDetailData] = useState({}); // 商品详情信息 // {}
  const [userData, setUserData] = useState({}); // 卖家详情信息 // {}
  const [dizhiData, setDizhiData] = useState([]); // 地址信息 // []
  // const [isStar, setIsStar] = useState();
  const [starData, setStarData] = useState([]);
  const [starData2, setStarData2] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const history = useHistory()
  const [tagData, setTagData] = useState([]);
  const [tags, setTags] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [value, setValue] = useState(1);
  const [form] = Form.useForm();

  useEffect(async () => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    const res = await axios.get(`http://localhost:5000/goods/${params.id}?_expand=user`) // http://localhost:5000/goods?id={params.id}&_expand=user
    setDetailData(res.data) // goods/${params.id}不需要[0]，goods/id=${params.id}需要[0]
    setUserData(res.data.user)
    setDizhiData(res.data.dizhi)
    setStarData(res.data.starList)
    setFollowerData(res.data.user.followerList)
    setTagData(res.data.tagList)
    const tagIdData = res.data.tagList
    // console.log(res.data.starList)
    // console.log("tagIdData", tagIdData[0], tagIdData[1], tagIdData[2])
    // setIsStar(starData.includes(params.id)) // 后面组件直接跳过state调用了 // console.log(starData, isStar, starData.includes(params.id)) // ['19'] undefined true // ['19'] false true
    // return res.data // res.view
    await axios.patch(`http://localhost:5000/goods/${params.id}`, { view: res.data.view + 1 }) // 每次访问或刷新则浏览量+1
    // console.log(tagIdData);
    const requests = tagIdData && tagIdData.map(id => { return axios.get(`http://localhost:5000/tags/${id}`) });
    axios.all(requests).then(axios.spread((...responses) => { // axios.all // axios.spread // 和这一层可能也有关
      // console.log(responses["data"]) // 怎么一次性取完最好
      // console.log(responses);
      const tmp = responses.map(response => {
        // const tmp = tags
        // tmp.push(response.data.tagName)
        // const tmp = [tags, response.data.tagName]
        // console.log([response.data["tagName"]])
        // setTags(tmp) // [...tags,response.data.tagName]???
        // console.log(response.data.tagName,tmp)
        return response.data.tagName // return
        // console.log(response.data.tagName)
      })
      // console.log("tags",tags);
      // console.log(tmp);
      setTags(tmp)
    }))
    const res2 = await axios.get(`http://localhost:5000/users/${myContent.id}`)
    setStarData2(res2.data.starList)
    setFollowData(res2.data.followList)
  }, [])

  const addStar = () => {
    // setIsStar(starData.includes(`${params.id}`))
    /*
    isStar ? axios.patch(`http://localhost:5000/users/${userData.id}`, { starList: [] }) : // starList已收藏
      starData ? axios.patch(`http://localhost:5000/users/${userData.id}`, { starList: [...starData, params.id] }) : // starList非空但未收藏
        axios.patch(`http://localhost:5000/users/${userData.id}`, { starList: [params.id] }) // starList为空且未收藏
    */
    // console.log("starData", starData, myContent.id,starData.includes(myContent.id) ? "true" : "false")
    if (starData.includes(myContent.id) === true) {
      setStarData(starData.filter(data => data !== myContent.id))
      axios.patch(`http://localhost:5000/goods/${params.id}`, { starList: starData.filter(data => data !== myContent.id) })
      setStarData2(starData2.filter(data => data !== params.id))
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { starList: starData2.filter(data => data !== params.id) })
    } else { // [...[],XXX] is ok // } else if (starData.length > 0) {
      setStarData([...starData, myContent.id])
      axios.patch(`http://localhost:5000/goods/${params.id}`, { starList: [...starData, myContent.id] })
      setStarData2([...starData2, params.id])
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { starList: [...starData2, params.id] })
    }
  }
  const wannaBuy = () => {
    history.push(`/goods/order/${params.id}`)
  }
  const follow = () => {
    // followerData 卖家粉丝
    // followData 买家关注
    // userData.id 卖家id
    // myContent.id 买家id
    if (followerData.includes(myContent.id) === true) {
      setFollowerData(followerData.filter(data => data !== myContent.id))
      axios.patch(`http://localhost:5000/users/${userData.id}`, { followerList: followerData.filter(data => data !== myContent.id) })
      setFollowData(followData.filter(data => data !== userData.id))
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { followList: followData.filter(data => data !== userData.id) })
    } else { // [...[],XXX] is ok // } else if (starData.length > 0) {
      setFollowerData([...followerData, myContent.id])
      axios.patch(`http://localhost:5000/users/${userData.id}`, { followerList: [...followerData, myContent.id] })
      setFollowData([...followData, userData.id])
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { followList: [...followData, userData.id] })
    }
  }
  const modify = () => {
    history.push(`/goods/modify/${params.id}`)
  }
  const ClickTag = (index) => {
    // console.log(tagData[index])
    history.push(`/goods/tag/${tagData[index]}`)
  }
  // console.log(`http://localhost:5000/goods/${params.id}?_expand=user`, detailData)
  // console.log(detailData)
  const handleOk1 = async () => { // 0正常，1禁止购买，2禁止出售，3封禁中，4已注销
    await axios.patch(`http://localhost:5000/users/${userData.id}`, {
      state: value,
    })
    notification.open({
      message: '通知',
      description:
        `用户权限已调整`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen1(false)
  }
  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const handleOk2 = async () => { // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架，5售罄，6强制下架
    await axios.patch(`http://localhost:5000/goods/${params.id}`, {
      state: 0,
    })
    notification.open({
      message: '通知',
      description:
        `商品已打回草稿箱`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen2(false)
    history.push(`/home`)
  }
  const handleOk3 = async () => { // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架，5售罄，6强制下架
    await axios.patch(`http://localhost:5000/goods/${params.id}`, {
      state: 6,
    })
    notification.open({
      message: '通知',
      description:
        `商品已被下架`,
      duration: 2,
      placement: "bottomRight"
    });
    setIsModalOpen3(false)
    history.push(`/home`)
  }

  return ( // detailData.user.username // TypeError: Cannot read properties of undefined (reading 'username')
    <div>
      <Flex style={{ position: "fixed", right: "5%" }}>
        <div style={{
          verticalAlign: 'middle',
          marginRight: '10px', // 右边距
          marginTop: '4px'
        }}>
          {userData.id >= 0 && <OtherAvatar userIdInfo={userData.id} />}
        </div>
        <div style={{ marginRight: '10px' }}>
          <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push(`/homepages/${userData.id}`)}>{userData ? userData.username : ""}</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            <EnvironmentOutlined />
            <span>
              {dizhiData[1]}
            </span>
          </div>
        </div>
        {
          myContent.state !== 5 && myContent.state !== 6 ? (userData.id === myContent.id ? <Button style={{ marginTop: "2px" }} onClick={() => follow()} type='primary' disabled>关注</Button> :
            followData.includes(userData.id) ? <Button style={{ marginTop: "2px" }} onClick={() => follow()}>已关注</Button> : // [].includes没关系的不会报错
              <Button style={{ marginTop: "2px" }} onClick={() => follow()} type='primary'>关注</Button>)
            :
            <Button style={{ marginTop: "2px" }} onClick={() => setIsModalOpen1(true)} type='primary'>权限</Button> // 管理员操作
        }
      </Flex>
      <MyBack />
      <br />
      <div style={{}}>
        <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{"¥"}{detailData.shoujia}{" "}</span>
        <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>{"¥"}{detailData.yuanjia}</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{" "}{fahuofangshiList[detailData.fahuofangshi]}{detailData.fahuofangshi === "zishe" ? detailData.youfei : ""}</span>
        <span style={{ fontSize: '12px' }}>{" 收藏量:"}{starData.length}</span>
        <span style={{ fontSize: '12px' }}>{" 浏览量:"}{detailData.view}</span>
        <span style={{ fontSize: '12px', marginLeft: '10px' }}>{" "}发布时间:{detailData.publishTime ? moment(detailData.publishTime).format('YY/MM/DD HH:mm:ss') : "-"}</span>
        <span style={{ fontSize: '12px' }}>{" "}最近修改:{detailData.editTime && detailData.editTime !== detailData.publishTime ? moment(detailData.editTime).format('YY/MM/DD HH:mm:ss') : "-"}</span>
        <div>
          {
            tags && tags.length > 0 && tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  style={{
                    userSelect: 'none',
                    cursor: "pointer"
                  }}
                  color="gold"
                  onClick={() => ClickTag(index)}
                >
                  <span>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            }
            )
          }
        </div>
      </div>

      <br />
      <div>
        <Image
          width={200}
          src={detailData.tupian ? require(`@/images/goods/${detailData.tupian}`) : "error"} // Error: Cannot find module './undefined'
          fallback="data:image/png;base64,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"
        />
        <span style={{
          fontSize: '18px',
          verticalAlign: 'top' // 垂直向上对齐
        }}>
          {detailData.introduction}
        </span>
      </div>
      <div style={{
        textAlign: 'right' // 水平向右对齐
      }}>
        <span style={{ fontSize: '14px', marginRight: '5px' }}>{"存货数量:"}<span style={{ fontSize: '16px' }}>{detailData.num}</span></span>
        {
          userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '5px' }} onClick={() => modify()} icon={<EditOutlined />}>修改</Button> : <></>
        }
        {
          myContent.state !== 5 && myContent.state !== 6 ? (userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />} disabled>收藏</Button> :
            starData.includes(myContent.id) ? <Button style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />}>已收藏</Button> : // [].includes没关系的不会报错
              <Button type="primary" style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />}>收藏</Button>)
            :
            <Button type="primary" style={{ marginRight: '5px' }} onClick={() => setIsModalOpen2(true)} icon={<ScissorOutlined />}>违规修改</Button> // 管理员操作
        }
        {
          myContent.state !== 5 && myContent.state !== 6 ? (myContent.state == 1 || myContent.state == 3 ? <Button type="primary" style={{ marginRight: '1.8%' }} icon={<CommentOutlined />} disabled>禁购中</Button> :
            detailData.num === 0 ? <Button type="primary" style={{ marginRight: '1.8%' }} icon={<CommentOutlined />} disabled>已售罄</Button> :
              userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '1.8%' }} icon={<CommentOutlined />} disabled>我想要</Button> :
                <Button type="primary" style={{ marginRight: '1.8%' }} onClick={() => wannaBuy()} icon={<CommentOutlined />}>我想要</Button>)
            :
            <Button type="primary" style={{ marginRight: '1.8%' }} onClick={() => setIsModalOpen3(true)} icon={<DeleteOutlined />}>直接下架</Button> // 管理员操作
        }
      </div>
      <Modal // 1
        title="用户权限管理"
        open={isModalOpen1}
        closeIcon={false}
        footer={[ // footer
          <Button key='back' onClick={() => setIsModalOpen1(false)}>取消</Button>,
          <Button key='submit' type="primary" onClick={handleOk1}>确认调整</Button>,
        ]}
      >
        <p>请选择调整后的用户权限状态：</p>
        <Form
          form={form}
        >
          <Form.Item
            name="userManage"
            rules={[
              {
                required: true,
                message: '内容不能为空',
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={0}>正常</Radio>
                <Radio value={1}>禁购</Radio>
                <Radio value={2}>禁售</Radio>
                <Radio value={3}>封禁</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Modal // 2
        title="违规修改"
        open={isModalOpen2}
        closeIcon={false}
        footer={[ // footer
          <Button key='back' onClick={() => isModalOpen2(false)}>返回</Button>,
          <Button key='ok' type="primary" onClick={handleOk2}>确认</Button>,
        ]}
      >
        <p>是否确认将商品打回至用户草稿箱</p>
      </Modal>
      <Modal // 2
        title="违规修改"
        open={isModalOpen3}
        closeIcon={false}
        footer={[ // footer
          <Button key='back' onClick={() => isModalOpen3(false)}>返回</Button>,
          <Button key='ok' type="primary" onClick={handleOk3}>确认</Button>,
        ]}
      >
        <p>是否确认将商品直接下架</p>
      </Modal>
    </div>
  )
}
export default Goods
