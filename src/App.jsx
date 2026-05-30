import AnimatedScene from './AnimatedScene'
import OrangeText from './OrangeText'

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Three.js ocupa o fundo inteiro */}
      <AnimatedScene />

      {/* Texto flutua por cima, pointer-events: none no root do componente */}
      <OrangeText />
    </div>
  )
}