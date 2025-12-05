export interface ParticleConfig {
    gap: number; // Distance between checking pixels (density)
    sizeBase: number; // Base radius of bubbles
    sizeVariation: number; // Random variation in size
    mouseRadius: number; // Interaction radius
    friction: number; // Physics friction (0-1)
    ease: number; // Return speed (0-1)
    glow: boolean; // Enable shadow blur
    bgOpacity: number; // Trail effect intensity
}

export interface CanvasDimensions {
    width: number;
    height: number;
}
