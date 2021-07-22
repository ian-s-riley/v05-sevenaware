/*!

=========================================================
* Paper Kit PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-pro-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import store from './app/store';
import { Provider } from 'react-redux';

//amplify authentication
import { Auth, Hub } from 'aws-amplify'

import queryString from 'query-string'

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

// pages
import Error404 from "views/examples/Error404.js";
import SignIn from "authentication/SignIn"
import OwnerSignUp from "authentication/OwnerSignUp"
import VerifySignUp from "authentication/VerifySignUp"
import Landing from "views/Landing.js";
import Opportunity from "views/Opportunity.js";
import Borrower from "views/Borrower.js";

const hist = createBrowserHistory();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [newOwnerToken, setNewOwnerToken] = useState("")


  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
        setIsAuthenticated(true)
       }
       if (payload.event === 'signOut') {
        console.log('a user has signed out!')
        setIsAuthenticated(false)
       }
    })    
  }, [])  

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
        await Auth.currentAuthenticatedUser().then(
        setIsAuthenticated(true))     
      } catch (error) {
          //console.log('checkUser - error signing in:', error)
          setIsAuthenticated(false)
      }               
  }

  return (
    <Provider store={store}>
      <BrowserRouter history={hist}>
        {isAuthenticated ? (
        <Switch>
          <Route path="/borrower" render={(props) => <Borrower {...props} />}/>        
          <Route path="/" render={(props) => <Borrower {...props} />}/>        
        </Switch>
        ) : (
        <Switch>
          <Route path="/landing" render={(props) => <Landing {...props} />} />
          <Route path="/opportunity" render={(props) => <Opportunity {...props} />} />
          <Route path="/signin" render={(props) => <SignIn {...props} />} />
          <Route path="/ownersignup" render={(props) => <OwnerSignUp {...props} />} />
          <Route path="/verify" render={(props) => <VerifySignUp {...props} />} />
          <Route path="/error-404" render={(props) => <Error404 {...props} />} />
          <Route path="/" render={(props) => <Landing {...props} />} />
        </Switch>
        )}  
      </BrowserRouter>
    </Provider>
    
  )
}

export default App;



