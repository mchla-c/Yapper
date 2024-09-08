import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/navbar.jsx'
import Palette, { theme } from './components/palette.jsx'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client ={queryClient}>
          <AuthContextProvider>
				    <SocketContextProvider>
              <App />
          </SocketContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
