import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './header'
import Body from './body'
import Footer from './footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Header/>
    <Body/>
    <Footer/>
    
  </StrictMode>,
)
