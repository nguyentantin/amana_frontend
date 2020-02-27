import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { I18nextProvider } from 'react-i18next'

import 'normalize.css'
import 'toastr/toastr.scss'
import 'antd/dist/antd.css'
import '../src/assets/scss/main.scss'
import { GlobalStyle } from './styles'
import history from './utils/history'
import { configure } from './store'
import i18n from './i18n'
import AppRoutes from './components/Application/AppRoutes'
import route from './routes'

/**
 * Main Application class.
 */
class Application {
  constructor() {
    this.MOUNT_NODE = document.getElementById('root')
  }

  initStore() {
    const initialState = {}

    return configure(initialState, history)
  }

  run() {
    const store = this.initStore()

    render((
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <GlobalStyle/>
            <AppRoutes routes={route}/>
          </ConnectedRouter>
        </Provider>
      </I18nextProvider>
    ), this.MOUNT_NODE)
  }
}

/**
 * Run application.
 */
new Application().run()


