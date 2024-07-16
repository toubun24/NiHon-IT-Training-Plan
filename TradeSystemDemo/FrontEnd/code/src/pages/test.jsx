import React, { useState } from 'react';  
import { Button, InputNumber } from 'antd';  
import { connect } from 'umi';  
import DropdownMenu from '@/components/DropdownMenu'; // 引入自定义下拉菜单组件  
  
const Test = ({ dispatch, counter }) => {  
  const [inputValue, setInputValue] = useState(0);  
  
  const handleInputChange = (value) => {  
    setInputValue(value);  
  };  
  
  const handleIncrement = () => {  
    dispatch({  
      type: 'counter/increment',  
      payload: inputValue, // 使用输入框中的值作为增加量  
    });  
  };  
  
  const handleDecrement = () => {  
    dispatch({  
      type: 'counter/decrement',  
      payload: inputValue, // 使用输入框中的值作为减少量  
    });  
  };  
  
  return (  
    <div>  
      <h1>Main Page</h1>  
      <p>Current Value: {counter.value}</p>  
      <InputNumber value={inputValue} onChange={handleInputChange} min={0} /> {/* 输入框 */}  
      <Button onClick={handleIncrement}>增加</Button> {/* 增加数字的按钮 */}  
      <Button onClick={handleDecrement}>减少</Button> {/* 减少数字的按钮 */}  
      <DropdownMenu /> {/* 引入的下拉菜单组件 */}  
    </div>  
  );  
};  
  
function mapStateToProps({ counter }) {  
  return {  
    counter, // 引入counter模型的状态  
  };  
}  
  
export default connect(mapStateToProps)(Test);