import AnimatedScene from './AnimatedScene'
import SectionSobre from './componentes/Sobre'
import OrangeText from './OrangeText'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10rem;
  pointer-events: none;  // ← transparente ao mouse
`

export default function App() {
  return (
    <section style={{
    }}>
      {/* Three.js ocupa o fundo inteiro */}
      <AnimatedScene />
      <Div>
        <OrangeText />
        <SectionSobre/>
      </Div>
      {/* Texto flutua por cima, pointer-events: none no root do componente */}
    </section>
  )
}