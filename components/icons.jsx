import React from 'react';

export const LoadingSpinnerIcon = ({ className = 'w-5 h-5' }) => (
    React.createElement('svg', { className: `animate-spin ${className}`, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
        React.createElement('circle', { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        React.createElement('path', { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
    )
);

export const SparklesIcon = ({ className = 'w-5 h-5' }) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 24 24", fill: "currentColor" },
        React.createElement('path', { fillRule: "evenodd", d: "M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.846.813l2.846-.813a.75.75 0 01.544.721v2.846l-.813 2.846a3.75 3.75 0 00.813 2.846l2.846.813a.75.75 0 01.721.544v.813l-2.846.813a3.75 3.75 0 00-2.846.813l-.813 2.846a.75.75 0 01-.544.721h-.813l-.813-2.846a3.75 3.75 0 00-2.846-.813l-2.846.813a.75.75 0 01-.721-.544v-.813l2.846-.813a3.75 3.75 0 00.813-2.846l.813-2.846V7.221a.75.75 0 01.721-.544zM4.125 9.375a.75.75 0 01.75 0l1.5 1.5a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 010-1.06l1.5-1.5a.75.75 0 01.75 0zm14.625 1.875a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 010-1.06l1.5-1.5a.75.75 0 011.06 0l1.5 1.5z", clipRule: "evenodd" })
    )
);
