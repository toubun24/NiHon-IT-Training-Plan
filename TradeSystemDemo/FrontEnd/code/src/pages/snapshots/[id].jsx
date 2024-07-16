import React, { useState, useEffect } from 'react';
import { Button, Flex, Image, Tag } from 'antd';
import { useParams } from 'umi'; // useParams
import axios from 'axios';
import { EnvironmentOutlined, StarOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons';
import OtherAvatar from './../../components/otherAvatar';
import { useHistory } from 'umi';
import MyBack from './../../components/myBack';
import moment from 'moment'; // 时间戳格式化

const fahuofangshiList = {
  "zishe": "邮费: ¥",
  "baoyou": "包邮",
  "ziti": "仅限自提"
}

const Goods = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  // const [information, setInformation] = useState([]);
  // const [detailData, setDetailData] = useState({}); // 商品详情信息 // {}
  // const [userData, setUserData] = useState({}); // 卖家详情信息 // {} // sellerData
  const [dizhiData, setDizhiData] = useState([]); // 地址信息 // []
  // const [isStar, setIsStar] = useState();
  // const [starData, setStarData] = useState([]);
  // const [starData2, setStarData2] = useState([]);
  // const [followerData, setFollowerData] = useState([]);
  // const [followData, setFollowData] = useState([]);
  const history = useHistory()
  const [tagData, setTagData] = useState([]);
  const [tags, setTags] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myId = tokenContent == '' ? { myId: '' } : JSON.parse(tokenContent).id // JSON.parse
  const [tradeData, setTradeData] = useState([]);
  const [sellerData, setSellerData] = useState([]);

  useEffect(async () => {
    const res0 = await axios.get(`http://localhost:5000/users/${myId}`)
    try {
      const res = await axios.get(`http://localhost:5000/trades/${params.id}`)
      if (res0.state !== 6 && res0.state !== 7 && res.data.sellerId !== myId && res.data.buyerId !== myId) {
        history.push('/404')
      } else {
        setTradeData(res.data)
        setDizhiData(res.data.dizhi)
        setTagData(res.data.tagList)
        const tagIdData = res.data.tagList
        const requests = tagIdData && tagIdData.map(id => { return axios.get(`http://localhost:5000/tags/${id}`) });
        axios.all(requests).then(axios.spread((...responses) => {
          const tmp = responses.map(response => {
            return response.data.tagName
          })
          setTags(tmp)
        }))
        const res2 = await axios.get(`http://localhost:5000/users/${res.data.sellerId}`)
        setSellerData(res2.data)
      }
    } catch (error) {
      history.push('/404')
    }
  }, [])

  const ClickTag = (index) => {
    // console.log(tagData[index])
    history.push(`/goods/tag/${tagData[index]}`)
  }
  // console.log(`http://localhost:5000/goods/${params.id}?_expand=user`, detailData)
  // console.log(detailData)


  return ( // detailData.user.username // TypeError: Cannot read properties of undefined (reading 'username')
    <div>
      {tradeData && tradeData.id &&
        <div>
          <Flex style={{ position: "fixed", right: "5%" }}>
            <div style={{
              verticalAlign: 'middle',
              marginRight: '10px', // 右边距
              marginTop: '4px'
            }}>
              {sellerData.id >= 0 && <OtherAvatar userIdInfo={sellerData.id} />}
            </div>
            <div style={{ marginRight: '10px' }}>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push(`/homepages/${sellerData.id}`)}>{sellerData ? sellerData.username : ""}</div>
              <div style={{ fontSize: '10px', marginTop: '5px' }}>
                <EnvironmentOutlined />
                <span>
                  {dizhiData[1]}
                </span>
              </div>
            </div>
          </Flex>
          <MyBack /><span style={{ fontSize: '20px', fontWeight: 'bold' }}>商品快照</span>
          <br />
          <div style={{}}>
            <span style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{"¥"}{tradeData.shoujia}{" "}</span>
            <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>{"¥"}{tradeData.yuanjia}</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{" "}{fahuofangshiList[tradeData.fahuofangshi]}{tradeData.fahuofangshi === "zishe" ? tradeData.youfei : ""}</span>
            <span style={{ fontSize: '12px', marginLeft: '10px' }}>{" "}发布时间:{tradeData.publishTime ? moment(tradeData.publishTime).format('YY/MM/DD HH:mm:ss') : "-"}</span>
            <span style={{ fontSize: '12px' }}>{" "}截至下单最后修改:{tradeData.finalEditTime && tradeData.finalEditTime !== tradeData.publishTime ? moment(tradeData.finalEditTime).format('YY/MM/DD HH:mm:ss') : "-"}</span>
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
              src={tradeData.tupian ? require(`@/images/goods/${tradeData.tupian}`) : "error"} // Error: Cannot find module './undefined'
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
            <span style={{
              fontSize: '18px',
              verticalAlign: 'top' // 垂直向上对齐
            }}>
              {tradeData.introduction}
            </span>
          </div>
        </div>
      }
    </div>
  )
}
Goods.wrappers = ['@/wrappers/Auth']
export default Goods
