# Week 11 Report

## 学习内容及时长

* **2024.02.26 月曜日:** 6h30min
  * reactGTS-管理员发布审核页 16:40-19:05
  * reactGTS-推荐搜索页 20:05-20:50 23:10-02:30

* **2024.02.27 火曜日:** 
  * reactGTS-推荐搜索页 16:40-16:50 17:10-17:30
  * reactGTS-商品详情页 17:30-17:35 17:45-19:45

* **2023.02.28 水曜日:** 
  * reactGTS-商品详情页 11:20-12:40

* **2023.02.29 木曜日:** 
  * reactGTS-商品详情页 11:15-11:30 11:45-12:00 18:20-19:10 23:05-01:15

* **2023.03.01 金曜日:** 
  * reactGTS-商品详情页 00:50-01:25

* **2023.03.02 土曜日:** 
  * reactGTS-商品详情页 13:45-14:10
  * reactGTS-标签分类页 14:10-14:25 17:00-18:25
  * reactGTS-推荐搜索页 18:45-19:30

* **2023.03.03 日曜日:** 
  * reactGTS-推荐搜索页 11:10-11:35
  * reactGTS-个人主页 11:35-12:40 16:50-18:45 21:10-22:10
  * reactGTS-商品详情页 

## 内容拓展


## 遇见问题
### 【已解决】表单提交tags字符串数组axios批量条件判断存储异步问题
* 一开始没意识到其中的异步返回问题，所以基本写法框架为
```JavaScript
const uniqueTag = Array.from(new Set(values.biaoqian.split('#'))) // 唯一化tagSet
uniqueTag.map((item) => {
  return axios.get(`http://localhost:5000/tags?tagName=${item}`)
}).then(
  res => {
    // res.data.find(item2 => item2.tagName == item1) ?
    res.data && res.data.length > 0 ?
      (
        tagIdList.push(res.data[0].id), // (,)
        axios.patch(`http://localhost:5000/tags/${res.data[0].id}`, { // /num
          tagNum: res.data[0].tagNum + 1 // res.data.
        })
        // setTagIdList(...tagIdList, res.data[0].id)
      ) : (
        axios.post('http://localhost:5000/tags', { // 新tag
          "tagName": item,
          "tagNum": 1, // 0=>1
        }).then(axios.get(`http://localhost:5000/tags?tagName=${item}`).then(
          res2 => {
            tagIdList.push(res2.data[0].id)
            // setTagIdList(...tagIdList, res2.data[0].id)
            console.log(`http://localhost:5000/tags?tagName=${item}`, tagIdList, res2.data[0].id)
          }
        ))
      )
  }
)
axios.post('http://localhost:5000/goods', {
  "userId": myContent.id,
  "state": finishState, // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架
  "publishTime": Date.now(),
  "introduction": values.jianjie,
  "yuanjia": values.yuanjia,
  "shoujia": values.shoujia,
  "dizhi": values.dizhi,
  "fahuofangshi": values.fahuo.fangshi ? values.fahuo.fangshi : 'baoyou',
  "youfei": values.fahuo.fangshi === 'zishe' ? values.fahuo.youfei : 0,
  "tupian": values.tupian[0].name, // values.tupian.file.name
  "editTime": Date.now(),
  "starList": [],
  "view": 0,
  "tagList": tagIdList // !!!
})
```
导致`tagIdList`在后续的`axios.post`提交完整表单时`"tagList": tagIdList`赋值为空
* 后来看了网上说的`axios.all`和`axios.spread`处理这种数组形式查取问题，但后面的`?(axios):(axios)`还是没处理好异步，写法结构已经有点混乱了，最后参考文心一言和[【异步编程: 一次性搞懂 Promise, async, await (#js #javascript)】](https://www.bilibili.com/video/BV1WP4y187Tu/?share_source=copy_web&vd_source=c0cb9c53309c08e9e2bab915aff47d4f)，重新整理的代码，成功实现tags功能
```JavaScript
const onFinish = async (values) => { // async
  const tagIdList = []
  if (values.yuanjia < 0 || values.shoujia <= 0 || values.fahuo.fangshi === "zishe" && values.fahuo.youfei <= 0) {
    message.error('请输入正确的价格')
    return
  }
  const uniqueTag = Array.from(new Set(values.biaoqian.split('#'))) // 唯一化tagSet
  for (let item of uniqueTag) {
    const res = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
    if (res.data && res.data.length > 0) {
      await axios.patch(`http://localhost:5000/tags/${res.data[0].id}`, { tagNum: res.data[0].tagNum + 1 })  // /num // res.data.
      tagIdList.push(res.data[0].id)
    } else {
      await axios.post('http://localhost:5000/tags', { "tagName": item, "tagNum": 1, }) // 新tag // 0=>1
      const res2 = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
      tagIdList.push(res2.data[0].id)
      console.log(`http://localhost:5000/tags?tagName=${item}`, tagIdList, res2.data[0].id)
    }
  }
  await axios.post('http://localhost:5000/goods', {
    "userId": myContent.id,
    "state": finishState, // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架
    "publishTime": Date.now(),
    "introduction": values.jianjie,
    "yuanjia": values.yuanjia,
    "shoujia": values.shoujia,
    "dizhi": values.dizhi,
    "fahuofangshi": values.fahuo.fangshi ? values.fahuo.fangshi : 'baoyou',
    "youfei": values.fahuo.fangshi === 'zishe' ? values.fahuo.youfei : 0,
    "tupian": values.tupian[0].name, // values.tupian.file.name
    "editTime": Date.now(),
    "starList": [],
    "view": 0,
    "tagList": tagIdList
  })
  console.log("final2", tagIdList)
  history.push(finishState === 0 ? '/published/draft' : '/published/publishing')
  notification.open({
    message: `${finishState === 0 ? '暂存' : '发布'}成功`,
    description:
      `请到${finishState === 0 ? '草稿箱' : '发布页'}查看`,
    // onClick: () => { console.log('Notification Clicked!'); },
    duration: 2,
    placement: "bottomRight"
  });
}
```
### 【已解决】QRCode组件丢失 Failed to compile: Module not found: Can't resolve 'antd/es/q-r-code' in 'G:\NiHon-IT-Training-Plan\React\12_reactGoodsTradeSystem\code\src\components'
* 和之前丢失theme的情况很像，所以稍微查了下没有合适解答之后就直接去找到文件夹位置，发现有个`antd/es/qr-code`文件夹，于是将其修改为`antd/es/q-r-code`即可

### 【已解决】主页展示注册天数 Warning: Received NaN for the `children` attribute. If this is expected, cast the value to a string
```JavaScript
const items = [
  // ...
  {
    key: '3',
    label: '注册天数',
    children: (<div>{Math.floor(((new Date().setHours(0, 0, 0, 0))-(new Date(information.registerTime).setHours(0, 0, 0, 0))) / (1000 * 60 * 60 * 24))}</div>),
  },
  // ...
];
```
其实这一段计算我一开始是写在useEffect里的
```JavaScript
const [information, setInformation] = useState([]);
const [viewData, setViewData] = useState([]); // 总浏览量
const [dayData,setDayData] = useState() // 注册天数
useEffect(() => {
    const tokenContent = localStorage.getItem('token')
    tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    //console.log(tokenContent);
    axios.get(`http://localhost:5000/goods?userId=${information.id}`).then(
      res => {
        setGoodsData(res.data)
        const totalViews = res.data.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.view; // 对view项求和
        }, 0)
        setViewData(totalViews)
      }
    )
    // 下面的部分!
    const nowTime = new Date()
    const nowDay=nowTime.setHours(0, 0, 0, 0)
    const registerTime=new Date(information.registerTime)
    const registerDay=registerTime.setHours(0, 0, 0, 0)
    const differenceInDays=Math.floor((nowDay-registerDay) / (1000 * 60 * 60 * 24))
    console.log(differenceInDays)
    setDayData(differenceInDays)
  }, [])
```
* 后来想到，不该把token视作state来放进useEffect随意调用修改，而应只将其作为获取基本信息的方式放到开头的const部分即可，因此调整代码后成功实现
```JavaScript
const [viewData, setViewData] = useState([]); // 总浏览量
const [dayData, setDayData] = useState() // 注册天数
const tokenContent = localStorage.getItem('token')
const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  useEffect(() => {
    // const tokenContent = localStorage.getItem('token')
    // tokenContent == '' ? setInformation('') : setInformation(JSON.parse(tokenContent))
    // console.log(tokenContent);
    // console.log(myContent)
    axios.get(`http://localhost:5000/goods?userId=${myContent.id}`).then( // 按发布时间降序 // desc // state_ne
      res => {
        setGoodsData(res.data)
        const totalViews = res.data.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.view; // 对view项求和
        }, 0)
        setViewData(totalViews)
      }
    )
    const nowTime = new Date()
    const nowDay = nowTime.setHours(0, 0, 0, 0)
    const registerTime = new Date(myContent.registerTime)
    const registerDay = registerTime.setHours(0, 0, 0, 0)
    const differenceInDays = Math.floor((nowDay - registerDay) / (1000 * 60 * 60 * 24))
    // console.log(differenceInDays)
    setDayData(differenceInDays)
  }, [])
  const items = [
  // ...
  {
    key: '3',
    label: '注册天数',
    children: dayData
  },
  // ...
];
```