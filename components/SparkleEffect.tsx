import React from 'react';

const COLORS = ['#67E8F9', '#F472B6', '#818CF8', '#A3E635', '#FBBF24'];

const SparkleEffect: React.FC = () => {
    const sparkles = Array.from({ length: 30 });

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40">
            {sparkles.map((_, i) => {
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                const size = Math.random() * 8 + 4;
                const duration = Math.random() * 1.5 + 0.5;
                const delay = Math.random() * 0.5;

                return (
                    <svg
                        key={i}
                        className="absolute animate-sparkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}
                        viewBox="0 0 100 100"
                        fill={color}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8Z" />
                    </svg>
                );
            })}
        </div>
    );
};

export default SparkleEffect;
