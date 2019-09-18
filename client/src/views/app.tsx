import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { User } from '../models/user';
import store, { history } from '../store';
import { Dashboard } from './dashboard';
import LoginPage from './login';
import RegisterPage from './register';

export class App extends React.Component<any, any> {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }: any) => {
      const user: User = JSON.parse(localStorage.getItem('user'));

      return (
        <Route
          {...rest}
          render={props =>
            user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      );
    };

    return (
      <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <Router history={history}>
            <Switch>
              <PrivateRoute path='/dashboard' component={Dashboard as any} />
              <Route path='/login' component={LoginPage as any} />
              <Route path='/register' component={RegisterPage as any} />
              <Redirect from='/' to='/dashboard' />
            </Switch>
          </Router>
        </ConnectedRouter>
      </Provider>
    );
  }
}
