import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import MainPage from './pages/MainPage/MainPage';
import '../scss/style.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import { LastLocationProvider } from 'react-router-last-location';
import history from './history';
import configureStore from './redux/configureStore';
import LoginForm from './pages/Auth/LoginForm';

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LastLocationProvider>
        <Switch>
          <Route exact path="/login" name="LoginForm" component={LoginForm} />
          <Route path={'/'} name="Home" component={MainPage} />
        </Switch>
      </LastLocationProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
