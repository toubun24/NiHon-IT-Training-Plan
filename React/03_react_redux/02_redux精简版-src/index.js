import React from 'react'
import ReactDOM from 'react-dom/client' // react-dom/client
import App from './App'
import store from './redux/store'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
store.subscribe(() => {
    // const container = document.getElementById('root');
    // const root = ReactDOM.createRoot(container);
    // You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it.
    root.render(<App />);
})