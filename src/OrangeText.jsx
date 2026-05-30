import { useEffect, useRef } from 'react'

export default function OrangeText() {
  const ref = useRef(null)

  useEffect(() => {
    // staggered fade-in ao montar
    const els = ref.current?.querySelectorAll('[data-reveal]')
    els?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = `opacity 0.7s ease ${i * 0.15 + 0.4}s, transform 0.7s ease ${i * 0.15 + 0.4}s`
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400&display=swap');

        .ot-root {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5vw;
          z-index: 10;
        }

        .ot-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: 240px;
        }

        .ot-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8a6a3a;
        }

        .ot-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2.7rem, 8vw, 5rem);
          line-height: 1.0;
          color: #1a1008;
        }

        .ot-title em {
          font-style: italic;
          color: #c45c00;
        }

        .ot-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: #6b5535;
          margin-top: 8px;
          max-width: 200px;
        }

        .ot-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
        }

        .ot-badge {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(3rem, 5vw, 5rem);
          color: transparent;
          -webkit-text-stroke: 1.5px #c45c00;
          line-height: 1;
          opacity: 0.35;
        }

        .ot-tag {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a6a3a;
          border-bottom: 1px solid #c45c0055;
          padding-bottom: 4px;
        }

        /* linha vertical decorativa */
        .ot-divider {
          position: absolute;
          left: 50%;
          top: 12%;
          height: 76%;
          width: 1px;
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .ot-root {
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            padding: 0 6vw 8vh;
            gap: 16px;
          }
          .ot-right { align-items: flex-start; }
          .ot-divider { display: none; }
        }
      `}</style>

      <div className="ot-root" ref={ref}>
        <div className="ot-divider" />

        <div className="ot-left">
          <span className="ot-eyebrow" data-reveal>Citrus sinensis</span>
          <h1 className="ot-title" data-reveal>
            A<br /><em>laranja</em><br />perfeita
          </h1>
          <p className="ot-sub" data-reveal>
            Colhida no ponto certo.<br />
            Cada detalhe, uma obra da natureza.
          </p>
        </div>

        <div className="ot-right">
          <span className="ot-badge" data-reveal>№ 01</span>
          <span className="ot-tag" data-reveal>100% natural</span>
        </div>
      </div>
    </>
  )
}