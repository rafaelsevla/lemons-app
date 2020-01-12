import React from 'react'
import Routes from './routes'
import { hot } from 'react-hot-loader'

const App = () => (
  <div className='App'>
    <Routes />
  </div>
)

export default hot(module)(App)
