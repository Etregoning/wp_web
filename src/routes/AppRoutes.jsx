import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from 'layouts/Dashboard/Dashboard'
import LoginPage from 'views/LoginPage/LoginPage'

class AppRoutes extends React.Component {
  render() {
    return (
      <HashRouter>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <ProtectedRoute path='/' component={Dashboard} />
      </Switch>
      </HashRouter>
    )
  }
}

export default AppRoutes