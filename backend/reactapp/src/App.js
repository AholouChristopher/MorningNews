import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Navigate} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource  from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';

import wishList from './reducers/article.js';
import token from './reducers/token.js';
import selectLang from './reducers/changeLang.js'
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

//mise en place du store

const store = createStore(combineReducers({wishList, token, selectLang}));



function App(props) {
  const isAuthenticated = true;
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {isAuthenticated ? (
          <>
            <Route path="/" exact component={ScreenHome} />
            <Route path="/screensource" component={ScreenSource} />
            <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource} />
            <Route path="/screenmyarticles" component={ScreenMyArticles} />
          </>
          ) : (              
            <Route
            render={({ location }) =>
            location.pathname !== "/" ? (
              <Redirect to="/" />
            ) : (
              <ScreenHome />
            )
          }
            />

          )}
          
            <Route path="/" exact component={ScreenHome} />
  
          
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
