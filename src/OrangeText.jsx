import { useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import AOS from "aos"
import "aos/dist/aos.css"
// fontes globais
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400&display=swap');
`

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  pointer-events: none;  // ← transparente
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6rem;
  z-index: 999;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`

const Left = styled.div`
  pointer-events: auto;  // ← adicione isso
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 240px;
`

const Eyebrow = styled.span`
  pointer-events: auto;  // ← adicione isso
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 600px) {
    align-items: start;
  }
`

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(2.7rem, 8vw, 5rem);
  line-height: 1.0;
  color: #1a1008;

  em {
    font-style: italic;
    color: #c45c00;
  }
`

const Sub = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.6;
  color: #6b5535;
  margin-top: 8px;
  max-width: 200px;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`

const Badge = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(3rem, 5vw, 5rem);
  color: transparent;
  -webkit-text-stroke: 1.5px #c45c00;
  line-height: 1;
  opacity: 0.35;
`

const Tag = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a6a3a;
  border-bottom: 1px solid #c45c0055;
  padding-bottom: 4px;
`

const Divider = styled.div`
  position: absolute;
  left: 50%;
  top: 12%;
  height: 76%;
  width: 1px;
  pointer-events: none;

  @media (max-width: 600px) {
    display: none;
  }
`

export default function OrangeText() {
  const ref = useRef(null)
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    })
  }, [])

  return (
    <>
      <GlobalStyle />

      <Wrapper id='home' ref={ref}>
        <Divider />

        <Left>
          <Eyebrow data-aos="fade-up-right" data-aos-delay="100">
            Citrus sinensis
          </Eyebrow>

          <Title data-aos="fade-up-right" data-aos-delay="200">
            A<br /><em>laranja</em><br />perfeita
          </Title>

          <Sub data-aos="fade-up-right" data-aos-delay="300">
            Colhida no ponto certo.<br />
            Cada detalhe, uma obra da natureza.
          </Sub>
        </Left>

        <Right>
          <Badge data-aos="fade-up-left" data-aos-delay="400">
            № 01
          </Badge>

          <Tag data-aos="fade-up-left" data-aos-delay="500">
            100% natural
          </Tag>
        </Right>
      </Wrapper>
    </>
  )
}