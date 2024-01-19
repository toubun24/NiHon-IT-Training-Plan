// npm install echarts // https://echarts.apache.org/

import { useState, useEffect, useRef } from 'react';
import { Card, Col, Row, Avatar, Divider, List, Typography, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as echarts from 'echarts'; // echarts
import _ from 'lodash' // lodash

const { Meta } = Card;

const Home = () => {
  const [viewList, SetViewList] = useState([])
  const [starList, SetStarList] = useState([])
  const [drawerState, setDrawerState] = useState(false)
  const barRef = useRef() // ref
  const pieRef = useRef() // ref
  const [dataList, SetDataList] = useState([]) // pie chart data
  const [initState, setInitState] = useState(null) // 重复点击又退出饼图时: [ECharts] There is a chart instance already initialized on the dom.

  useEffect(() => {
    axios.get('http://localhost:5000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(
      res => {
        SetViewList(res.data)
      }
    )
  }, [])
  useEffect(() => { // 各写一个useEffect
    axios.get('http://localhost:5000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(
      res => {
        SetStarList(res.data)
      }
    )
  }, [])
  useEffect(() => {
    axios.get('http://localhost:5000/news?publishState=2&_expand=category').then(
      res => {
        // echart(res.data)
        SetDataList(res.data) // pie chart data
        echart(_.groupBy(res.data, item => item.category.title))
      }
    )
    return () => { window.onresize = null } // 性能优化，在其他页面时不再调用
  }, [])
  const tokenContent = localStorage.getItem('token');
  const { username, region, role: { roleName } } = tokenContent == '' ? { username: '', region: '', role: { roleName: '' } } : JSON.parse(tokenContent) // JSON.parse
  const echart = (resData) => { // = () =>
    // var myChart = echarts.init(document.getElementById('main'));
    var myChart = echarts.init(barRef.current); // ref
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(resData), // keys
        axisLabel: {
          rotate: 45,
          interval: 0 // 标签全部显示
        }
      },
      yAxis: {
        minInterval: 1 // 最小间隔
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(resData).map(item => item.length) // values
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      // console.log('1')
      myChart.resize() // 随窗口大小动态调整图表大小 // 哪怕在其他组件调整窗口大小也会调用该函数
    }
  }
  const echartPie = () => {
    // var chartDom = document.getElementById('main');
    // var chartDom = echarts.init(pieRef.current) // pieRef // TypeError: this.dom.getContext is not a function
    const dataList2 = dataList.filter(item => item.author === username)
    const groupObj = _.groupBy(dataList2, item => item.category.title)
    const renderList = []
    for (var i in groupObj) {
      renderList.push({
        value: groupObj[i].length,
        name: i
      })
    }
    // var myChart = echarts.init(pieRef.current);
    var myChart;
    if (!initState) { // 重复点击又退出饼图时: [ECharts] There is a chart instance already initialized on the dom.
      myChart = echarts.init(pieRef.current);
      setInitState(myChart);
    } else {
      myChart = initState; // 不再重复初始化
    }
    var option;
    option = {
      title: {
        text: '用户新闻分类图示',
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: renderList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="最常浏览" bordered={false}>
            <List
              size="small"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              // bordered
              dataSource={viewList}
              renderItem={(item) => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="点赞最多" bordered={false}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => <List.Item><a href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            // style={{ width: 300, }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => { // 重复点击又退出饼图时: [ECharts] There is a chart instance already initialized on the dom.
                setTimeout(() => { // Uncaught Error: Initialize failed: invalid dom // React异步渲染+异步0函数=>同步
                  setDrawerState(true)
                  echartPie()
                }, 0)
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} // 随机获取一个头像
              title={username} // {}
              description={
                <div>
                  <span>{region ? region : '全球'}</span>
                  <span style={{ paddingLeft: '2vh' }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="个人新闻分类" onClose={() => { setDrawerState(false) }} open={drawerState}>
        <div id="main" style={{ width: '100dvh', height: '400px', marginTop: '30px' }} ref={pieRef}></div>
      </Drawer>
      <div id="main" style={{ width: '100dvh', height: '400px', marginTop: '30px' }} ref={barRef}></div>
    </div>
  )
}
Home.wrappers = ['@/wrappers/Auth'] // 如果不是通过localhost8000而是直接通过后缀名访问的话可能也会涉及权限判断 // home.
export default Home;