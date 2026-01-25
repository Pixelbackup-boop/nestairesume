import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = ({ children, className = "", hoverEffect = true }: GlassCardProps) => {
    return (
        <div className={`
      ${hoverEffect ? 'glass-card' : 'glass-panel'} 
      rounded-2xl p-6 
      ${className}
    `}>
            {children}
        </div>
    );
};

export default GlassCard;
