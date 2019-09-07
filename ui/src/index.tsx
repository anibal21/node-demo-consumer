import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'

import myTheme from './config/styles/theme'
import store from './store/store'

import Layout from './common/hoc/Layout/Layout'

const app = (
    <ThemeProvider theme={myTheme}>
        <Provider store={store}>
            <Layout />
        </Provider>
    </ThemeProvider>
)

render(app, document.getElementById('root') as HTMLElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
