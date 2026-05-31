import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client' 
import App from './App' 
import { createGlobalStyle } from 'styled-components'
import Navbar from './componentes/Nav'

const GlobalStyle = createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: #f0ede8;
    font-family: sans-serif;
  }
`
createRoot(document.getElementById('root')).render( 
    <StrictMode> 
        <GlobalStyle />
        <Navbar/>
        <App />
    </StrictMode> 
)