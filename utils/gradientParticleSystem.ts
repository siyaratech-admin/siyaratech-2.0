import { ParticleConfig } from '../types/particle';

export class GradientParticle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    dx: number;
    dy: number;
    distance: number;
    force: number;
    angle: number;
    floatOffset: number;
    twinkle: number;
    twinkleSpeed: number;

    constructor(x: number, y: number, color: string, size: number) {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.size = size;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.floatOffset = Math.random() * 100;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.02 + Math.random() * 0.04;
    }

    update(mouse: { x: number; y: number }, config: ParticleConfig, time: number) {
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;

        const mouseRadiusSq = config.mouseRadius * config.mouseRadius;

        if (this.distance < mouseRadiusSq) {
            this.force = -mouseRadiusSq / this.distance;
            const angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(angle);
            this.vy += this.force * Math.sin(angle);
        }

        const floatX = Math.sin(time * 0.003 + this.floatOffset) * 2;
        const floatY = Math.cos(time * 0.003 + this.floatOffset) * 2;

        // Parallax Effect
        let parallaxX = 0;
        let parallaxY = 0;

        if (mouse.x > -1000 && mouse.y > -1000) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            parallaxX = (mouse.x - centerX) * (this.size * 0.02);
            parallaxY = (mouse.y - centerY) * (this.size * 0.02);
        }

        const targetX = this.originX + floatX + parallaxX;
        const targetY = this.originY + floatY + parallaxY;

        // Update twinkle
        this.twinkle += this.twinkleSpeed;

        this.x += (this.vx *= config.friction) + (targetX - this.x) * config.ease;
        this.y += (this.vy *= config.friction) + (targetY - this.y) * config.ease;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        // Twinkle effect
        const twinkleFactor = 0.8 + Math.sin(this.twinkle) * 0.2;
        const currentSize = this.size * twinkleFactor;

        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

export const initGradientParticlesFromImage = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageElement: HTMLImageElement,
    config: ParticleConfig
): GradientParticle[] => {
    const particles: GradientParticle[] = [];

    const scale = Math.min(width / imageElement.width, height / imageElement.height) * 1;
    const w = imageElement.width * scale;
    const h = imageElement.height * scale;
    const x = (width - w) / 2;
    const y = (height - h) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imageElement, x, y, w, h);

    const pixels = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    // Gradient colors
    const colors = ['#833AB4', '#FD1D1D', '#FCB045'];

    // Use gap from config
    const gap = config.gap;

    for (let py = 0; py < height; py += gap) {
        for (let px = 0; px < width; px += gap) {
            const index = (py * width + px) * 4;
            const alpha = pixels[index + 3];

            if (alpha > 128) {
                // Assign random color from the palette for a "mixed" look
                const color = colors[Math.floor(Math.random() * colors.length)];

                // Use size from config
                const size = config.sizeBase + Math.random() * config.sizeVariation;

                particles.push(new GradientParticle(px, py, color, size));
            }
        }
    }

    return particles;
};
