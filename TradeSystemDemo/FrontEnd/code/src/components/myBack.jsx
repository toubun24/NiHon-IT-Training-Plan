import { useHistory } from 'umi';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const MyBack = () => {
  const history = useHistory();
  const handleGoBackButtonClick = () => {
    history.goBack();
  }
  return (
    <Button
      onClick={() => handleGoBackButtonClick()}
      shape="circle"
      style={{marginRight:"10px"}}
    >
      <LeftOutlined />
    </Button>
  )
}
export default MyBack