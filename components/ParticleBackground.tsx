import React, { useRef, useEffect, useCallback } from 'react';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D, particles: any[], mouse: { x: number; y: number; radius: number }) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        particles.forEach(p => {
            // Mouse interaction
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * -1;
                const directionY = forceDirectionY * force * -1;
                p.vx += directionX;
                p.vy += directionY;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Wall collision
            if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1;

            // Slow down
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(103, 232, 249, 0.5)';
            ctx.fill();
        });

        // Connect particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(103, 232, 249, ${1 - distance / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        containerRef.current = document.querySelector('.content-panel');
        if(!containerRef.current) return;

        let animationFrameId: number;
        
        const particles: any[] = [];
        const mouse = { x: -1000, y: -1000, radius: 100 };

        const resizeCanvas = () => {
            if(!containerRef.current) return;
            canvas.width = containerRef.current.clientWidth;
            canvas.height = containerRef.current.clientHeight;
            
            particles.length = 0;
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 1.5 + 1
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if(!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
          mouse.x = -1000;
          mouse.y = -1000;
        }

        resizeCanvas();

        const animate = () => {
            draw(ctx, particles, mouse);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', resizeCanvas);
        if(containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove);
            containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
             if(containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default ParticleBackground;