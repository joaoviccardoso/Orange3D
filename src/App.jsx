import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import gsap from 'gsap'

export default function AnimatedScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const w = mountRef.current.clientWidth
    const h = mountRef.current.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0ede8)

    const camera = new THREE.PerspectiveCamera(100, w / h, 0.1, 1000)
    camera.position.z = 3

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild)
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enableDamping = true

    scene.add(new THREE.AmbientLight(0xffffff, 1))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-3, 2, -3)
    scene.add(fillLight)

    const loader = new GLTFLoader()
    loader.load('/laranja.glb', (gltf) => {
      const model = gltf.scene

      // ── 1. Adiciona e centraliza o modelo ─────────────────────────────────
      scene.add(model)

      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      model.position.sub(center)

      const maxDim = Math.max(size.x, size.y, size.z)

      // ── 2. Calcula maxY e minY em espaço de mundo ─────────────────────────
      let maxY = -Infinity
      let minY = Infinity

      const tempVec = new THREE.Vector3()

      model.traverse((child) => {
        if (!child.isMesh) return

        const geo = child.geometry
        geo.computeBoundingBox()

        const box = geo.boundingBox

        for (let x of [box.min.x, box.max.x]) {
          for (let y of [box.min.y, box.max.y]) {
            for (let z of [box.min.z, box.max.z]) {
              tempVec.set(x, y, z)
              tempVec.applyMatrix4(child.matrixWorld)

              maxY = Math.max(maxY, tempVec.y)
              minY = Math.min(minY, tempVec.y)
            }
          }
        }
      })

      // ── 3. Aplica material com máscara de altura + raio XZ ────────────────
      model.traverse((child) => {
        if (!child.isMesh) return

        const mat = child.material
        mat.aoMap = null
        mat.aoMapIntensity = 0
        mat.roughness = 0.5
        mat.metalness = 0.0
        mat.color.set(0xcc6600)

        mat.onBeforeCompile = (shader) => {
          shader.uniforms.uMaxY          = { value: maxY }
          shader.uniforms.uMinY          = { value: minY }
          shader.uniforms.uColorStem     = { value: new THREE.Color(0x1f3d12) }
          // Limiar de altura — pode baixar sem vazar para as laterais
          shader.uniforms.uStemThreshold = { value: 0.83 }
          // Raio máximo XZ do caule — ajuste conforme o modelo
          shader.uniforms.uStemRadius    = { value: maxDim * 0.12 }

          // Vertex: combina fator de altura com fator de raio XZ
          shader.vertexShader = `
            uniform float uMaxY;
            uniform float uMinY;
            uniform float uStemThreshold;
            uniform float uStemRadius;
            varying float vIsStem;
            ${shader.vertexShader}
          `.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>

            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            float worldY  = worldPos.y;
            float distXZ  = length(worldPos.xz); // distância do eixo central

            float tY = (worldY - uMinY) / (uMaxY - uMinY);

            // Verde só onde está ALTO e PERTO do centro
            float heightFactor = smoothstep(uStemThreshold, 1.0, tY);
            float radiusFactor = 1.0 - smoothstep(0.0, uStemRadius, distXZ);

            vIsStem = heightFactor * radiusFactor;
            `
          )

          // Fragment: mistura cor do caule conforme máscara
          shader.fragmentShader = `
            uniform vec3  uColorStem;
            varying float vIsStem;
            ${shader.fragmentShader}
          `.replace(
            '#include <dithering_fragment>',
            `
            #include <dithering_fragment>
            gl_FragColor.rgb = mix(gl_FragColor.rgb, uColorStem, vIsStem);
            `
          )
        }

        mat.needsUpdate = true
      })

      // ── 4. Ajusta câmera ───────────────────────────────────────────────────
      camera.position.set(0, 0, maxDim * 1.5)
      controls.target.set(0, 0, 0)
      camera.near = maxDim * 0.01
      camera.far  = maxDim * 100
      camera.updateProjectionMatrix()
      controls.update()

      // ── 5. Animações GSAP ──────────────────────────────────────────────────
      model.position.y = -maxDim * 2
      gsap.to(model.position, { y: 0, duration: 1.2, ease: 'bounce.out' })
      gsap.to(model.rotation, { y: Math.PI * 2, duration: 6, ease: 'none', repeat: -1 })
    })

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    />
  )
}