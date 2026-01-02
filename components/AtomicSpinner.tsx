import React from 'react';
import styles from './AtomicSpinner.module.css';

const AtomicSpinner = () => {
    // Brand Palette: Purple, Blue, Pink, Cyan
    const BRAND_COLORS = [
        'rgba(147, 51, 234, 0.8)', // Purple
        'rgba(59, 130, 246, 0.8)', // Blue
        'rgba(236, 72, 153, 0.8)', // Pink
        'rgba(34, 211, 238, 0.8)', // Cyan
        'rgba(168, 85, 247, 0.8)', // Light Purple
        'rgba(147, 51, 234, 0.8)', // Repeat Purple for 6th
    ];

    const circles = [1, 2, 3, 4, 5, 6].map((i) => {
        const color = BRAND_COLORS[(i - 1) % BRAND_COLORS.length];

        return (
            <div
                key={i}
                className={styles.circle}
                style={{
                    transform: `rotateZ(${i / 5 * 360}deg) rotateX(63.435deg)`,
                    color: color, // Passed to CSS via currentColor
                    opacity: 0.9
                }}
            />
        );
    });

    return (
        <div className={styles.view}>
            <div className={`${styles.plane} ${styles.main}`}>
                {circles}
            </div>
        </div>
    );
};

export default AtomicSpinner;
