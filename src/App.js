import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import t from 'prop-types'
import { LinearProgress } from '@material-ui/core'

import { hot } from 'react-hot-loader'

import { HOME, LOGIN, REGISTER } from './routes'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))
const Register = lazy(() => import('pages/register'))

const App = () => {
  const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return localStorage.getItem('token') !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: LOGIN }}
          />
        )
      }}
    />
  )

  const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        return localStorage.getItem('token') === null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: HOME }} />
        )
      }}
    />
  )

  NotAuthenticatedRoute.propTypes = {
    component: t.node
  }

  AuthenticatedRoute.propTypes = {
    component: t.node
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <AuthenticatedRoute exact path={HOME} component={MainPage} />
        <NotAuthenticatedRoute path={LOGIN} component={Login} />
        <NotAuthenticatedRoute path={REGISTER} component={Register} />
        <Route path='/lemons-app' component={MainPage} />
      </Switch>
    </Suspense>
  )
}

export default hot(module)(App)
