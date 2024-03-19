import React, { useEffect } from 'react';  
import { connect } from 'umi';  
import { Button } from 'antd';  
import { Link } from 'umi';  
  
const FetchUsers = ({ dispatch, users }) => {  
  useEffect(() => {  
    // 组件挂载时获取用户数据  
    dispatch({  
      type: 'users/fetch',  
    });  
  }, [dispatch]);  
  
  return (  
    <div>  
      <h1>Fetch Users</h1>  
      <p>Data fetched and ready to navigate to UserList page.</p>  
      <Link to="/UserList">  
        <Button type="primary">Go to User List</Button>  
      </Link>  
    </div>  
  );  
};  
  
function mapStateToProps({ users }) {  
  return {  
    users,  
  };  
}  
  
export default connect(mapStateToProps)(FetchUsers);