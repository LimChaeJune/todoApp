import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { worker } from './mocks/browser.ts'
import App from './App.tsx'

worker.start()

const root = ReactDOM.createRoot(document.getElementById('root')!)

worker
  .start({
    quiet: true,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
  .then(() => {
    return root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
