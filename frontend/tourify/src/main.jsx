import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './header'
import Body from './body'
import Footer from './footer'
import App from './App.jsx'
import { Navbar } from './components/navbar.jsx'
import SupabaseProvider from './context/supabase-context.jsx';
import { BrowserRouter } from 'react-router-dom';
import Detail from './components/detail.jsx'
import {routes} from './utils/router.js';
import { Route, Routes } from "react-router-dom";

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <SupabaseProvider>
      <StrictMode>

        <Header />
        <Routes>
            <Route path={routes.home} element={<Body />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        <Footer />

      </StrictMode>,
    </SupabaseProvider>
  </BrowserRouter>
)
