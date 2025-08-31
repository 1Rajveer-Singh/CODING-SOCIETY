import React, { useState } from "react";

/**
 * Simple Professional Login Component
 * Clean, responsive login page for Professional Coding Society
 */

const DemoAiLines = [
  "◯ NEURAL-NET: Quantum entanglement protocols initialized...",
  "◯ AEGIS-AI: Biometric scanners online • Security matrix active",
  "◯ SYSTEM: Holographic interface calibrated • Ready for deployment",
  "◯ AEGIS-AI: Anomaly detection running • Threat level: MINIMAL",
  "◯ NEURAL-NET: Data streams synchronized • Processing 2.4TB/sec",
  "◯ AEGIS-AI: Would you like tactical briefing on recent operations?",
];

export default function UltraProGamingAiLogin() {
  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AI assistant state
  const [aiLines, setAiLines] = useState(["◯ AEGIS-AI: Neural systems online • Standing by..."]);
  const [typing, setTyping] = useState(false);
  const [dataFlowActive, setDataFlowActive] = useState(true);
  const [aiPulse, setAiPulse] = useState(0);

  // Canvas references for multiple effects
  const particlesCanvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const neuralCanvasRef = useRef(null);
  const animRef = useRef(null);
  const matrixAnimRef = useRef(null);
  const neuralAnimRef = useRef(null);

  // Mouse tracking for 3D effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for parallax effects
  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // AI pulse effect - reduced frequency to minimize warnings
  useEffect(() => {
    const interval = setInterval(() => {
      setAiPulse(p => (p + 0.05) % (Math.PI * 2));
    }, 100); // Reduced from 50ms to 100ms
    return () => clearInterval(interval);
  }, []);

  // Enhanced particle system
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    // More advanced particles with different types
    const particles = Array.from({ length: Math.max(15, Math.round(w * h / 50000)) }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 1000,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: Math.random() * 2 + 0.5,
      color: Math.random() > 0.7 ? COLORS.cyan : 
             Math.random() > 0.5 ? COLORS.neonBlue : 
             Math.random() > 0.3 ? COLORS.neonGreen : COLORS.magenta,
      alpha: Math.random() * 0.8 + 0.1,
      type: Math.random() > 0.8 ? 'energy' : 'normal',
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      // Check if canvas still exists before drawing
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(0,8,20,0.05)';
      ctx.fillRect(0, 0, w, h);
      
      particles.forEach((p) => {
        // 3D movement
        p.x += p.vx;
        p.y += p.vy;
        p.z -= p.vz;
        p.pulse += 0.05;

        // Reset particles that moved too far
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Calculate 3D perspective
        const perspective = 500;
        const projectedX = p.x + (p.x - w/2) * (perspective / p.z) * 0.1;
        const projectedY = p.y + (p.y - h/2) * (perspective / p.z) * 0.1;
        const size = p.r * (perspective / p.z) * 0.5;
        const alpha = p.alpha * (perspective / p.z) * 0.3;

        ctx.beginPath();
        if (p.type === 'energy') {
          // Energy particles with pulsing effect - ensure positive radius
          const pulseSizeRaw = size + Math.sin(p.pulse) * 2;
          const pulseSize = Math.max(1, pulseSizeRaw); // Minimum 1px radius
          const gradient = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, pulseSize);
          gradient.addColorStop(0, hexToRgba(p.color, alpha));
          gradient.addColorStop(1, hexToRgba(p.color, 0));
          ctx.fillStyle = gradient;
          ctx.arc(projectedX, projectedY, pulseSize, 0, Math.PI * 2);
        } else {
          const safeSize = Math.max(1, size); // Ensure positive radius
          ctx.fillStyle = hexToRgba(p.color, alpha);
          ctx.arc(projectedX, projectedY, safeSize, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      // Neural network connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const d3 = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (d3 < 150) {
            const alpha = (1 - d3/150) * 0.3;
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, hexToRgba(a.color, alpha));
            gradient.addColorStop(1, hexToRgba(b.color, alpha));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Only continue animation if component is still mounted
      if (animRef.current !== null) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };

    window.addEventListener("resize", onResize);
    draw();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 12;
    const columns = w / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const drawMatrix = () => {
      // Check if canvas still exists before drawing
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(0,8,20,0.04)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = COLORS.neonGreen;
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillStyle = `rgba(0,255,136,${Math.random() * 0.5 + 0.1})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Only continue animation if component is still mounted
      if (matrixAnimRef.current !== null) {
        matrixAnimRef.current = requestAnimationFrame(drawMatrix);
      }
    };

    const onResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };

    window.addEventListener("resize", onResize);
    drawMatrix();

    return () => {
      if (matrixAnimRef.current) {
        cancelAnimationFrame(matrixAnimRef.current);
        matrixAnimRef.current = null;
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Neural network visualization
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const nodes = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      connections: [],
      activity: 0,
    }));

    // Create connections between nodes
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j && Math.random() > 0.7) {
          node.connections.push(j);
        }
      });
    });

    const drawNeural = () => {
      // Check if canvas still exists before drawing
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, w, h);

      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.activity = Math.max(0, node.activity - 0.02);

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Random activity spikes
        if (Math.random() > 0.99) node.activity = 1;
      });

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const target = nodes[connectionIndex];
          const activity = Math.max(node.activity, target.activity);
          
          ctx.strokeStyle = hexToRgba(COLORS.cyan, activity * 0.6);
          ctx.lineWidth = activity * 3 + 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const sizeRaw = 3 + node.activity * 5;
        const size = Math.max(1, sizeRaw); // Ensure minimum 1px radius
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size);
        gradient.addColorStop(0, hexToRgba(COLORS.cyan, 0.8 + node.activity * 0.2));
        gradient.addColorStop(1, hexToRgba(COLORS.cyan, 0));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Only continue animation if component is still mounted
      if (neuralAnimRef.current !== null) {
        neuralAnimRef.current = requestAnimationFrame(drawNeural);
      }
    };

    drawNeural();

    return () => {
      if (neuralAnimRef.current) {
        cancelAnimationFrame(neuralAnimRef.current);
        neuralAnimRef.current = null;
      }
    };
  }, []);

  // simple hex to rgba helper
  function hexToRgba(hex, alpha = 1) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // simulated AI typing with more sophisticated patterns
  const pushAi = useCallback((text) => {
    setTyping(true);
    let i = 0;
    setAiLines((s) => [...s, ""]);
    const interval = setInterval(() => {
      setAiLines((prev) => {
        const cp = [...prev];
        cp[cp.length - 1] = text.slice(0, ++i);
        return cp;
      });
      if (i >= text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 30 + Math.random() * 40);
  }, []);

  // Enhanced submit with more dramatic effects
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("⚠ Authentication matrix requires both email and password vectors.");
      return;
    }
    setLoading(true);
    setDataFlowActive(true);
    
    pushAi("◯ AEGIS-AI: Initiating quantum authentication protocol...");
    
    setTimeout(() => {
      pushAi("◯ NEURAL-NET: Biometric patterns verified • Access granted");
      setTimeout(() => {
        setLoading(false);
        pushAi("◯ SYSTEM: Welcome back, Commander • Loading tactical interface...");
        setAiLines((s) => [...s, "◯ AEGIS-AI: All systems nominal • Ready for mission deployment"]);
        console.log("LOGIN SUCCESS:", { email, remember });
      }, 800);
    }, 1200);
  }, [email, password, remember, pushAi]);

  const quickAi = useCallback((type = 0) => {
    const idx = type % DemoAiLines.length;
    pushAi(DemoAiLines[idx]);
  }, [pushAi]);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: `radial-gradient(ellipse at top, ${COLORS.bg1} 0%, ${COLORS.bg0} 100%)`,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Matrix rain background */}
      <canvas 
        ref={matrixCanvasRef} 
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%", 
          zIndex: 1,
          opacity: 0.15
        }} 
      />

      {/* Holographic overlay grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,246,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,246,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        zIndex: 2,
        opacity: 0.4,
        transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
        transition: "transform 0.1s ease-out"
      }} />

      {/* Rotating energy fields */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}>
        <div style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%",
          background: `conic-gradient(from 0deg, 
            ${hexToRgba(COLORS.cyan,0.08)} 0%, 
            ${hexToRgba(COLORS.neonBlue,0.06)} 25%, 
            ${hexToRgba(COLORS.magenta,0.04)} 50%, 
            ${hexToRgba(COLORS.purple,0.06)} 75%, 
            ${hexToRgba(COLORS.cyan,0.08)} 100%)`,
          filter: "blur(100px) saturate(150%)",
          transformOrigin: "50% 50%",
          animation: "rotate-energy 40s linear infinite",
          opacity: 0.7,
        }} />
        
        <div style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          left: "-25%",
          top: "-25%",
          background: `conic-gradient(from 180deg, 
            ${hexToRgba(COLORS.neonGreen,0.05)} 0%, 
            ${hexToRgba(COLORS.yellow,0.03)} 30%, 
            ${hexToRgba(COLORS.orange,0.04)} 60%, 
            ${hexToRgba(COLORS.neonGreen,0.05)} 100%)`,
          filter: "blur(120px) saturate(120%)",
          transformOrigin: "50% 50%",
          animation: "rotate-energy-reverse 60s linear infinite",
          opacity: 0.5,
        }} />
      </div>

      {/* Scan lines effect */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 2px,
          rgba(0,246,255,0.02) 2px,
          rgba(0,246,255,0.02) 4px
        )`,
        zIndex: 4,
        pointerEvents: "none",
        animation: "scan-lines 2s linear infinite"
      }} />

      <style>{`
        @keyframes rotate-energy { 
          from { transform: rotate(0deg) scale(1.1) } 
          to { transform: rotate(360deg) scale(1.1) } 
        }
        @keyframes rotate-energy-reverse { 
          from { transform: rotate(360deg) scale(1.05) } 
          to { transform: rotate(0deg) scale(1.05) } 
        }
        @keyframes scan-lines {
          0% { transform: translateY(-100px) }
          100% { transform: translateY(100vh) }
        }
        @keyframes wave-rotate { 
          from { transform: rotate(0deg) scale(1.02)} 
          to { transform: rotate(360deg) scale(1.02)} 
        }
        @keyframes hologram-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1) }
          50% { opacity: 1; transform: scale(1.02) }
        }
        @keyframes data-flow {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100vw) }
        }
        @keyframes neural-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,246,255,0.3) }
          50% { box-shadow: 0 0 40px rgba(0,246,255,0.6), 0 0 60px rgba(0,246,255,0.3) }
        }
        .focus-ring:focus { 
          box-shadow: 0 0 30px rgba(0,246,255,0.4), 0 0 60px rgba(0,179,255,0.2); 
          outline: none; 
          transform: scale(1.02);
        }
        .hover-lift:hover {
          transform: translateY(-2px) scale(1.01);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-morphism {
          backdrop-filter: blur(20px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      <main style={{ 
        position: "relative", 
        zIndex: 10, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px",
        minHeight: "100vh",
        transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
        transition: "transform 0.1s ease-out"
      }}>
        <div style={{ 
          width: "100%", 
          maxWidth: 1400, 
          borderRadius: 20, 
          padding: 8, 
          position: "relative",
          transform: "translateZ(50px)",
        }}>
          {/* Outer holographic frame */}
          <div style={{
            borderRadius: 16,
            padding: 24,
            background: `linear-gradient(135deg, 
              rgba(0,20,40,0.95) 0%, 
              rgba(0,8,20,0.98) 50%, 
              rgba(0,20,40,0.95) 100%)`,
            backdropFilter: "blur(30px) saturate(150%)",
            boxShadow: `
              0 30px 100px rgba(0,8,20,0.8),
              inset 0 1px 0 rgba(255,255,255,0.1),
              0 0 50px rgba(0,246,255,0.1)
            `,
            border: "1px solid rgba(0,246,255,0.2)",
            position: "relative",
            overflow: "visible"
          }}>
            {/* Data flow lines */}
            {dataFlowActive && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${COLORS.cyan} 50%, 
                  transparent 100%)`,
                animation: "data-flow 3s ease-in-out infinite",
                zIndex: 1
              }} />
            )}

            {/* Main content grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 480px 400px",
              gap: 32,
              alignItems: "stretch",
              minHeight: 600,
              borderRadius: 12,
              position: "relative",
              zIndex: 2,
            }}>
              {/* LEFT - Enhanced Showcase */}
              <section className="hover-lift" style={{ 
                position: "relative", 
                borderRadius: 16, 
                overflow: "hidden", 
                background: `linear-gradient(135deg, 
                  rgba(0,20,40,0.9) 0%, 
                  rgba(0,8,20,0.95) 100%)`,
                border: "1px solid rgba(0,246,255,0.15)",
                boxShadow: "0 20px 60px rgba(0,8,20,0.6)"
              }}>
                {/* Enhanced particles canvas */}
                <canvas 
                  ref={particlesCanvasRef} 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    width: "100%", 
                    height: "100%", 
                    zIndex: 1 
                  }} 
                />

                {/* Holographic background */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `scale(1.05) translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
                  transition: "transform 0.2s ease-out",
                  zIndex: 0,
                  filter: "brightness(0.4) saturate(1.3) contrast(1.1) hue-rotate(200deg)",
                  opacity: 0.8
                }} />

                {/* Advanced neural SVG overlay */}
                <svg 
                  viewBox="0 0 800 600" 
                  preserveAspectRatio="xMidYMid slice" 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    zIndex: 2, 
                    pointerEvents: "none", 
                    opacity: 0.7 
                  }}
                >
                  <defs>
                    <linearGradient id="neural-gradient" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.8" />
                      <stop offset="33%" stopColor={COLORS.neonBlue} stopOpacity="0.6" />
                      <stop offset="66%" stopColor={COLORS.magenta} stopOpacity="0.7" />
                      <stop offset="100%" stopColor={COLORS.neonGreen} stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#glow)" stroke="url(#neural-gradient)" strokeWidth="2.5" fill="none">
                    <path d="M50 500 Q200 400 400 450 T750 400" strokeOpacity="0.6">
                      <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="8s" repeatCount="indefinite"/>
                    </path>
                    <path d="M50 150 Q300 50 500 100 T750 150" strokeOpacity="0.5">
                      <animate attributeName="stroke-dasharray" values="1000,0;0,1000;1000,0" dur="10s" repeatCount="indefinite"/>
                    </path>
                    <path d="M50 300 Q400 200 600 300 T750 250" strokeOpacity="0.4">
                      <animate attributeName="stroke-dasharray" values="500,500;0,1000;500,500" dur="12s" repeatCount="indefinite"/>
                    </path>
                  </g>
                </svg>

                <div style={{ 
                  position: "relative", 
                  zIndex: 3, 
                  padding: 36, 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  gap: 20 
                }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{
                      width: 72, 
                      height: 72, 
                      borderRadius: 16,
                      background: `linear-gradient(135deg, 
                        ${COLORS.cyan} 0%, 
                        ${COLORS.neonBlue} 40%, 
                        ${COLORS.magenta} 80%, 
                        ${COLORS.purple} 100%)`,
                      boxShadow: `
                        0 15px 40px rgba(0,8,20,0.6), 
                        inset 0 -8px 16px rgba(0,0,0,0.3),
                        0 0 30px rgba(0,246,255,0.3)
                      `,
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: "#000814", 
                      fontWeight: 900, 
                      fontSize: "18px",
                      transform: "rotate(-8deg)",
                      animation: "hologram-pulse 4s ease-in-out infinite"
                    }}>
                      ⬢
                    </div>
                    <div>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: 28, 
                        fontWeight: 900, 
                        color: "#eafff7", 
                        letterSpacing: "-0.02em",
                        textShadow: "0 0 20px rgba(0,246,255,0.5)"
                      }}>
                        NEXUS Command Hub
                      </h3>
                      <p style={{ 
                        margin: 0, 
                        color: "rgba(235,245,255,0.9)", 
                        fontSize: 14, 
                        maxWidth: 450,
                        fontWeight: 500
                      }}>
                        Advanced neural interface combining quantum computing, AI assistance, and real-time holographic displays for next-generation tactical operations.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                    <div style={enhancedChipStyle()}>⚡ Quantum Processing</div>
                    <div style={enhancedChipStyle()}>🧠 Neural AI</div>
                    <div style={enhancedChipStyle()}>🔮 Holographic UI</div>
                    <div style={enhancedChipStyle()}>🛡️ Quantum Security</div>
                  </div>

                  <div style={{ 
                    marginTop: 24, 
                    maxWidth: 560, 
                    color: "rgba(230,245,255,0.9)", 
                    fontSize: 14,
                    lineHeight: 1.6,
                    padding: 16,
                    background: "rgba(0,246,255,0.05)",
                    borderRadius: 12,
                    border: "1px solid rgba(0,246,255,0.1)",
                    backdropFilter: "blur(10px)"
                  }}>
                    <strong style={{ color: COLORS.cyan, fontSize: 16 }}>⚠ CLASSIFIED</strong><br/>
                    Neural-link authentication active. Biometric scanners operational. All quantum encryption protocols verified and secured.
                  </div>
                </div>
              </section>

              {/* MIDDLE - Ultra-Advanced Login */}
              <section className="hover-lift" style={{ position: "relative" }}>
                {/* Multi-layered wave border system */}
                <div style={{
                  position: "absolute", 
                  inset: -12, 
                  borderRadius: 16,
                  background: `conic-gradient(from 45deg, 
                    ${COLORS.cyan}, 
                    ${COLORS.neonBlue}, 
                    ${COLORS.magenta}, 
                    ${COLORS.purple}, 
                    ${COLORS.neonGreen}, 
                    ${COLORS.yellow}, 
                    ${COLORS.cyan})`,
                  filter: "blur(20px) saturate(150%)",
                  zIndex: 0,
                  animation: "wave-rotate 15s linear infinite",
                  opacity: 0.8
                }} />
                
                <div style={{
                  position: "absolute", 
                  inset: -6, 
                  borderRadius: 14,
                  background: `conic-gradient(from 225deg, 
                    ${COLORS.neonGreen}, 
                    ${COLORS.cyan}, 
                    ${COLORS.magenta}, 
                    ${COLORS.neonBlue}, 
                    ${COLORS.neonGreen})`,
                  filter: "blur(12px) saturate(120%)",
                  zIndex: 1,
                  animation: "wave-rotate 20s linear infinite reverse",
                  opacity: 0.6
                }} />

                <div style={{
                  position: "relative",
                  borderRadius: 12,
                  background: `linear-gradient(135deg, 
                    ${COLORS.glass} 0%, 
                    rgba(0,12,24,0.92) 50%, 
                    ${COLORS.glass} 100%)`,
                  backdropFilter: "blur(25px) saturate(140%)",
                  padding: 28,
                  zIndex: 3,
                  boxShadow: `
                    0 25px 70px rgba(0,8,20,0.7),
                    inset 0 1px 0 rgba(255,255,255,0.15),
                    0 0 40px rgba(0,246,255,0.15)
                  `,
                  border: "1px solid rgba(0,246,255,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h2 style={{ 
                        margin: 0, 
                        fontSize: 24, 
                        fontWeight: 900, 
                        color: "#ffffff",
                        textShadow: "0 0 15px rgba(0,246,255,0.6)"
                      }}>
                        ◉ NEURAL LINK
                      </h2>
                      <div style={{ 
                        fontSize: 14, 
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 600,
                        marginTop: 4
                      }}>
                        Quantum authentication required
                      </div>
                    </div>
                    <div style={{ 
                      textAlign: "right", 
                      fontSize: 12, 
                      color: "rgba(255,255,255,0.7)",
                      padding: "8px 12px",
                      background: "rgba(0,246,255,0.1)",
                      borderRadius: 8,
                      border: "1px solid rgba(0,246,255,0.2)"
                    }}>
                      <div style={{ 
                        fontWeight: 900, 
                        color: COLORS.cyan,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: COLORS.neonGreen,
                          boxShadow: `0 0 10px ${COLORS.neonGreen}`,
                          animation: "neural-pulse 2s ease-in-out infinite"
                        }} />
                        AI ACTIVE
                      </div>
                      <div style={{ fontSize: 11, marginTop: 2 }}>AEGIS-7 • QUANTUM</div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ position: "relative" }}>
                      <label style={{ 
                        display: "block", 
                        marginBottom: 10, 
                        fontSize: 13, 
                        color: "rgba(255,255,255,0.85)", 
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        ⚡ Neural ID Vector
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          className="focus-ring hover-lift"
                          style={ultraInputStyle()}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="quantum.user@nexus.sys"
                          aria-label="Email"
                        />
                        <div style={{ 
                          position: "absolute", 
                          left: 16, 
                          top: "50%", 
                          transform: "translateY(-50%)", 
                          opacity: 0.7,
                          color: COLORS.cyan
                        }}>
                          ⬢
                        </div>
                      </div>
                    </div>

                    <div style={{ position: "relative" }}>
                      <label style={{ 
                        display: "block", 
                        marginBottom: 10, 
                        fontSize: 13, 
                        color: "rgba(255,255,255,0.85)", 
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        🔐 Quantum Cipher Key
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          className="focus-ring hover-lift"
                          style={{ ...ultraInputStyle(), paddingRight: 50 }}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••••••"
                          aria-label="Password"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(s => !s)} 
                          style={{ 
                            position: "absolute", 
                            right: 12, 
                            top: "50%", 
                            transform: "translateY(-50%)", 
                            background: "transparent", 
                            border: "none", 
                            color: COLORS.cyan, 
                            cursor: "pointer", 
                            fontSize: 16,
                            padding: 4,
                            borderRadius: 4,
                            transition: "all 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = COLORS.neonGreen}
                          onMouseLeave={(e) => e.target.style.color = COLORS.cyan}
                        >
                          {showPassword ? "👁️‍�️" : "�"}
                        </button>
                      </div>
                    </div>

                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginTop: 8
                    }}>
                      <label style={{ 
                        display: "flex", 
                        gap: 10, 
                        alignItems: "center", 
                        color: "rgba(255,255,255,0.85)", 
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer"
                      }}>
                        <input 
                          type="checkbox" 
                          checked={remember} 
                          onChange={(e) => setRemember(e.target.checked)} 
                          style={{ 
                            width: 18, 
                            height: 18, 
                            accentColor: COLORS.cyan,
                            cursor: "pointer"
                          }} 
                        />
                        Maintain neural link
                      </label>
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()} 
                        style={{ 
                          color: COLORS.neonBlue, 
                          fontWeight: 800,
                          textDecoration: "none",
                          fontSize: 13,
                          padding: "4px 8px",
                          borderRadius: 6,
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = COLORS.neonGreen;
                          e.target.style.background = "rgba(0,246,255,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = COLORS.neonBlue;
                          e.target.style.background = "transparent";
                        }}
                      >
                        Recovery Protocol?
                      </a>
                    </div>

                    {error && (
                      <div style={{ 
                        color: "#ff6b6b", 
                        fontSize: 13,
                        padding: 12,
                        background: "rgba(255,107,107,0.1)",
                        borderRadius: 8,
                        border: "1px solid rgba(255,107,107,0.2)",
                        fontWeight: 600
                      }}>
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="focus-ring hover-lift" 
                      style={{ 
                        ...ultraBtnStyle(), 
                        opacity: loading ? 0.8 : 1,
                        transform: loading ? "scale(0.98)" : "scale(1)"
                      }} 
                      disabled={loading}
                    >
                      {loading ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                          <div style={{
                            width: 20,
                            height: 20,
                            border: "2px solid rgba(0,8,20,0.3)",
                            borderTop: "2px solid #000814",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                          }} />
                          INITIALIZING NEURAL LINK...
                        </span>
                      ) : (
                        "⚡ ESTABLISH CONNECTION"
                      )}
                    </button>

                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 16, 
                      justifyContent: "center",
                      marginTop: 8
                    }}>
                      <div style={{ 
                        color: "rgba(255,255,255,0.7)", 
                        fontSize: 13,
                        fontWeight: 600
                      }}>
                        Alternative Protocols
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button 
                          type="button" 
                          className="focus-ring hover-lift" 
                          onClick={() => pushAi("◯ SYSTEM: GitHub OAuth protocol initiated...")} 
                          style={ultraSocialBtnStyle()}
                        >
                          <span style={{ marginRight: 6 }}>⚡</span>GitHub
                        </button>
                        <button 
                          type="button" 
                          className="focus-ring hover-lift" 
                          onClick={() => pushAi("◯ SYSTEM: Quantum Google auth sequence active...")} 
                          style={ultraSocialBtnStyle()}
                        >
                          <span style={{ marginRight: 6 }}>🔮</span>Quantum
                        </button>
                      </div>
                    </div>
                  </form>

                  <div style={{ 
                    fontSize: 13, 
                    color: "rgba(255,255,255,0.8)", 
                    marginTop: 12,
                    textAlign: "center",
                    padding: 12,
                    background: "rgba(0,246,255,0.05)",
                    borderRadius: 8,
                    border: "1px solid rgba(0,246,255,0.1)"
                  }}>
                    New to the neural network? <a 
                      href="#" 
                      style={{ 
                        color: COLORS.cyan, 
                        fontWeight: 900,
                        textDecoration: "none"
                      }}
                      onMouseEnter={(e) => e.target.style.color = COLORS.neonGreen}
                      onMouseLeave={(e) => e.target.style.color = COLORS.cyan}
                    >
                      Initialize Quantum ID
                    </a>
                  </div>
                </div>

                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </section>

              {/* RIGHT - Ultra-Advanced AI Neural Interface */}
              <aside className="hover-lift ai-panel" style={{ minWidth: 320 }}>
                <div style={{
                  background: `linear-gradient(135deg, 
                    rgba(0,20,40,0.9) 0%, 
                    rgba(0,8,24,0.95) 100%)`,
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(0,246,255,0.2)",
                  boxShadow: `
                    0 20px 60px rgba(0,8,20,0.6),
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    0 0 30px rgba(0,246,255,0.1)
                  `,
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Neural network background */}
                  <canvas 
                    ref={neuralCanvasRef} 
                    style={{ 
                      position: "absolute", 
                      inset: 0, 
                      width: "100%", 
                      height: "100%", 
                      opacity: 0.3,
                      borderRadius: 16
                    }} 
                  />
                  
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      gap: 16, 
                      marginBottom: 20 
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: 12, 
                          background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.neonBlue})`,
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          color: "#000814", 
                          fontWeight: 900,
                          fontSize: 16,
                          boxShadow: `0 0 20px rgba(0,246,255,0.4)`,
                          position: "relative"
                        }}>
                          ⬢
                          <div style={{
                            position: "absolute",
                            inset: -4,
                            borderRadius: 16,
                            background: `conic-gradient(${COLORS.cyan}, ${COLORS.neonBlue}, ${COLORS.cyan})`,
                            opacity: 0.3,
                            animation: "wave-rotate 8s linear infinite",
                            zIndex: -1
                          }} />
                        </div>
                        <div>
                          <div style={{ 
                            fontWeight: 900, 
                            fontSize: 16,
                            color: "#ffffff",
                            textShadow: "0 0 10px rgba(0,246,255,0.5)"
                          }}>
                            AEGIS-7 Neural AI
                          </div>
                          <div style={{ 
                            fontSize: 12, 
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 600
                          }}>
                            Quantum • Neural Network • Active
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        fontSize: 11, 
                        color: COLORS.neonGreen,
                        fontWeight: 800,
                        padding: "4px 8px",
                        background: "rgba(0,255,136,0.1)",
                        borderRadius: 6,
                        border: "1px solid rgba(0,255,136,0.2)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4
                      }}>
                        <div style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: COLORS.neonGreen,
                          boxShadow: `0 0 8px ${COLORS.neonGreen}`,
                          animation: "neural-pulse 1.5s ease-in-out infinite"
                        }} />
                        ONLINE
                      </div>
                    </div>

                    {/* Neural activity monitor */}
                    <div style={{
                      padding: 16,
                      background: "rgba(0,246,255,0.05)",
                      borderRadius: 12,
                      border: "1px solid rgba(0,246,255,0.15)",
                      marginBottom: 16,
                      backdropFilter: "blur(10px)"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8
                      }}>
                        <span style={{ 
                          fontSize: 12, 
                          color: "rgba(255,255,255,0.8)", 
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          Neural Activity
                        </span>
                        <span style={{ 
                          fontSize: 12, 
                          color: COLORS.cyan,
                          fontWeight: 800
                        }}>
                          {Math.round(85 + Math.sin(aiPulse) * 10)}%
                        </span>
                      </div>
                      <div style={{
                        height: 4,
                        background: "rgba(0,246,255,0.2)",
                        borderRadius: 2,
                        overflow: "hidden"
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${85 + Math.sin(aiPulse) * 10}%`,
                          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.neonBlue})`,
                          borderRadius: 2,
                          transition: "width 0.3s ease",
                          boxShadow: `0 0 10px ${COLORS.cyan}`
                        }} />
                      </div>
                    </div>

                    {/* AI Console */}
                    <div style={{ 
                      background: "rgba(0,8,20,0.8)",
                      borderRadius: 12, 
                      padding: 16, 
                      height: 280, 
                      overflowY: "auto", 
                      border: "1px solid rgba(0,246,255,0.2)",
                      boxShadow: "inset 0 4px 12px rgba(0,8,20,0.5)",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      marginBottom: 16
                    }}>
                      {aiLines.map((line, i) => (
                        <div key={i} style={{ 
                          marginBottom: 12,
                          animation: i === aiLines.length - 1 ? "fadeIn 0.5s ease-in" : "none"
                        }}>
                          <div style={{ 
                            color: line.startsWith("◯ AEGIS-AI:") ? COLORS.cyan :
                                   line.startsWith("◯ NEURAL-NET:") ? COLORS.neonGreen :
                                   line.startsWith("◯ SYSTEM:") ? COLORS.yellow :
                                   "rgba(255,255,255,0.9)",
                            fontWeight: line.startsWith("◯") ? 800 : 600,
                            lineHeight: 1.4,
                            textShadow: line.startsWith("◯") ? `0 0 8px currentColor` : "none"
                          }}>
                            {line}
                          </div>
                        </div>
                      ))}
                      {typing && (
                        <div style={{ 
                          color: "rgba(255,255,255,0.6)", 
                          fontSize: 12,
                          fontStyle: "italic",
                          display: "flex",
                          alignItems: "center",
                          gap: 8
                        }}>
                          <div style={{
                            width: 12,
                            height: 12,
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid #ffffff",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                          }} />
                          AEGIS processing neural pathways...
                        </div>
                      )}
                    </div>

                    {/* AI Control Panel */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                      <button 
                        onClick={() => quickAi(0)} 
                        style={ultraActionStyle()}
                        className="hover-lift"
                      >
                        <span style={{ marginRight: 6 }}>⚡</span>Neural Scan
                      </button>
                      <button 
                        onClick={() => quickAi(1)} 
                        style={ultraActionStyle()}
                        className="hover-lift"
                      >
                        <span style={{ marginRight: 6 }}>🛡️</span>Security
                      </button>
                      <button 
                        onClick={() => quickAi(2)} 
                        style={ultraActionStyle()}
                        className="hover-lift"
                      >
                        <span style={{ marginRight: 6 }}>🔮</span>Quantum
                      </button>
                      <button 
                        onClick={() => { 
                          setAiLines(["◯ AEGIS-AI: Neural systems online • Standing by..."]); 
                          pushAi("◯ SYSTEM: Memory banks cleared • Fresh neural state initialized");
                        }} 
                        style={{...ultraActionStyle(), background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)"}}
                        className="hover-lift"
                      >
                        <span style={{ marginRight: 6 }}>🔄</span>Reset
                      </button>
                    </div>

                    {/* System Status */}
                    <div style={{ 
                      fontSize: 11, 
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.5,
                      padding: 12,
                      background: "rgba(0,246,255,0.03)",
                      borderRadius: 8,
                      border: "1px solid rgba(0,246,255,0.1)"
                    }}>
                      <div style={{ 
                        color: COLORS.cyan, 
                        fontWeight: 800, 
                        marginBottom: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        ⚠ CLASSIFIED PROTOCOL
                      </div>
                      Advanced neural AI interface powered by quantum processing cores. 
                      All interactions are encrypted with military-grade quantum entanglement protocols.
                    </div>
                  </div>
                </div>

                <style>{`
                  @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Ultra-Advanced Style Helpers ---------- */

function ultraInputStyle() {
  return {
    width: "100%",
    padding: "16px 20px 16px 40px",
    borderRadius: 12,
    background: `linear-gradient(135deg, 
      rgba(0,20,40,0.8) 0%, 
      rgba(0,8,24,0.9) 100%)`,
    border: "1px solid rgba(0,246,255,0.3)",
    color: "#eafff7",
    fontSize: 15,
    fontWeight: 600,
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `
      inset 0 8px 24px rgba(0,8,20,0.6),
      0 0 20px rgba(0,246,255,0.1)
    `,
    backdropFilter: "blur(10px)",
    fontFamily: "'JetBrains Mono', monospace"
  };
}

function ultraBtnStyle() {
  return {
    padding: "16px 24px",
    borderRadius: 12,
    fontWeight: 900,
    fontSize: 16,
    border: "none",
    cursor: "pointer",
    color: "#000814",
    background: `linear-gradient(135deg, 
      ${COLORS.cyan} 0%, 
      ${COLORS.neonBlue} 30%, 
      ${COLORS.magenta} 70%, 
      ${COLORS.yellow} 100%)`,
    boxShadow: `
      0 20px 50px rgba(0,8,20,0.7), 
      inset 0 8px 24px rgba(0,0,0,0.2),
      0 0 30px rgba(0,246,255,0.3)
    `,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden"
  };
}

function enhancedChipStyle() {
  return {
    padding: "10px 16px",
    borderRadius: 20,
    background: `linear-gradient(135deg, 
      rgba(0,246,255,0.1) 0%, 
      rgba(0,179,255,0.05) 100%)`,
    border: "1px solid rgba(0,246,255,0.2)",
    color: "#eafff7",
    fontWeight: 800,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 12px rgba(0,8,20,0.3)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease"
  };
}

function ultraSocialBtnStyle() {
  return {
    padding: "12px 20px",
    borderRadius: 10,
    background: `linear-gradient(135deg, 
      rgba(0,20,40,0.8) 0%, 
      rgba(0,8,24,0.9) 100%)`,
    border: "1px solid rgba(0,246,255,0.2)",
    color: "#eafff7",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 13,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `
      0 8px 24px rgba(0,8,20,0.4),
      inset 0 1px 0 rgba(255,255,255,0.1)
    `,
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
}

function ultraActionStyle() {
  return {
    padding: "10px 14px",
    borderRadius: 10,
    background: `linear-gradient(135deg, 
      rgba(0,246,255,0.1) 0%, 
      rgba(0,179,255,0.05) 100%)`,
    border: "1px solid rgba(0,246,255,0.3)",
    color: "#eafff7",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 12,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(0,8,20,0.3)",
    backdropFilter: "blur(10px)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
}
