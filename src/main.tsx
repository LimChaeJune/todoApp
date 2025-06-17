import React from 'react'
import ReactDOM from 'react-dom/client'
import { worker } from './mocks/browser.ts'
import App from './App.tsx'
import '@/global.css'

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
