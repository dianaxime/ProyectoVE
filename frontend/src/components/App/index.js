import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store';

import AuthPage from '../AuthPage';
import HomePage from '../HomePage';
import AuthorizePage from '../AuthorizePage';
import AddWorkshopPage from '../AddWorkshopPage';
import WorkshopsPage from '../WorkshopsPage';
import EditWorkshopPage from '../EditWorkshopPage';
import SelectedWorkshopPage from '../SelectedWorkshopPage';
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
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/authorization" component={AuthorizePage}/>
          <Route exact path="/creartaller" component={AddWorkshopPage} />
          <Route exact path="/talleres" component={WorkshopsPage} />
          <Route exact path="/taller" component={SelectedWorkshopPage} />
          <Route exact path="/editartaller" component={EditWorkshopPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;