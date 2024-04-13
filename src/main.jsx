import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";

import '@mantine/core/styles.css'
import './styles/global.css'
import theme from './styles/theme.js'
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
)
