import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Load files
import Home from './pages/Home';
import Signup from './pages/Signup';
import Layout from './pages/Layout';
import Signin from './pages/Signin';

// Private route
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('access_token');
  const decoded = token && jwtDecode(localStorage.getItem('access_token'));

  return (
    <Route
      {...rest}
      render={(props) =>
        decoded ? (
          <Component {...props} {...decoded} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/signup" component={Signup} />

          <Route path="/signin" component={Signin} />

          {/* <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route> */}
          {/* <PrivateRoute path="/">
          <Home />
        </PrivateRoute> */}

          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
