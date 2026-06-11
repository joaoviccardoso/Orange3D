import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const Logo = styled.a`
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #c45c00;
  text-decoration: none;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    display: none;
  }
`

const Links = styled.div`
  display: flex;
  gap: 28px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`

const Link = styled.a`
  position: relative;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6b5535;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #533301;
  }

  /* underline animado */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0%;
    height: 1px;
    background: #533301;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`

export default function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <Logo href="#home">Laranja</Logo>

        <Links>
          <Link href="#home">Home</Link>
          <Link href="#sobre">Sobre</Link>
          <Link href="#processo">Processo</Link>
          <Link href="#beneficios">Qualidade</Link>
          <Link href="#contato">Contato</Link>
        </Links>
      </NavContainer>
    </Nav>
  )
}