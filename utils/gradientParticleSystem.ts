import { ParticleConfig } from '../types/particle';

// ─── Flat typed arrays replace class instances ──────────────────────────────
// Storing particle data in flat Float32Arrays is dramatically faster than
// an array of objects — better CPU cache locality, no GC pressure, no
// property lookup overhead per particle.

export interface ParticleBuffers {
    x:           Float32Array;   // current x
    y:           Float32Array;   // current y
    ox:          Float32Array;   // origin x
    oy:          Float32Array;   // origin y
    vx:          Float32Array;   // velocity x
    vy:          Float32Array;   // velocity y
    floatOffset: Float32Array;   // float phase offset
    twinkle:     Float32Array;   // twinkle phase
    twinkleSpd:  Float32Array;   // twinkle speed
    size:        Float32Array;   // radius
    colorIdx:    Uint8Array;     // index into COLORS
    count:       number;
}

// Pre-built color strings — fillStyle is set once per color group, not per particle
export const COLORS = ['#833AB4', '#FD1D1D', '#FCB045'] as const;

export function createParticleBuffers(capacity: number): ParticleBuffers {
    return {
        x:           new Float32Array(capacity),
        y:           new Float32Array(capacity),
        ox:          new Float32Array(capacity),
        oy:          new Float32Array(capacity),
        vx:          new Float32Array(capacity),
        vy:          new Float32Array(capacity),
        floatOffset: new Float32Array(capacity),
        twinkle:     new Float32Array(capacity),
        twinkleSpd:  new Float32Array(capacity),
        size:        new Float32Array(capacity),
        colorIdx:    new Uint8Array(capacity),
        count:       0,
    };
}

// ─── Init from image ────────────────────────────────────────────────────────
export function initParticlesFromImage(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    img: HTMLImageElement,
    config: ParticleConfig,
    canvasW: number,
    canvasH: number,
): ParticleBuffers {
    const scale = Math.min(width / img.width, height / img.height);
    const w  = img.width  * scale;
    const h  = img.height * scale;
    const ox = (width  - w) / 2;
    const oy = (height - h) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, ox, oy, w, h);
    const pixels = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    // Count opaque pixels first so we allocate the exact buffer size
    const gap = config.gap;
    let capacity = 0;
    for (let py = 0; py < height; py += gap)
        for (let px = 0; px < width; px += gap)
            if (pixels[(py * width + px) * 4 + 3] > 128) capacity++;

    const b = createParticleBuffers(capacity);
    let i = 0;

    for (let py = 0; py < height; py += gap) {
        for (let px = 0; px < width; px += gap) {
            if (pixels[(py * width + px) * 4 + 3] <= 128) continue;

            b.x[i]           = Math.random() * canvasW;
            b.y[i]           = Math.random() * canvasH;
            b.ox[i]          = px;
            b.oy[i]          = py;
            b.vx[i]          = 0;
            b.vy[i]          = 0;
            b.floatOffset[i] = Math.random() * 100;
            b.twinkle[i]     = Math.random() * Math.PI * 2;
            b.twinkleSpd[i]  = 0.02 + Math.random() * 0.04;
            b.size[i]        = config.sizeBase + Math.random() * config.sizeVariation;
            b.colorIdx[i]    = Math.floor(Math.random() * COLORS.length) as 0 | 1 | 2;
            i++;
        }
    }

    b.count = capacity;
    return b;
}

// ─── Update all particles (pure function, no `this`) ────────────────────────
export function updateParticles(
    b: ParticleBuffers,
    mouseX: number,
    mouseY: number,
    mouseRadiusSq: number,
    friction: number,
    ease: number,
    time: number,
) {
    const t        = time * 0.0008;
    const maxV     = 20;
    const count    = b.count;
    const offCanvas = mouseX < -100;

    for (let i = 0; i < count; i++) {
        let vx = b.vx[i];
        let vy = b.vy[i];
        const cx = b.x[i];
        const cy = b.y[i];

        // Mouse repulsion
        const dx     = mouseX - cx;
        const dy     = mouseY - cy;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouseRadiusSq && distSq > 0) {
            const dist  = Math.sqrt(distSq);
            const force = -mouseRadiusSq / distSq;
            vx += force * (dx / dist);
            vy += force * (dy / dist);
        }

        // Clamp
        if (vx >  maxV) vx =  maxV; else if (vx < -maxV) vx = -maxV;
        if (vy >  maxV) vy =  maxV; else if (vy < -maxV) vy = -maxV;

        // Float
        const fo     = b.floatOffset[i];
        const floatX = Math.sin(t + fo) * 1.5;
        const floatY = Math.cos(t + fo) * 1.5;

        // Parallax (skip when mouse off-canvas)
        const sz = b.size[i];
        const px = offCanvas ? 0 : mouseX * (sz * 0.005);
        const py = offCanvas ? 0 : mouseY * (sz * 0.005);

        const targetX = b.ox[i] + floatX + px;
        const targetY = b.oy[i] + floatY + py;

        b.twinkle[i] += b.twinkleSpd[i];

        vx *= friction;
        vy *= friction;

        b.vx[i] = vx;
        b.vy[i] = vy;
        b.x[i]  = cx + vx + (targetX - cx) * ease;
        b.y[i]  = cy + vy + (targetY - cy) * ease;
    }
}

// ─── Draw all particles — batched by color ──────────────────────────────────
// Instead of beginPath/arc/fill per particle (thousands of canvas state
// changes), we batch all same-color particles into one path and fill once.
// 3 fills total regardless of particle count = massive GPU win.
export function drawParticles(ctx: CanvasRenderingContext2D, b: ParticleBuffers) {
    const count = b.count;

    for (let c = 0; c < COLORS.length; c++) {
        ctx.beginPath();
        ctx.fillStyle = COLORS[c];

        for (let i = 0; i < count; i++) {
            if (b.colorIdx[i] !== c) continue;
            const twinkleFactor = 0.8 + Math.sin(b.twinkle[i]) * 0.2;
            const r = b.size[i] * twinkleFactor;
            ctx.moveTo(b.x[i] + r, b.y[i]);          // arc needs moveTo to avoid lines
            ctx.arc(b.x[i], b.y[i], r, 0, Math.PI * 2);
        }

        ctx.fill();
    }
}