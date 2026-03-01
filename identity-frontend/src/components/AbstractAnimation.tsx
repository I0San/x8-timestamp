import { useEffect, useRef } from 'react'

interface FlowLine {
  points: { x: number; y: number }[]
  speed: number
  offset: number
  amplitude: number
  frequency: number
  opacity: number
  width: number
}

interface Pulse {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

interface FloatingShape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  type: 'circle' | 'hexagon' | 'diamond'
  opacity: number
  floatOffset: number
  floatSpeed: number
}

export function AbstractAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const flowLinesRef = useRef<FlowLine[]>([])
  const pulsesRef = useRef<Pulse[]>([])
  const shapesRef = useRef<FloatingShape[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const goldColor = { r: 219, g: 194, b: 125 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      initElements(rect.width, rect.height)
    }

    const initElements = (width: number, height: number) => {
      // Flow lines - horizontal waves
      flowLinesRef.current = []
      const lineCount = 8
      for (let i = 0; i < lineCount; i++) {
        const baseY = (height * 0.2) + (height * 0.6 * (i / (lineCount - 1)))
        const points: { x: number; y: number }[] = []
        const pointCount = 50
        
        for (let j = 0; j <= pointCount; j++) {
          points.push({
            x: (width * 0.4) + (width * 0.55 * (j / pointCount)),
            y: baseY
          })
        }
        
        flowLinesRef.current.push({
          points,
          speed: 0.3 + Math.random() * 0.4,
          offset: Math.random() * Math.PI * 2,
          amplitude: 15 + Math.random() * 25,
          frequency: 0.02 + Math.random() * 0.02,
          opacity: 0.08 + Math.random() * 0.12,
          width: 1 + Math.random() * 1.5
        })
      }

      // Floating shapes
      shapesRef.current = []
      const shapeCount = 12
      const types: ('circle' | 'hexagon' | 'diamond')[] = ['circle', 'hexagon', 'diamond']
      
      for (let i = 0; i < shapeCount; i++) {
        shapesRef.current.push({
          x: width * 0.45 + Math.random() * width * 0.5,
          y: height * 0.15 + Math.random() * height * 0.7,
          size: 8 + Math.random() * 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: 0.1 + Math.random() * 0.2,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 0.5
        })
      }

      pulsesRef.current = []
    }

    resize()
    window.addEventListener('resize', resize)

    const createPulse = (width: number, height: number) => {
      pulsesRef.current.push({
        x: width * 0.5 + Math.random() * width * 0.4,
        y: height * 0.2 + Math.random() * height * 0.6,
        radius: 0,
        maxRadius: 80 + Math.random() * 60,
        opacity: 0.15 + Math.random() * 0.1,
        speed: 0.8 + Math.random() * 0.4
      })
    }

    const drawFlowLine = (
      ctx: CanvasRenderingContext2D,
      line: FlowLine,
      time: number
    ) => {
      ctx.beginPath()
      
      const updatedPoints = line.points.map((point) => {
        const wave = Math.sin(
          point.x * line.frequency + time * line.speed + line.offset
        ) * line.amplitude
        return { x: point.x, y: point.y + wave }
      })

      ctx.moveTo(updatedPoints[0].x, updatedPoints[0].y)
      
      for (let i = 1; i < updatedPoints.length - 1; i++) {
        const xc = (updatedPoints[i].x + updatedPoints[i + 1].x) / 2
        const yc = (updatedPoints[i].y + updatedPoints[i + 1].y) / 2
        ctx.quadraticCurveTo(updatedPoints[i].x, updatedPoints[i].y, xc, yc)
      }
      
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${line.opacity})`
      ctx.lineWidth = line.width
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    const drawHexagon = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const drawDiamond = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const angle = rotation + (Math.PI / 2) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const drawShape = (
      ctx: CanvasRenderingContext2D,
      shape: FloatingShape,
      time: number
    ) => {
      const floatY = Math.sin(time * shape.floatSpeed + shape.floatOffset) * 10
      const currentY = shape.y + floatY
      const currentRotation = shape.rotation + time * shape.rotationSpeed
      const pulse = 1 + Math.sin(time * 2 + shape.floatOffset) * 0.1

      ctx.save()

      // Glow
      const glow = ctx.createRadialGradient(
        shape.x, currentY, 0,
        shape.x, currentY, shape.size * 3
      )
      glow.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${shape.opacity * 0.3})`)
      glow.addColorStop(1, 'rgba(219, 194, 125, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(shape.x, currentY, shape.size * 3, 0, Math.PI * 2)
      ctx.fill()

      // Shape
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${shape.opacity})`
      ctx.lineWidth = 1.5
      
      const drawSize = shape.size * pulse

      if (shape.type === 'circle') {
        ctx.beginPath()
        ctx.arc(shape.x, currentY, drawSize, 0, Math.PI * 2)
        ctx.stroke()
        // Inner circle
        ctx.beginPath()
        ctx.arc(shape.x, currentY, drawSize * 0.4, 0, Math.PI * 2)
        ctx.stroke()
      } else if (shape.type === 'hexagon') {
        drawHexagon(ctx, shape.x, currentY, drawSize, currentRotation)
        ctx.stroke()
      } else if (shape.type === 'diamond') {
        drawDiamond(ctx, shape.x, currentY, drawSize, currentRotation)
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawPulse = (
      ctx: CanvasRenderingContext2D,
      pulse: Pulse
    ) => {
      const progress = pulse.radius / pulse.maxRadius
      const currentOpacity = pulse.opacity * (1 - progress)

      ctx.beginPath()
      ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${currentOpacity})`
      ctx.lineWidth = 2 * (1 - progress * 0.5)
      ctx.stroke()
    }

    const drawCentralElement = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number
    ) => {
      const centerX = width * 0.72
      const centerY = height * 0.5
      const baseSize = Math.min(width, height) * 0.12

      // Outer rotating ring
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(time * 0.1)
      
      ctx.beginPath()
      ctx.arc(0, 0, baseSize + 20, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.1)`
      ctx.lineWidth = 1
      ctx.setLineDash([10, 20])
      ctx.stroke()
      ctx.setLineDash([])
      
      ctx.restore()

      // Middle pulsing ring
      const pulseSize = baseSize + 10 + Math.sin(time * 2) * 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.15)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Inner solid circle
      const innerGradient = ctx.createRadialGradient(
        centerX - baseSize * 0.2, centerY - baseSize * 0.2, 0,
        centerX, centerY, baseSize
      )
      innerGradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.25)`)
      innerGradient.addColorStop(0.7, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.1)`)
      innerGradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.05)`)
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseSize, 0, Math.PI * 2)
      ctx.fillStyle = innerGradient
      ctx.fill()
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.4)`
      ctx.lineWidth = 2
      ctx.stroke()

      // Checkmark / verification symbol
      ctx.save()
      ctx.translate(centerX, centerY)
      const checkScale = baseSize * 0.4
      ctx.beginPath()
      ctx.moveTo(-checkScale * 0.5, 0)
      ctx.lineTo(-checkScale * 0.1, checkScale * 0.4)
      ctx.lineTo(checkScale * 0.5, -checkScale * 0.4)
      ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.6)`
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      ctx.restore()

      // Radiating lines
      const lineCount = 8
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + time * 0.05
        const innerRadius = baseSize + 30
        const outerRadius = baseSize + 50 + Math.sin(time * 1.5 + i) * 10
        
        ctx.beginPath()
        ctx.moveTo(
          centerX + Math.cos(angle) * innerRadius,
          centerY + Math.sin(angle) * innerRadius
        )
        ctx.lineTo(
          centerX + Math.cos(angle) * outerRadius,
          centerY + Math.sin(angle) * outerRadius
        )
        ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.15)`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }

    let lastPulseTime = 0

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      timeRef.current += 0.016
      const time = timeRef.current

      // Background gradient overlay on right side
      const bgGradient = ctx.createRadialGradient(
        rect.width * 0.75, rect.height * 0.5, 0,
        rect.width * 0.75, rect.height * 0.5, rect.width * 0.4
      )
      bgGradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.03)`)
      bgGradient.addColorStop(1, 'rgba(219, 194, 125, 0)')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw flow lines
      flowLinesRef.current.forEach(line => {
        drawFlowLine(ctx, line, time)
      })

      // Create pulses periodically
      if (time - lastPulseTime > 2) {
        createPulse(rect.width, rect.height)
        lastPulseTime = time
      }

      // Update and draw pulses
      pulsesRef.current = pulsesRef.current.filter(pulse => {
        pulse.radius += pulse.speed
        if (pulse.radius >= pulse.maxRadius) return false
        drawPulse(ctx, pulse)
        return true
      })

      // Draw floating shapes
      shapesRef.current.forEach(shape => {
        drawShape(ctx, shape, time)
      })

      // Draw central element
      drawCentralElement(ctx, rect.width, rect.height, time)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}
