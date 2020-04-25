import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import Dashboard from "layouts/Dashboard/Dashboard";
import { HashRouter, Router, Route } from "react-router-dom";

import "assets/css/material-dashboard-react.css";
import LoginPage from "layouts/LoginPage/LoginPage"
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import AppRoutes from 'routes/AppRoutes'
import ProtectedRoute from "./routes/ProtectedRoute";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const hist = createBrowserHistory();

let loggedIn = true

ReactDOM.render(
  <Router history={hist}>
  {/* // <ApolloProvider client={client}> */}
    {/* <HashRouter>
      <Route path="/" render={props => (
        loggedIn ? (
          <Dashboard {...props} />
        ) : (
  
            <Route render={(props) => <LoginPage {...props} />} />
            
      
        )
          )}/>
    </HashRouter> */}
    <AppRoutes />
    </Router>,
  // </ApolloProvider>, 
  document.getElementById("root")
);

