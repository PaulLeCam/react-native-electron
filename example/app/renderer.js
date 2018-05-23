// @flow

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

const root = document.getElementById('app')

const renderApp = () => {
  const App = require('./App').default
  if (root) render(<App />, root)
}

renderApp()

// $FlowFixMe: missing module.hot definition
if (module && module.hot != null && typeof module.hot.accept === 'function') {
  module.hot.accept(['./App'], () =>
    setImmediate(() => {
      unmountComponentAtNode(root)
      renderApp()
    }),
  )
}
