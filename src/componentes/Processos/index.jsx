import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('/pomarDeLaranja.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fdf8f2;

  @media (max-width: 768px) {
    background-image: url('/pomarDeLaranjaCelular.jpg');
  }
`
const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;

  @media (max-width: 600px) {
    justify-content: center;
    align-items: center;
    padding: 0 6vw 8vh;
    gap: 16px;
    z-index: 999;
  }
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 260px;
`
const Eyebrow = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fdf8f2;

`
const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 1.05;
  color: #fdf8f2;
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
  color: #fdf8f2;
  margin-top: 8px;
  max-width: 220px;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 600px) {
    text-align: end;
  }
`
const Badge = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: transparent;
  -webkit-text-stroke: 1.5px #c45c00;
  opacity: 0.3;
`
const Tag = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fdf8f2;
  border-bottom: 1px solid #c45c0055;
  padding-bottom: 4px;
`
const Divider = styled.div`
  position: absolute;
  left: 50%;
  top: 12%;
  height: 76%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, #c45c0030, transparent);
  @media (max-width: 600px) {
    display: none;
  }
`

export default function SectionProcesso() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-reveal]')
    els?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return (
    <Section id="processo">
      <Wrapper ref={ref}>
        <Divider />

        <Left>
          <Eyebrow data-reveal>Do campo à mesa</Eyebrow>

          <Title data-reveal>
            Cada etapa,<br /><em>um cuidado</em>
          </Title>

          <Sub data-reveal>
            Da colheita à seleção, cada fruta passa por um processo
            cuidadoso que preserva frescor, sabor e qualidade.
          </Sub>
        </Left>

        <Right>
          <Badge data-reveal>Etapa 02</Badge>
          <Tag data-reveal>colheita seletiva</Tag>
        </Right>
      </Wrapper>
    </Section>
  )
}