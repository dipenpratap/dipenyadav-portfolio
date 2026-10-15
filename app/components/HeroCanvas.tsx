'use client';
import { useEffect, useRef } from 'react';

const NODES = [
  { rx: 0.06, ry: 0.14, label: 'Kafka',       fx: 1.2, fy: 0.8 },
  { rx: 0.10, ry: 0.36, label: 'PostgreSQL',   fx: 0.9, fy: 1.3 },
  { rx: 0.06, ry: 0.58, label: 'MySQL',         fx: 1.1, fy: 0.7 },
  { rx: 0.10, ry: 0.80, label: 'REST APIs',     fx: 0.8, fy: 1.1 },
  { rx: 0.27, ry: 0.08, label: 'PySpark',       fx: 1.3, fy: 0.9 },
  { rx: 0.22, ry: 0.29, label: 'AWS Glue',      fx: 0.9, fy: 1.2 },
  { rx: 0.24, ry: 0.51, label: 'Hive',          fx: 1.1, fy: 0.8 },
  { rx: 0.19, ry: 0.72, label: 'MapReduce',     fx: 1.0, fy: 1.1 },
  { rx: 0.26, ry: 0.91, label: 'Airflow',       fx: 1.2, fy: 0.9 },
  { rx: 0.42, ry: 0.06, label: 'AWS EMR',       fx: 0.8, fy: 1.2 },
  { rx: 0.54, ry: 0.04, label: 'Lambda',        fx: 1.1, fy: 0.8 },
  { rx: 0.64, ry: 0.07, label: 'SQS',           fx: 0.9, fy: 1.3 },
  { rx: 0.38, ry: 0.94, label: 'EventBridge',   fx: 1.2, fy: 1.0 },
  { rx: 0.60, ry: 0.93, label: 'ECS Fargate',   fx: 0.9, fy: 0.8 },
  { rx: 0.74, ry: 0.13, label: 'S3',            fx: 1.1, fy: 1.2 },
  { rx: 0.78, ry: 0.37, label: 'Redshift',      fx: 0.8, fy: 0.9 },
  { rx: 0.74, ry: 0.60, label: 'Data Lake',     fx: 1.2, fy: 1.1 },
  { rx: 0.72, ry: 0.82, label: 'Cognito',       fx: 1.0, fy: 0.8 },
  { rx: 0.87, ry: 0.18, label: 'Tableau',       fx: 0.9, fy: 1.2 },
  { rx: 0.92, ry: 0.40, label: 'Power BI',      fx: 1.1, fy: 0.9 },
  { rx: 0.88, ry: 0.61, label: 'Bedrock',       fx: 0.8, fy: 1.1 },
  { rx: 0.91, ry: 0.82, label: 'ML Models',     fx: 1.2, fy: 0.8 },
];

const EDGES: [number, number][] = [
  [0, 4], [1, 5], [2, 5], [3, 10],
  [4, 9], [4, 14], [5, 14], [5, 15],
  [6, 9], [7, 9], [8, 4],
  [9, 14], [9, 15], [9, 21],
  [10, 11], [11, 12], [11, 13],
  [14, 15], [14, 16],
  [15, 18], [15, 19],
  [16, 21], [17, 13],
  [20, 21],
];

interface Particle { edge: number; t: number; speed: number; }

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    const particles: Particle[] = [];
    let raf: number;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0, tick = 0;

    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      W = c.offsetWidth;
      H = c.offsetHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 18; i++) {
      particles.push({ edge: Math.floor(Math.random() * EDGES.length), t: Math.random(), speed: 0.0005 + Math.random() * 0.001 });
    }

    const spawn = setInterval(() => {
      if (particles.length < 45) {
        particles.push({ edge: Math.floor(Math.random() * EDGES.length), t: 0, speed: 0.0005 + Math.random() * 0.001 });
      }
    }, 500);

    function nodePos(i: number) {
      const n = NODES[i];
      const d = 5;
      return {
        x: n.rx * W + Math.sin(tick * n.fx * 0.0007 + i * 1.7) * d,
        y: n.ry * H + Math.cos(tick * n.fy * 0.0007 + i * 2.3) * d,
        label: n.label,
      };
    }

    function draw() {
      tick++;
      ctx.clearRect(0, 0, W, H);
      const pos = NODES.map((_, i) => nodePos(i));

      EDGES.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
        ctx.strokeStyle = 'rgba(255,255,255,0.055)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const [a, b] = EDGES[p.edge];
        const x = pos[a].x + (pos[b].x - pos[a].x) * p.t;
        const y = pos[a].y + (pos[b].y - pos[a].y) * p.t;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, 'rgba(220,70,50,0.65)');
        g.addColorStop(1, 'rgba(220,70,50,0)');
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240,100,80,0.9)';
        ctx.fill();

        p.t += p.speed;
        if (p.t >= 1) particles.splice(i, 1);
      }

      pos.forEach(({ x, y, label }) => {
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.09)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.font = '10px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,0.27)';
        ctx.fillText(label, x, y - 9);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(raf); clearInterval(spawn); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
