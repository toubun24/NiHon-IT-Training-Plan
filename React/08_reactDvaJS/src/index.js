// npm install dva-cli -g
// dva new react-dva
// npm start

import dva from 'dva';
import './index.css';

// 1. Initialize
// const app = dva();
const app = dva({ history: require('history').createBrowserHistory() });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/maizuo').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
