import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/landing/header/header.tsx'
import Footer from './components/landing/footer/footer.tsx'
import Nav from './components/landing/nav/nav.tsx'
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Nav />
      <App />
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
)