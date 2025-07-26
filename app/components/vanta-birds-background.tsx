"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

export default function VantaBirdsBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current) return

    const loadVanta = async () => {
      // Load Three.js
      if (!window.THREE) {
        const threeScript = document.createElement("script")
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        document.head.appendChild(threeScript)

        await new Promise((resolve) => {
          threeScript.onload = resolve
        })
      }

      // Load Vanta Birds
      if (!window.VANTA) {
        const vantaScript = document.createElement("script")
        vantaScript.src = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"
        document.head.appendChild(vantaScript)

        await new Promise((resolve) => {
          vantaScript.onload = resolve
        })
      }

      // Initialize Vanta effect
      if (window.VANTA && window.THREE && vantaRef.current) {
        vantaEffect.current = window.VANTA.BIRDS({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x1a1a2e, // Dark purple background
          color1: 0x8b5cf6, // Purple birds
          color2: 0x6366f1, // Indigo birds
          wingSpan: 20.0,
          speedLimit: 5.0,
          separation: 50.0,
          alignment: 40.0,
          cohesion: 30.0,
        })
      }
    }

    loadVanta()

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
      }
    }
  }, [])

  return <div ref={vantaRef} className="fixed inset-0 w-full h-full" style={{ zIndex: -2 }} />
}
