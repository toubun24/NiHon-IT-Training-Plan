/*
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
*/

import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import App from './routes/App'
import Film from "./routes/Film";
import Cinema from "./routes/Cinema";
import Center from "./routes/Center";
import Detail from "./routes/Detail";
import Login from "./routes/Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* V5版本的原因，使用Switch */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" render={() =>
          <App>
            <Switch>
              <Route path="/film" component={Film} />
              <Route path="/cinema" component={Cinema} />
              <Route path="/center" render={() =>
                localStorage.getItem('token') ? <Center /> : <Redirect to='/login' />
              } />
              <Route path="/detail/:id" component={Detail} />
              <Redirect from='/' to='/film' />
            </Switch>
          </App>
        } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
