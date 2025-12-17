"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

type Effect = "default" | "spark" | "wave" | "vortex"
type AdditionalEffect = "explode" | "scatter" | "implode" | "spiral" | "morph"
type ColorMode = "default" | "sapphire" | "gold"

export default function V0ParticleAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [currentEffect, setCurrentEffect] = useState<Effect>("default")
    const [activeEffects, setActiveEffects] = useState<{ [key in AdditionalEffect]?: boolean }>({})
    const [colorMode, setColorMode] = useState<ColorMode>("default")
    const sceneRef = useRef<{
        scene: THREE.Scene
        camera: THREE.PerspectiveCamera
        renderer: THREE.WebGLRenderer
        points: THREE.Points
        geometry: THREE.BufferGeometry
        originalPositions: Float32Array
        velocities: Float32Array
        phases: Float32Array
        intersectionPoint: THREE.Vector3 | null
        rotationX: number
        rotationY: number
        isDragging: boolean
        previousMouseX: number
        previousMouseY: number
        particleCount: number
    } | null>(null)

    const currentEffectRef = useRef<Effect>(currentEffect)
    const activeEffectsRef = useRef<{ [key in AdditionalEffect]?: boolean }>(activeEffects)
    const colorModeRef = useRef<ColorMode>(colorMode)

    // Clamp utility
    const clamp = (value: number, min: number, max: number) => {
        return Math.max(min, Math.min(max, value))
    }

    useEffect(() => {
        currentEffectRef.current = currentEffect
    }, [currentEffect])

    useEffect(() => {
        activeEffectsRef.current = activeEffects
    }, [activeEffects])

    useEffect(() => {
        colorModeRef.current = colorMode
    }, [colorMode])

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setSize(canvas.width, canvas.height)
        renderer.setClearColor(0x000000, 0)

        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

        // Load Logo Image
        const img = new Image();
        img.src = "/static_images/logo.png";
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            // Determine particle count based on screen size
            const isMobile = window.innerWidth < 768;
            const maxParticles = isMobile ? 3000 : 8000;

            // Analyze Image Data
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
            if (!ctx) return;

            // Resize for analysis
            const aspect = img.width / img.height;
            const tempWidth = 350;
            const tempHeight = tempWidth / aspect;
            tempCanvas.width = tempWidth;
            tempCanvas.height = tempHeight;

            ctx.drawImage(img, 0, 0, tempWidth, tempHeight);
            const imgData = ctx.getImageData(0, 0, tempWidth, tempHeight);
            const data = imgData.data;

            // 1. First pass: Find bounding box of visible pixels
            let minX = tempWidth, maxX = 0, minY = tempHeight, maxY = 0;
            const validPixelsPositions: { x: number, y: number, r: number, g: number, b: number }[] = [];

            for (let y = 0; y < tempHeight; y++) {
                for (let x = 0; x < tempWidth; x++) {
                    const i = (y * tempWidth + x) * 4;
                    const alpha = data[i + 3];
                    if (alpha > 128) { // Visible threshold
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                        validPixelsPositions.push({
                            x, y,
                            r: data[i] / 255,
                            g: data[i + 1] / 255,
                            b: data[i + 2] / 255
                        });
                    }
                }
            }

            // Calculate content dimensions
            const contentWidth = maxX - minX;
            const contentHeight = maxY - minY;
            const contentCenterX = minX + contentWidth / 2;
            const contentCenterY = minY + contentHeight / 2;

            // Calculate visible world dimensions at z=0 (camera at 2.5)
            // FOV 75, z=2.5
            const camZ = 2.5;
            const vFOV = 75 * (Math.PI / 180);
            const visibleHeight = 2 * Math.tan(vFOV / 2) * camZ;
            const visibleWidth = visibleHeight * (canvas.width / canvas.height);

            // Desired fill: 200% of the screen width (2.5x of 0.8)
            const targetWidth = visibleWidth * 2.0;
            // The normalized width will be roughly 1.0 after normalization * scale
            // We want (contentWidth * pixelScale) = targetWidth
            // Let's normalize to -0.5 to 0.5 range first

            const numParticles = Math.min(validPixelsPositions.length, maxParticles);
            const positions = new Float32Array(numParticles * 3);
            const colors = new Float32Array(numParticles * 3);
            const phases = new Float32Array(numParticles);
            const velocities = new Float32Array(numParticles * 3);

            for (let i = 0; i < numParticles; i++) {
                // Random sampling
                const sourceIndex = Math.floor(i * (validPixelsPositions.length / numParticles));
                const pixel = validPixelsPositions[sourceIndex];

                // Normalize based on CONTENT bounding box, centered
                // Range becomes approx -0.5 to 0.5
                const normalizedX = (pixel.x - contentCenterX) / contentWidth;
                const normalizedY = -(pixel.y - contentCenterY) / contentHeight * (contentHeight / contentWidth); // Preserve aspect

                // Scale to world size
                // We want the total width (1.0 in normalized space) to match targetWidth
                const scale = targetWidth;

                const px = normalizedX * scale;
                const py = normalizedY * scale;
                const z = (Math.random() - 0.5) * 0.1;

                positions[i * 3] = px;
                positions[i * 3 + 1] = py;
                positions[i * 3 + 2] = z;

                colors[i * 3] = pixel.r;
                colors[i * 3 + 1] = pixel.g;
                colors[i * 3 + 2] = pixel.b;

                phases[i] = Math.random() * Math.PI * 2;
            }

            const originalPositions = positions.slice();

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
            geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

            const material = new THREE.PointsMaterial({
                size: isMobile ? 0.03 : 0.02,
                sizeAttenuation: true, // Perspective size
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending
            })

            const points = new THREE.Points(geometry, material)
            scene.add(points)
            camera.position.set(0, 0, camZ) // Use defined Z

            sceneRef.current = {
                scene,
                camera,
                renderer,
                points,
                geometry,
                originalPositions,
                velocities,
                phases,
                intersectionPoint: null,
                rotationX: 0,
                rotationY: 0,
                isDragging: false,
                previousMouseX: 0,
                previousMouseY: 0,
                particleCount: numParticles,
            }
        };

        // Handle resize properly
        const onResize = () => {
            if (!canvasRef.current || !sceneRef.current) return;
            const w = canvasRef.current.clientWidth;
            const h = canvasRef.current.clientHeight;
            sceneRef.current.camera.aspect = w / h;
            sceneRef.current.camera.updateProjectionMatrix();
            sceneRef.current.renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);

        // Mouse move handler for particle effects
        const handleMouseMove = (event: MouseEvent) => {
            if (!sceneRef.current) return
            const rect = canvas.getBoundingClientRect()
            const offsetX = event.clientX - rect.left
            const offsetY = event.clientY - rect.top
            mouse.x = (offsetX / canvas.clientWidth) * 2 - 1
            mouse.y = -(offsetY / canvas.clientHeight) * 2 + 1
            raycaster.setFromCamera(mouse, camera)
            const intersect = new THREE.Vector3()
            if (raycaster.ray.intersectPlane(plane, intersect)) {
                sceneRef.current.intersectionPoint = intersect
            }
        }
        const handleMouseLeave = () => {
            if (sceneRef.current) {
                sceneRef.current.intersectionPoint = null
            }
        }
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mouseleave", handleMouseLeave)

        // Animation loop
        let animationId: number
        const animate = (timestamp: number) => {
            if (!sceneRef.current) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            const time = timestamp * 0.001
            const {
                geometry,
                points,
                originalPositions,
                velocities,
                phases,
                intersectionPoint,
                rotationX,
                rotationY,
                particleCount,
            } = sceneRef.current

            const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute
            // const colorAttribute = geometry.getAttribute("color") as THREE.BufferAttribute

            const radiusSwirl = 0.01
            const angularSpeed = 1
            const effectRadius = 0.4

            let repelStrength = 0
            if (currentEffectRef.current === "default") {
                repelStrength = 0.05
            } else if (currentEffectRef.current === "spark") {
                repelStrength = 0.5
            }

            const attractStrength = 0.05
            const damping = 0.90

            // Update rotations
            points.rotation.y += (rotationY - points.rotation.y) * 0.1
            points.rotation.x += (rotationX - points.rotation.x) * 0.1

            // Compute inverse quaternion
            const euler = new THREE.Euler(points.rotation.x, points.rotation.y, points.rotation.z, "XYZ")
            const inverseQuaternion = new THREE.Quaternion().setFromEuler(euler).invert()
            let localIntersection: THREE.Vector3 | null = null
            if (intersectionPoint) {
                localIntersection = intersectionPoint.clone().applyQuaternion(inverseQuaternion)
            }

            // Compute factors (simplified for perf)
            const explodeFactor = activeEffectsRef.current.explode ? 1 : 0;
            const scatterFactor = activeEffectsRef.current.scatter ? 1 : 0;
            const implodeFactor = activeEffectsRef.current.implode ? 1 : 0;

            // Updated Particle Loop - Optimized logic
            for (let j = 0; j < particleCount; j++) {
                const idx = j * 3
                const ox = originalPositions[idx]
                const oy = originalPositions[idx + 1]
                const oz = originalPositions[idx + 2]

                // Base gentle movement
                // const theta = angularSpeed * time + phases[j]
                // const swirlDx = radiusSwirl * Math.cos(theta)
                // const swirlDy = radiusSwirl * Math.sin(theta)

                const targetX = ox // + swirlDx
                const targetY = oy // + swirlDy
                const targetZ = oz

                let px = positionAttribute.getX(j)
                let py = positionAttribute.getY(j)
                let pz = positionAttribute.getZ(j)

                let vx = velocities[idx]
                let vy = velocities[idx + 1]
                let vz = velocities[idx + 2]

                // --- Simple Explode/Implode logic ---
                const distToCenterSq = px * px + py * py + pz * pz;
                const distToCenter = Math.sqrt(distToCenterSq);

                if (explodeFactor > 0) {
                    vx += px * 0.02 * explodeFactor;
                    vy += py * 0.02 * explodeFactor;
                    vz += pz * 0.02 * explodeFactor;
                }

                if (scatterFactor > 0) {
                    vx += (Math.random() - 0.5) * 0.02;
                    vy += (Math.random() - 0.5) * 0.02;
                }

                if (implodeFactor > 0 && distToCenter > 0.01) {
                    vx -= px * 0.05;
                    vy -= py * 0.05;
                }

                // --- Mouse Interaction ---
                if (localIntersection) {
                    const dx = px - localIntersection.x
                    const dy = py - localIntersection.y
                    const dz = pz - localIntersection.z
                    const distSq = dx * dx + dy * dy + dz * dz

                    if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
                        const dist = Math.sqrt(distSq);
                        // Repel (Spark/Default)
                        if (currentEffectRef.current === "default" || currentEffectRef.current === "spark") {
                            const force = (1 - dist / effectRadius) * repelStrength;
                            vx += (dx / dist) * force;
                            vy += (dy / dist) * force;
                            vz += (dz / dist) * force;
                        }
                        // Vortex
                        else if (currentEffectRef.current === "vortex") {
                            const vortexForce = 0.02 * (1 - dist / effectRadius);
                            const tangentX = -dy;
                            const tangentY = dx;
                            vx += tangentX * vortexForce;
                            vy += tangentY * vortexForce;
                            vx -= dx * 0.05; // Suck in
                            vy -= dy * 0.05;
                        }
                    }
                }

                // --- Return to Home ---
                // Only if not exploded far away
                if (explodeFactor === 0) {
                    vx += (targetX - px) * attractStrength;
                    vy += (targetY - py) * attractStrength;
                    vz += (targetZ - pz) * attractStrength;
                }

                // Physics update
                vx *= damping
                vy *= damping
                vz *= damping

                px += vx
                py += vy
                pz += vz

                positionAttribute.setXYZ(j, px, py, pz)
                velocities[idx] = vx
                velocities[idx + 1] = vy
                velocities[idx + 2] = vz
            }

            positionAttribute.needsUpdate = true
            renderer.render(scene, camera)
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("mouseleave", handleMouseLeave)
            if (sceneRef.current) {
                sceneRef.current.geometry.dispose()
                // sceneRef.current.material.dispose() 
                sceneRef.current.renderer.dispose()
            }
        }
    }, [])

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-black">
            {/* Controls overlay remains same, simplified for brevity in this optimized version if needed, keeping mostly same structure */}
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            // ... Mouse handlers ...
            />
            {/* ... UI Controls ... */}
            <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10">
                <select
                    value={currentEffect}
                    onChange={(e) => setCurrentEffect(e.target.value as Effect)}
                    className="px-2.5 py-2.5 text-base bg-white/10 border border-white text-white cursor-pointer backdrop-blur-md rounded-md"
                >
                    <option value="default">Scatter</option>
                    <option value="spark">Spark</option>
                    <option value="vortex">Vortex</option>
                </select>
            </div>
            <div className="absolute bottom-5 left-5 flex flex-col gap-2.5 z-10">
                <button
                    onClick={() => setActiveEffects(p => ({ ...p, explode: !p.explode }))}
                    className="px-4 py-2 text-sm bg-white/10 border border-white/20 text-white rounded-md hover:bg-white/20"
                >
                    Explode {activeEffects.explode ? "ON" : "OFF"}
                </button>
            </div>
        </div>
    )
} 
