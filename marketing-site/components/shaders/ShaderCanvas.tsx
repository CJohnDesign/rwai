import { Canvas } from '@react-three/fiber'
import { HeroBackground } from './HeroBackground'

interface ShaderCanvasProps {
  className?: string
}

export function ShaderCanvas({ className }: ShaderCanvasProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className || ''}`}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <HeroBackground />
      </Canvas>
    </div>
  )
} 