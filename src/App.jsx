import AnimatedScene from './AnimatedScene'
import SectionSobre from './componentes/Sobre'
import SectionProcesso from './componentes/Processos'
import OrangeText from './OrangeText'
import SectionBeneficios from './componentes/Beneficios'
import SectionContato from './componentes/Contato'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0rem;
  pointer-events: none;  // ← transparente ao mouse
`

export default function App() {
  return (
    <section style={{
    }}>
      {/* Three.js ocupa o fundo inteiro */}
      <Div>
        <AnimatedScene />
        <OrangeText />
        <SectionSobre/>
        <SectionProcesso/>
        <SectionBeneficios/>
      </Div>
      <SectionContato/>
      {/* Texto flutua por cima, pointer-events: none no root do componente */}
    </section>
  )
}