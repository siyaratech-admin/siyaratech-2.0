import { ParticleConfig } from '../types/particle';
export type { ParticleConfig };

export class Particle {
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
        this.x = Math.random() * window.innerWidth; // Start at random position for "reform" effect
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
        this.floatOffset = Math.random() * 100; // Random phase for floating
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.02 + Math.random() * 0.04;
    }

    update(mouse: { x: number; y: number }, config: ParticleConfig, time: number) {
        // Calculate distance from mouse
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;

        // Physics interaction
        // We compare squared distance to avoid expensive Math.sqrt in the hot loop
        const mouseRadiusSq = config.mouseRadius * config.mouseRadius;

        if (this.distance < mouseRadiusSq) {
            this.force = -mouseRadiusSq / this.distance;
            const angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(angle);
            this.vy += this.force * Math.sin(angle);
        }

        // Idle floating movement
        // Use time and floatOffset to create unique movement for each particle
        // Increased amplitude and speed for "live" effect
        // Idle floating movement - DISABLED
        const floatX = 0;
        const floatY = 0;

        // Parallax Effect
        // Only apply if mouse is within reasonable bounds (interacting)
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

        // Return to origin (spring force)
        this.x += (this.vx *= config.friction) + (targetX - this.x) * config.ease;
        this.y += (this.vy *= config.friction) + (targetY - this.y) * config.ease;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        // Twinkle effect: Pulse size slightly
        const twinkleFactor = 0.8 + Math.sin(this.twinkle) * 0.2; // varies between 0.6 and 1.0
        const currentSize = this.size * twinkleFactor;

        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

export const initParticlesFromImage = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    imageElement: HTMLImageElement,
    config: ParticleConfig
): Particle[] => {
    const particles: Particle[] = [];

    // Optimization: Use a smaller off-screen canvas for analysis
    // This drastically reduces the number of pixels to scan, especially on high-res screens
    const MAX_ANALYSIS_WIDTH = 300;
    const scaleFactor = Math.min(1, MAX_ANALYSIS_WIDTH / width);

    const analysisWidth = Math.floor(width * scaleFactor);
    const analysisHeight = Math.floor(height * scaleFactor);

    const offCanvas = document.createElement('canvas');
    offCanvas.width = analysisWidth;
    offCanvas.height = analysisHeight;
    const offCtx = offCanvas.getContext('2d');

    if (!offCtx) return [];

    // Draw image to off-screen canvas
    // Center and scale image to fit within analysis dimensions
    const imgScale = Math.min(analysisWidth / imageElement.width, analysisHeight / imageElement.height) * 0.8; // 0.8 to give some padding
    const w = imageElement.width * imgScale;
    const h = imageElement.height * imgScale;
    const x = (analysisWidth - w) / 2;
    const y = (analysisHeight - h) / 2;

    offCtx.drawImage(imageElement, x, y, w, h);

    const pixels = offCtx.getImageData(0, 0, analysisWidth, analysisHeight).data;

    // Adjust gap for the smaller analysis resolution
    // We want roughly the same number of particles regardless of resolution
    // So we scale the gap down by the same factor
    const analysisGap = Math.max(2, Math.floor(config.gap * scaleFactor));

    // Iterate through pixels
    for (let py = 0; py < analysisHeight; py += analysisGap) {
        for (let px = 0; px < analysisWidth; px += analysisGap) {
            const index = (py * analysisWidth + px) * 4;
            const alpha = pixels[index + 3];

            // If pixel is visible
            if (alpha > 128) {
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const color = `rgb(${red}, ${green}, ${blue})`;

                // Randomize size slightly for "bubble" effect
                const size = config.sizeBase + Math.random() * config.sizeVariation;

                // Map back to full screen coordinates
                const finalX = px / scaleFactor;
                const finalY = py / scaleFactor;

                particles.push(new Particle(finalX, finalY, color, size));
            }
        }
    }

    return particles;
};
