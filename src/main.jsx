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
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    background-image: repeating-linear-gradient(
      to right,
      transparent,
      transparent 100px,
      rgba(90, 90, 90, 0.08) 101px
    );
  }
`
createRoot(document.getElementById('root')).render( 
    <StrictMode> 
        <GlobalStyle />
        <Navbar/>
        <App />
    </StrictMode> 
)