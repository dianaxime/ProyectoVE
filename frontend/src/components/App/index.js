import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store';

import AuthPage from '../AuthPage';
import HomePage from '../HomePage';
import Authorization from '../Authorization';
import TokenRefresh from '../TokenRefresh';

import 'fontsource-roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TokenRefresh reviewTime={300000} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/authorization" component={Authorization} />
          <Route exact path="/auth" component={AuthPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;