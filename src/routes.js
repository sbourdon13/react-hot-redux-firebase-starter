import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AdminPage from './components/admin/AdminPage';
import ProtectedPage from './components/protected/ProtectedPage';
import ChatXPage from './components/chatX/ChatXPage'; //eslint-disable-line import/no-named-as-default
import AboutPage from './components/about/AboutPage';
import LoginPage from './components/login/LoginPage'; //eslint-disable-line import/no-named-as-default
import RegistrationPage from './components/registration/RegistrationPage'; //eslint-disable-line import/no-named-as-default
import {requireAdmin} from './actions/authActions';
import {clearChatX} from './actions/chatXActions';


export default function Routes(store) {


  const checkAdmin = (nextState, replace, callback) => {
    store.dispatch(requireAdmin(nextState, replace, callback));
  };

  const clearChatXState = (previousState) => {
    store.dispatch(clearChatX());
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path="layout" component={Layout}/>
      <Route path="about" component={AboutPage}/>
      <Route path="protected" component={ProtectedPage}/>
      <Route path="chatX" component={ChatXPage} onLeave={clearChatXState}/>
      <Route path="admin" component={AdminPage} onEnter={checkAdmin}/>
      <Route path="register" component={RegistrationPage}/>
      <Route path="login" component={LoginPage}/>
    </Route>
  );
}
