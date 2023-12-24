import React from 'react'
import ReactDOM from 'react-dom/client' // import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom' // react-router-dom

// ReactDOM.render(<App></App>,document.getElementById('root'))
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter> {/*BrowserRouter包裹App*/}
        <App />
    </BrowserRouter>
);