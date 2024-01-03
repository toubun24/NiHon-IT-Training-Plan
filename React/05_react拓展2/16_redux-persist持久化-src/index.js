// npm install react-redux
// npm install @reduxjs/toolkit
// npm install redux-thunk
// npm install @redux-devtools/extension


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import store from './redux/store'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store' // redux-persist // { , persistor }
import { PersistGate } from 'redux-persist/integration/react' // redux-persist

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> {/* redux-persist */}
            <App />
        </PersistGate> {/* redux-persist */}
    </Provider>
);