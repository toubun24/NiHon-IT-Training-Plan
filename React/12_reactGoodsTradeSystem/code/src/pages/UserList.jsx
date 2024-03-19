import React, { useEffect } from 'react';  
import { connect } from 'umi';  
  
const UserList = ({ users }) => {  
  useEffect(() => {  
    // 在组件挂载后输出用户数据  
    console.log('Users list after fetch:', users.list);  
  }, [users]);  
  
  return (  
    <div>  
      <h1>User List</h1>  
      <ul>  
        {users.list.map((user, index) => (  
          <li key={index}>{user.name}</li> // 假设每个用户对象都有一个name属性  
        ))}  
      </ul>  
    </div>  
  );  
};  
  
function mapStateToProps({ users }) {  
  return {  
    users,  
  };  
}  
  
export default connect(mapStateToProps)(UserList);