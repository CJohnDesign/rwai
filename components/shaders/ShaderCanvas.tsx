import { Canvas } from '@react-three/fiber'
import { HeroBackground } from './HeroBackground'

interface ShaderCanvasProps {
  className?: string
}

export function ShaderCanvas({ className }: ShaderCanvasProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className || ''}`}>
      <Canvas>
        <HeroBackground />
      </Canvas>
    </div>
  )
} 