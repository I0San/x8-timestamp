import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  type: 'node' | 'hash' | 'shield' | 'block' | 'cross'
  opacity: number
  rotation: number
  rotationSpeed: number
  pulsePhase: number
}

interface Connection {
  from: number
  to: number
  opacity: number
  verified: boolean
  verifyProgress: number
}

export function BlockchainParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  const goldColor = { r: 219, g: 194, b: 125 }
  const darkColor = { r: 35, g: 31, b: 32 }

  const createParticle = useCallback((width: number, height: number): Particle => {
    const types: Particle['type'][] = ['node', 'node', 'hash', 'shield', 'block', 'cross', 'cross']
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 12 + 6,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      pulsePhase: Math.random() * Math.PI * 2,
    }
  }, [])

  const drawHexagon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number
  ) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + rotation
      const px = x + size * Math.cos(angle)
      const py = y + size * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }, [])

  const drawShield = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath()
    ctx.moveTo(x, y - size)
    ctx.lineTo(x + size * 0.8, y - size * 0.5)
    ctx.lineTo(x + size * 0.8, y + size * 0.3)
    ctx.quadraticCurveTo(x, y + size, x, y + size)
    ctx.quadraticCurveTo(x, y + size, x - size * 0.8, y + size * 0.3)
    ctx.lineTo(x - size * 0.8, y - size * 0.5)
    ctx.closePath()
  }, [])

  const drawBlock = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    
    const s = size * 0.7
    ctx.beginPath()
    ctx.rect(-s, -s, s * 2, s * 2)
    ctx.closePath()
    
    ctx.restore()
  }, [])

  const drawSwissCross = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    filled: boolean = false
  ) => {
    const armWidth = size * 0.35
    const armLength = size
    
    ctx.beginPath()
    ctx.moveTo(x - armWidth, y - armLength)
    ctx.lineTo(x + armWidth, y - armLength)
    ctx.lineTo(x + armWidth, y - armWidth)
    ctx.lineTo(x + armLength, y - armWidth)
    ctx.lineTo(x + armLength, y + armWidth)
    ctx.lineTo(x + armWidth, y + armWidth)
    ctx.lineTo(x + armWidth, y + armLength)
    ctx.lineTo(x - armWidth, y + armLength)
    ctx.lineTo(x - armWidth, y + armWidth)
    ctx.lineTo(x - armLength, y + armWidth)
    ctx.lineTo(x - armLength, y - armWidth)
    ctx.lineTo(x - armWidth, y - armWidth)
    ctx.closePath()
    
    if (filled) {
      ctx.fill()
    }
    ctx.stroke()
  }, [])

  const drawCheckmark = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    progress: number
  ) => {
    if (progress <= 0) return
    
    ctx.beginPath()
    ctx.moveTo(x - size * 0.4, y)
    
    if (progress < 0.5) {
      const p = progress * 2
      ctx.lineTo(x - size * 0.4 + size * 0.4 * p, y + size * 0.3 * p)
    } else {
      ctx.lineTo(x, y + size * 0.3)
      const p = (progress - 0.5) * 2
      ctx.lineTo(x + size * 0.5 * p, y + size * 0.3 - size * 0.6 * p)
    }
    
    ctx.stroke()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      const particleCount = Math.floor((rect.width * rect.height) / 12000)
      particlesRef.current = Array.from(
        { length: Math.min(particleCount, 60) },
        () => createParticle(rect.width, rect.height)
      )
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      timeRef.current += 0.016
      const time = timeRef.current

      const particles = particlesRef.current
      
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        
        if (p.x < -20) p.x = rect.width + 20
        if (p.x > rect.width + 20) p.x = -20
        if (p.y < -20) p.y = rect.height + 20
        if (p.y > rect.height + 20) p.y = -20
      })

      const connections: Connection[] = []
      const connectionDistance = 150
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25
            const verified = Math.sin(time * 0.5 + i * 0.7 + j * 0.3) > 0.6
            connections.push({
              from: i,
              to: j,
              opacity,
              verified,
              verifyProgress: verified ? Math.min(1, (Math.sin(time * 0.5 + i * 0.7 + j * 0.3) - 0.6) * 2.5) : 0
            })
          }
        }
      }

      connections.forEach(conn => {
        const p1 = particles[conn.from]
        const p2 = particles[conn.to]
        
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        
        if (conn.verified) {
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
          gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 2})`)
          gradient.addColorStop(0.5, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 3})`)
          gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 2})`)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
        } else {
          ctx.strokeStyle = `rgba(${darkColor.r}, ${darkColor.g}, ${darkColor.b}, ${conn.opacity})`
          ctx.lineWidth = 0.5
        }
        
        ctx.stroke()

        if (conn.verified && conn.verifyProgress > 0) {
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2
          
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.verifyProgress * 0.6})`
          ctx.lineWidth = 1.5
          drawCheckmark(ctx, midX, midY, 6, conn.verifyProgress)
        }
      })

      particles.forEach(p => {
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.5 + 0.5
        const dynamicOpacity = p.opacity * (0.7 + pulse * 0.3)
        
        ctx.save()
        
        if (p.type === 'node') {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
          gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`)
          gradient.addColorStop(0.5, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.5})`)
          gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0)`)
          
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 1.5})`
          ctx.fill()
          
        } else if (p.type === 'hash') {
          drawHexagon(ctx, p.x, p.y, p.size, p.rotation)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
          
          drawHexagon(ctx, p.x, p.y, p.size * 0.5, p.rotation + Math.PI / 6)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.5})`
          ctx.stroke()
          
        } else if (p.type === 'shield') {
          drawShield(ctx, p.x, p.y, p.size)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
          
          if (pulse > 0.7) {
            ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${(pulse - 0.7) * dynamicOpacity * 2})`
            ctx.lineWidth = 1
            drawCheckmark(ctx, p.x, p.y, p.size * 0.4, 1)
          }
          
        } else if (p.type === 'block') {
          drawBlock(ctx, p.x, p.y, p.size, p.rotation)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1
          ctx.stroke()
          
          ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.1})`
          ctx.fill()
          
        } else if (p.type === 'cross') {
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.8})`
          ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.15})`
          ctx.lineWidth = 1.5
          drawSwissCross(ctx, p.x, p.y, p.size, true)
          
          if (pulse > 0.6) {
            const glowSize = p.size * (1 + (pulse - 0.6) * 0.5)
            ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${(pulse - 0.6) * dynamicOpacity * 0.5})`
            ctx.lineWidth = 0.5
            drawSwissCross(ctx, p.x, p.y, glowSize, false)
          }
        }
        
        ctx.restore()
      })

      if (Math.random() < 0.002) {
        const randomParticle = particles[Math.floor(Math.random() * particles.length)]
        if (randomParticle) {
          const ripple = {
            x: randomParticle.x,
            y: randomParticle.y,
            radius: 0,
            maxRadius: 60,
            opacity: 0.3
          }
          
          const animateRipple = () => {
            ripple.radius += 1.5
            ripple.opacity = 0.3 * (1 - ripple.radius / ripple.maxRadius)
            
            if (ripple.radius < ripple.maxRadius && ripple.opacity > 0) {
              ctx.beginPath()
              ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
              ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${ripple.opacity})`
              ctx.lineWidth = 2
              ctx.stroke()
            }
          }
          
          let rippleFrame = 0
          const rippleInterval = setInterval(() => {
            animateRipple()
            rippleFrame++
            if (rippleFrame > 40) clearInterval(rippleInterval)
          }, 16)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle, drawHexagon, drawShield, drawBlock, drawCheckmark, drawSwissCross])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}
