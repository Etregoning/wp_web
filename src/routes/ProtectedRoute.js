import React from 'react'
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom'
import Dashboard from 'layouts/Dashboard/Dashboard'


class ProtectedRoute extends React.Component {
  constructor(){
    super();
    this.state = {
      authenticated: false
    }
  }

   componentWillMount() {
    const hasToken = localStorage.access_token ? JSON.parse(localStorage.access_token) : null
    if (hasToken !== null) {
      this.setState({
        authenticated: true
      })
    }   
  }
  

  render() {
    const { component: Dashboard, ...props } = this.props
    return (
    
        <Route 
          {...props} 
          render={props => (
            this.state.authenticated ?
              <Dashboard {...props} /> :
              <Redirect to='/login'/>
          )} 
        />

    )
  }
}

export default ProtectedRoute