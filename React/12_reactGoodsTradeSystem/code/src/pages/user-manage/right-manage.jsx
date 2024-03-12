import React, { useState } from 'react';  
import { Table, Dropdown, Menu, Select } from 'antd';  
import { DownOutlined } from '@ant-design/icons';  
  
const { Option } = Select;  
  
const dataSource = [  
  {  
    key: '1',  
    name: 'Item 1',  
    state: 1,  
  },  
  {  
    key: '2',  
    name: 'Item 2',  
    state: 2,  
  },  
  {  
    key: '3',  
    name: 'Item 3',  
    state: 1,  
  },  
  {  
    key: '4',  
    name: 'Item 4',  
    state: 3,  
  },  
  // ...更多数据  
];  
  
const columns = [  
  {  
    title: 'Name',  
    dataIndex: 'name',  
    key: 'name',  
  },  
  // ...其他列  
];  
  
const RightManage = () => {  
  const [selectedValue, setSelectedValue] = useState('all'); // 默认显示全部  
  
  const handleSelectChange = (value) => {  
    setSelectedValue(value);  
    // 这里可以添加逻辑来根据选择的值过滤表格数据  
  };  
  
  const filteredDataSource = () => {  
    if (selectedValue === 'all') {  
      return dataSource;  
    }  
    return dataSource.filter((item) => item.state === parseInt(selectedValue, 10));  
  };  
  
  const menuItems = (  
    <Menu>  
      <Menu.Item key="all" onClick={() => setSelectedValue('all')}>  
        全部  
      </Menu.Item>  
      <Menu.Item key="1" onClick={() => setSelectedValue('1')}>  
        1  
      </Menu.Item>  
      <Menu.Item key="2" onClick={() => setSelectedValue('2')}>  
        2  
      </Menu.Item>  
      <Menu.Item key="3" onClick={() => setSelectedValue('3')}>  
        3  
      </Menu.Item>  
    </Menu>  
  );  
  const items = [
    {
      key: '1',
      label: (
        <a key="all" onClick={() => setSelectedValue('all')}>  
        全部  
      </a>  
      ),
    },
    {
      key: '2',
      label: (
        <a key="all" onClick={() => setSelectedValue('1')}>  
        1 
      </a>  
      ),
    },
    {
      key: '3',
      label: (
        <a key="all" onClick={() => setSelectedValue('2')}>  
        2  
      </a>  
      ),
    },
    {
      key: '4',
      label: (
        <a key="all" onClick={() => setSelectedValue('3')}>  
        3 
      </a>  
      ),
    },
  ];
  
  return (  
    <div>  
      <Dropdown menu={{items}} >  
        <Select  
          defaultValue="all"  
          style={{ width: 120 }}  
          onChange={handleSelectChange}  
          dropdownRender={(menu) => menu}  
        >  
          <Option value="all">全部</Option>  
          <Option value="1">1</Option>  
          <Option value="2">2</Option>  
          <Option value="3">3</Option>  
        </Select>  
      </Dropdown>  
      <Table dataSource={filteredDataSource()} columns={columns} />  
    </div>  
  );  
};  
  
export default RightManage;