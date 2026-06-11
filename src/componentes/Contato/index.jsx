import { useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 1rem;
  border-radius: 12px;
  border: solid #c45c00 2px;

  @media (max-width: 600px) {
    margin: 1rem;
  }
`

const Eyebrow = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #8a6a3a;
`

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 7vw, 3.5rem);
  line-height: 1.05;
  color: #1a1008;
  margin: 0;
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
  margin: 0;
  max-width: 320px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 12px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8a6a3a;
`

const inputStyles = `
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #1a1008;
  background: transparent;
  border: none;
  border-bottom: 1px solid #c45c0055;
  padding: 8px 2px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #b8a98c;
  }

  &:focus {
    border-bottom-color: #c45c00;
  }
`

const Input = styled.input`
  ${inputStyles}
`

const TextArea = styled.textarea`
  ${inputStyles}
  resize: none;
  min-height: 100px;
  font-family: 'DM Sans', sans-serif;
`

const SubmitButton = styled.button`
  align-self: flex-start;
  margin-top: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fdf8f2;
  background: #c45c00;
  border: none;
  padding: 14px 32px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #a64c00;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const FeedbackMessage = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: ${props => (props.error ? '#b3261e' : '#5a8a3a')};
  margin: 0;
`

export default function SectionContato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Substitua pela sua chamada real à API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Dados enviados:', form)

      setStatus('success')
      setForm({ nome: '', email: '', mensagem: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <Section id="contato">
      <Wrapper>
        <Eyebrow>Fale conosco</Eyebrow>
        <Title>
          Entre em<br /><em>contato</em>
        </Title>
        <Sub>
          Tem alguma dúvida, sugestão ou quer fazer um pedido?
          Preencha o formulário abaixo.
        </Sub>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="nome">Nome</Label>
            <Input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="mensagem">Mensagem</Label>
            <TextArea
              id="mensagem"
              name="mensagem"
              placeholder="Escreva sua mensagem..."
              value={form.mensagem}
              onChange={handleChange}
              required
            />
          </Field>

          <SubmitButton type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar'}
          </SubmitButton>

          {status === 'success' && (
            <FeedbackMessage>Mensagem enviada com sucesso!</FeedbackMessage>
          )}
          {status === 'error' && (
            <FeedbackMessage error>Algo deu errado. Tente novamente.</FeedbackMessage>
          )}
        </Form>
      </Wrapper>
    </Section>
  )
}