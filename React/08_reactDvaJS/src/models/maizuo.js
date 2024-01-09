// ./src/models/maizuo.js

import { getList } from "../services/maizuo"

export default {
    namespace: 'maizuo', // namespace
    state: {
        isShow: true,
        list: []
    },
    reducers: {
        show(prestate, action) { // routes/Detail.jsx type: 'maizuo/show'
            return { ...prestate, isShow: true } // routes/App.jsx {this.props.isShow && <Tabbar />}
        },
        hide(prestate, action) { // routes/Detail.jsx type: 'maizuo/hide'
            return { ...prestate, isShow: false } // routes/App.jsx {this.props.isShow && <Tabbar />}
        },
        setlist(prestate, { payload }) {
            return { ...prestate, list: payload }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            console.log("INIT")
        }
    },
    effects: {
        *getCinemaList(action, { call, put }) {
            var res = yield call(getList)
            yield put({
                type: 'setlist',
                payload: res.data.data.cinemas
            })
        }
    }
}