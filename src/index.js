import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Load files
import './assets/styles/main.scss';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Layout from './pages/Layout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>

        {/* <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route> */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
