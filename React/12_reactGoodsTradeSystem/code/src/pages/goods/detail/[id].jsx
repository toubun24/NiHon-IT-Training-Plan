import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Tag } from 'antd';
import { useParams } from 'umi'; // useParams
import axios from 'axios';
import { EnvironmentOutlined, StarOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons';
import OtherAvatar from '../../../components/otherAvatar';
import { useHistory } from 'umi';
import MyBack from '../../../components/myBack';

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
  const [followData, setFollowData] = useState([]);
  const history = useHistory()
  const [tagData, setTagData] = useState([]);
  const [tags, setTags] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse

  useEffect(async () => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    const res = await axios.get(`http://localhost:5000/goods/${params.id}?_expand=user`) // http://localhost:5000/goods?id={params.id}&_expand=user
    setDetailData(res.data) // goods/${params.id}不需要[0]，goods/id=${params.id}需要[0]
    setUserData(res.data.user)
    setDizhiData(res.data.dizhi)
    setStarData(res.data.starList)
    setFollowData(res.data.user.followList)
    setTagData(res.data.tagList)
    const tagIdData = res.data.tagList
    console.log(res.data.starList)
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
    console.log("wannaBuy")
  }
  const follow = () => {
    if (followData.includes(userData.id) === true) {
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { followList: [...followData.filter(data => data !== userData.id)] }).then(
        res => setFollowData(res.data.followList)
      )
      axios.patch(`http://localhost:5000/users/${userData.id}`, { followerList: [...followData.filter(data => data !== myContent.id)] })
    } else if (followData.length > 0) {
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { followList: [...followData, userData.id] }).then(
        res => setFollowData(res.data.followList)
      )
      axios.patch(`http://localhost:5000/users/${userData.id}`, { followerList: [...followData, myContent.id] })
    } else {
      axios.patch(`http://localhost:5000/users/${myContent.id}`, { followList: [userData.id] }).then(
        res => setFollowData(res.data.followList)
      )
      axios.patch(`http://localhost:5000/users/${userData.id}`, { followerList: [myContent.id] })
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
          <div style={{ fontWeight: 'bold' }}>{userData ? userData.username : ""}</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            <EnvironmentOutlined />
            <span>
              {dizhiData[1]}
            </span>
          </div>
        </div>
        {
          userData.id === myContent.id ? <Button style={{ marginTop: "2px" }} onClick={() => follow()} type='primary' disabled>关注</Button> :
            followData.includes(userData.id) ? <Button style={{ marginTop: "2px" }} onClick={() => follow()}>已关注</Button> : // [].includes没关系的不会报错
              <Button style={{ marginTop: "2px" }} onClick={() => follow()} type='primary'>关注</Button>
        }
      </Flex>
      <MyBack />
      <br />
      <div style={{}}>
        <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{"¥"}{detailData.shoujia}{" "}</span>
        <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>{"¥"}{detailData.yuanjia}</span>
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{" "}{fahuofangshiList[detailData.fahuofangshi]}{detailData.fahuofangshi === "zishe" ? detailData.youfei : ""}</span>
        <span style={{ fontSize: '12px' }}>{" 浏览量:"}{detailData.view}</span>
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
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
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
        {
          userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '5px' }} onClick={() => modify()} icon={<EditOutlined />}>修改</Button> : <></>
        }
        {
          userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />} disabled>收藏</Button> :
            starData.includes(myContent.id) ? <Button style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />}>已收藏</Button> : // [].includes没关系的不会报错
              <Button type="primary" style={{ marginRight: '5px' }} onClick={() => addStar()} icon={<StarOutlined />}>收藏</Button>
        }
        {
          userData.id === myContent.id ? <Button type="primary" style={{ marginRight: '1.8%' }} onClick={() => wannaBuy()} icon={<CommentOutlined />} disabled>我想要</Button> :
            <Button type="primary" style={{ marginRight: '1.8%' }} onClick={() => wannaBuy()} icon={<CommentOutlined />}>我想要</Button>
        }
      </div>
    </div>
  )
}
export default Goods
