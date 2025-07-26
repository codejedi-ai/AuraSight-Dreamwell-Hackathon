"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import NET from "vanta/dist/vanta.net.min" // Import the NET effect

export default function VantaNetBackground() {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x1a0033, // Dark purple background
          color: 0x8a2be2, // Purple color for the net
          points: 10.0, // Number of points in the net
          maxDistance: 20.0, // Max distance for lines between points
          spacing: 15.0, // Spacing between points
        }),
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="absolute inset-0 z-0" />
}
