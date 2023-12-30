import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux' // provider

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// root.render(<App />);
root.render(<Provider store={store}><App /></Provider>); // provider
/*
store.subscribe(() => {
    root.render(<App />);
})
*/