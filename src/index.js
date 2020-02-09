import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import { Provider } from 'react-redux'
import App from './App'
import { store, persistor } from 'store'
import { PersistGate } from 'redux-persist/integration/react'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const GlobalStyle = createGlobalStyle`
  #root {
    display:flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />

          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
