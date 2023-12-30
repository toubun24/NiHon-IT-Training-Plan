// index.jsx

import Count from "../../components/Count"; // 重命名
import { connect } from "react-redux"; // 引入connect连接UI组件
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction, createIncrementOddAction } from "../../redux/count_action"; // createIncrementOddAction

function mapStateToProps(state) {
    return { count: state } // .count
}

function mapDispatchToProps(dispatch) {
    return {
        /*
        plus: (data) => {
            dispatch(createIncrementAction(data))
        }
        */
        plus: data => dispatch(createIncrementAction(data)), // 格式这样也可以
        minus: (data) => {
            dispatch(createDecrementAction(data))
        },
        plusOdd: (data, count, i) => { // (data, count, i)
            dispatch(createIncrementOddAction(data, count, i)) // (data, count, i)
        },
        plusAsync: (data, time) => {
            dispatch(createIncrementAsyncAction(data, time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)