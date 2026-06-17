"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface VantaFogProps {
  color?: number
  baseColor?: number
  opacity?: number
}

export function VantaFog({ color = 0x9391bd, baseColor = 0xf8f3ec, opacity = 1 }: VantaFogProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      // Vanta requires THREE to be available globally in some setups, but passing it usually works.
      const FOG = require("vanta/dist/vanta.fog.min")
      const effect = (FOG.default || FOG)({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: color,
        midtoneColor: color,
        lowlightColor: color,
        baseColor: baseColor,
        blurFactor: 0.6,
        speed: 1.5,
        zoom: 1.0,
      })
      setVantaEffect(effect)
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.setOptions({
        highlightColor: color,
        midtoneColor: color,
        lowlightColor: color,
        baseColor: baseColor,
      })
    }
  }, [vantaEffect, color, baseColor])

  return (
    <div 
      ref={vantaRef} 
      className="absolute inset-0 pointer-events-none" 
      style={{ zIndex: 0, opacity }} 
    />
  )
}
