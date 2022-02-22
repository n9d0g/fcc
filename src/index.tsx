import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { App } from './App'

import { PrismicProvider } from '@prismicio/react'
import { client } from './prismic'

const rootElement = document.getElementById('root')

render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <App />
    </PrismicProvider>
  </React.StrictMode>,
  rootElement
)
