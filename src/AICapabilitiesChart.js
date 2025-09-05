import React, { useRef, useEffect } from 'react';

const AICapabilitiesChart = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 120;
    
    const capabilities = [
      { label: 'Automation', value: 95, angle: 0 },
      { label: 'Security', value: 82, angle: Math.PI / 3 },
      { label: 'NLP', value: 85, angle: 2 * Math.PI / 3 },
      { label: 'Vision', value: 92, angle: Math.PI },
      { label: 'Learning', value: 78, angle: 4 * Math.PI / 3 },
      { label: 'Prediction', value: 88, angle: 5 * Math.PI / 3 }
    ];
    
    let rotation = 0;
    let pulsePhase = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation values
      rotation += 0.005;
      pulsePhase += 0.02;
      
      const baseColor = darkMode ? '#00ffff' : '#0099cc';
      const bgColor = darkMode ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 153, 204, 0.1)';
      
      // Draw background grid
      ctx.strokeStyle = darkMode ? 'rgba(0, 255, 255, 0.15)' : 'rgba(0, 153, 204, 0.15)';
      ctx.lineWidth = 1;
      
      // Draw concentric circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 4) * i, 0, 2 * Math.PI);
        ctx.stroke();
      }
      
      // Draw radial lines
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.stroke();
      }
      
      // Draw capability polygon
      ctx.beginPath();
      capabilities.forEach((cap, index) => {
        const angle = cap.angle + rotation;
        const radius = (cap.value / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, darkMode ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 153, 204, 0.3)');
      gradient.addColorStop(1, darkMode ? 'rgba(0, 255, 255, 0.05)' : 'rgba(0, 153, 204, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Stroke the polygon
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw capability points and labels
      capabilities.forEach((cap, index) => {
        const angle = cap.angle + rotation;
        const radius = (cap.value / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw pulsing point
        const pulseScale = 1 + Math.sin(pulsePhase + index * 0.5) * 0.3;
        const pointRadius = 4 * pulseScale;
        
        ctx.beginPath();
        ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
        ctx.fillStyle = baseColor;
        ctx.fill();
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, pointRadius + 3, 0, 2 * Math.PI);
        ctx.strokeStyle = darkMode ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 153, 204, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw labels
        // const labelRadius = maxRadius + 25;
        // const labelX = centerX + Math.cos(angle) * labelRadius;
        // const labelY = centerY + Math.sin(angle) * labelRadius;
        
        // ctx.fillStyle = darkMode ? '#ffffff' : '#333333';
        // ctx.font = 'bold 12px Arial';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.fillText(cap.label, labelX, labelY);
        
        // // Draw percentage
        // ctx.fillStyle = baseColor;
        // ctx.font = '10px Arial';
        // ctx.fillText(`${cap.value}%`, labelX, labelY + 15);
      });
      
      // Draw center label
      ctx.fillStyle = baseColor;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AI Capabilities', centerX, centerY);
      
      // Draw orbiting particles
      for (let i = 0; i < 8; i++) {
        const particleAngle = (Math.PI / 4) * i + rotation * 2;
        const particleRadius = maxRadius + 15 + Math.sin(pulsePhase + i) * 5;
        const px = centerX + Math.cos(particleAngle) * particleRadius;
        const py = centerY + Math.sin(particleAngle) * particleRadius;
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, 2 * Math.PI);
        ctx.fillStyle = darkMode ? 'rgba(0, 255, 255, 0.6)' : 'rgba(0, 153, 204, 0.6)';
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [darkMode]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="drop-shadow-2xl"
        style={{ filter: darkMode ? 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' : 'drop-shadow(0 0 20px rgba(0, 153, 204, 0.3))' }}
      />
    </div>
  );
};

export default AICapabilitiesChart;