import React from 'react';

const AbstractShape = () => {
    return (
        <div className="relative w-[500px] h-[500px] flex items-center justify-center pointer-events-none select-none">
            {/* Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/30 rounded-full blur-[80px]" />

            {/* Petal 1 */}
            <div className="absolute top-0 left-10 w-64 h-80 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] opacity-80 mix-blend-multiply blur-xl animate-float"
                style={{ transform: 'rotate(-15deg)' }} />

            {/* Petal 2 */}
            <div className="absolute top-10 right-0 w-60 h-72 bg-gradient-to-bl from-purple-300 to-blue-600 rounded-[50%] opacity-70 mix-blend-multiply blur-xl animate-float-delayed" />

            {/* Petal 3 */}
            <div className="absolute bottom-0 left-20 w-72 h-64 bg-gradient-to-t from-indigo-300 to-blue-400 rounded-full opacity-75 mix-blend-multiply blur-2xl animate-float"
                style={{ animationDelay: '-5s' }} />

            {/* Central detailed shape (Simulating the crisp ribbon) */}
            <div className="relative z-10 w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-white/40 rounded-full backdrop-blur-md border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-float-delayed"
                    style={{ clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)' }}>
                </div>
            </div>
        </div>
    );
};

export default AbstractShape;
