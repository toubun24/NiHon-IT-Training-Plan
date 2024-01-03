import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store' // store
import { Provider } from 'mobx-react' // mobx-react

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}> {/* Provider & store */}
        <App />
    </Provider>
)