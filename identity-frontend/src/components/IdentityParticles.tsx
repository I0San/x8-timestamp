import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  type: 'human' | 'agent' | 'verified' | 'link' | 'data'
  opacity: number
  rotation: number
  rotationSpeed: number
  pulsePhase: number
  isOwner: boolean
}

interface Connection {
  from: number
  to: number
  opacity: number
  verified: boolean
  verifyProgress: number
  isAgentLink: boolean
}

export function IdentityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  const goldColor = { r: 219, g: 194, b: 125 }
  const darkColor = { r: 35, g: 31, b: 32 }

  const createParticle = useCallback((width: number, height: number): Particle => {
    const types: Particle['type'][] = ['human', 'human', 'agent', 'agent', 'agent', 'verified', 'link', 'data']
    const type = types[Math.floor(Math.random() * types.length)]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 12 + 10,
      type,
      opacity: Math.random() * 0.5 + 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      isOwner: type === 'human' && Math.random() > 0.5,
    }
  }, [])

  const drawHuman = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    isOwner: boolean
  ) => {
    ctx.beginPath()
    ctx.arc(x, y - size * 0.35, size * 0.35, 0, Math.PI * 2)
    ctx.moveTo(x + size * 0.55, y + size * 0.6)
    ctx.arc(x, y + size * 0.2, size * 0.55, 0, Math.PI, false)
    
    if (isOwner) {
      ctx.moveTo(x - size * 0.7, y - size * 0.7)
      ctx.lineTo(x - size * 0.4, y - size * 0.7)
      ctx.lineTo(x - size * 0.4, y - size * 0.4)
    }
  }, [])

  const drawAgent = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath()
    ctx.roundRect(x - size * 0.5, y - size * 0.6, size, size * 0.8, size * 0.15)
    
    ctx.moveTo(x - size * 0.25, y - size * 0.25)
    ctx.arc(x - size * 0.25, y - size * 0.25, size * 0.08, 0, Math.PI * 2)
    ctx.moveTo(x + size * 0.25, y - size * 0.25)
    ctx.arc(x + size * 0.25, y - size * 0.25, size * 0.08, 0, Math.PI * 2)
    
    ctx.moveTo(x - size * 0.2, y + size * 0.05)
    ctx.lineTo(x + size * 0.2, y + size * 0.05)
    
    ctx.moveTo(x, y - size * 0.6)
    ctx.lineTo(x, y - size * 0.85)
    ctx.moveTo(x - size * 0.1, y - size * 0.85)
    ctx.lineTo(x + size * 0.1, y - size * 0.85)
    
    ctx.moveTo(x - size * 0.5, y)
    ctx.lineTo(x - size * 0.7, y + size * 0.3)
    ctx.moveTo(x + size * 0.5, y)
    ctx.lineTo(x + size * 0.7, y + size * 0.3)
  }, [])

  const drawVerified = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath()
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
    
    ctx.moveTo(x - size * 0.25, y)
    ctx.lineTo(x - size * 0.05, y + size * 0.2)
    ctx.lineTo(x + size * 0.3, y - size * 0.2)
  }, [])

  const drawLink = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    
    ctx.beginPath()
    ctx.arc(-size * 0.25, 0, size * 0.35, Math.PI * 0.5, Math.PI * 1.5)
    ctx.arc(size * 0.25, 0, size * 0.35, Math.PI * 1.5, Math.PI * 0.5)
    
    ctx.moveTo(-size * 0.25, -size * 0.35)
    ctx.lineTo(size * 0.25, -size * 0.35)
    ctx.moveTo(-size * 0.25, size * 0.35)
    ctx.lineTo(size * 0.25, size * 0.35)
    
    ctx.restore()
  }, [])

  const drawData = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    const lineHeight = size * 0.25
    ctx.beginPath()
    for (let i = -1; i <= 1; i++) {
      const width = (Math.abs(i) === 1 ? 0.6 : 0.8) * size
      ctx.moveTo(x - width * 0.5, y + i * lineHeight)
      ctx.lineTo(x + width * 0.5, y + i * lineHeight)
    }
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
      const connectionDistance = 160
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25
            const isHumanToAgent = (particles[i].type === 'human' && particles[j].type === 'agent') ||
                                   (particles[i].type === 'agent' && particles[j].type === 'human')
            const verified = isHumanToAgent || Math.sin(time * 0.4 + i * 0.5 + j * 0.3) > 0.75
            connections.push({
              from: i,
              to: j,
              opacity,
              verified,
              verifyProgress: verified ? Math.min(1, (Math.sin(time * 0.4 + i * 0.5 + j * 0.3) - 0.5) * 2) : 0,
              isAgentLink: isHumanToAgent
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
        
        if (conn.isAgentLink) {
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
          gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 3})`)
          gradient.addColorStop(0.5, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 4})`)
          gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 3})`)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.setLineDash([4, 4])
        } else if (conn.verified) {
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.opacity * 2})`
          ctx.lineWidth = 1
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = `rgba(${darkColor.r}, ${darkColor.g}, ${darkColor.b}, ${conn.opacity * 0.5})`
          ctx.lineWidth = 0.5
          ctx.setLineDash([])
        }
        
        ctx.stroke()
        ctx.setLineDash([])

        if (conn.isAgentLink && conn.verifyProgress > 0) {
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2
          
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${conn.verifyProgress * 0.8})`
          ctx.lineWidth = 2
          drawCheckmark(ctx, midX, midY, 8, conn.verifyProgress)
        }
      })

      particles.forEach(p => {
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.5 + 0.5
        const dynamicOpacity = p.opacity * (0.7 + pulse * 0.3)
        
        ctx.save()
        
        if (p.type === 'human') {
          drawHuman(ctx, p.x, p.y, p.size, p.isOwner)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          
          if (p.isOwner) {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.2)
            gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.15})`)
            gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0)`)
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2)
            ctx.fill()
          }
          
        } else if (p.type === 'agent') {
          drawAgent(ctx, p.x, p.y, p.size)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          
          if (pulse > 0.6) {
            const glowRadius = p.size * 1.3
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)
            gradient.addColorStop(0, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${(pulse - 0.6) * 0.25})`)
            gradient.addColorStop(1, `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0)`)
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
            ctx.fill()
          }
          
        } else if (p.type === 'verified') {
          drawVerified(ctx, p.x, p.y, p.size)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          
          if (pulse > 0.7) {
            ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${(pulse - 0.7) * dynamicOpacity})`
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2)
            ctx.fill()
          }
          
        } else if (p.type === 'link') {
          drawLink(ctx, p.x, p.y, p.size, p.rotation)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.8})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          
        } else if (p.type === 'data') {
          drawData(ctx, p.x, p.y, p.size)
          ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${dynamicOpacity * 0.6})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle, drawHuman, drawAgent, drawVerified, drawLink, drawData, drawCheckmark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  )
}
