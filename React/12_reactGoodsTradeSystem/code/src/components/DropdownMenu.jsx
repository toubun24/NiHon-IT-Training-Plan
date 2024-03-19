import React from 'react';  
import { connect } from 'umi';  
  
const DropdownMenu = ({ value }) => {  
  return (  
    <div>  
      <h3>Dropdown Menu</h3>  
      <p>Current Value: {value}</p>  
    </div>  
  );  
};  
  
function mapStateToProps({ counter }) {  
  return {  
    value: counter.value, // 从counter模型中获取value  
  };  
}  
  
export default connect(mapStateToProps)(DropdownMenu);