import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import t from 'prop-types'
import { LinearProgress } from '@material-ui/core'

import { hot } from 'react-hot-loader'

import { HOME, LOGIN } from './routes'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

const App = ({ location }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsUserLoggedIn(true)
    }
    setDidCheckUserIn(true)
  }, [])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route exact path={HOME} component={MainPage} />
        <Route path={LOGIN} component={Login} />
        <Route path='/lemons-app' component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  location: t.object.isRequired
}

export default hot(module)(App)
