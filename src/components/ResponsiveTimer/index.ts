import { useLayoutEffect, useRef, useCallback } from "react";
import { createElement } from "react";

export interface ResponsiveTimerProps {
    /**
     * An optional duration in milliseconds. If specified, the timer will count down from this value to zero.
     * 
     * Note: If not specified, the timer will instead just display the current time.
     */
    durationMs?: number;
    /**
     * Optional callback when countdown reaches zero
     */
    onComplete?: () => void;
    /**
     * Optional custom formatting function for the display
     */
    formatTime?: (timeMs: number) => string;
    /**
     * CSS class name for styling
     */
    className?: string;
}

const defaultFormatTime = (timeMs: number): string => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeMs % 1000) / 10); // Show centiseconds for precision
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
};

const formatCurrentTime = (timeMs: number): string => {
    const date = new Date(timeMs);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export function ResponsiveTimer({ 
    durationMs, 
    onComplete, 
    formatTime, 
    className = "" 
}: ResponsiveTimerProps) {
    const displayRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number | undefined>(undefined);
    const isCountdownRef = useRef<boolean>(!!durationMs);
    
    const updateDisplay = useCallback(() => {
        if (!displayRef.current) return;
        
        const now = performance.now();
        
        if (isCountdownRef.current && durationMs) {
            // Countdown mode
            if (!startTimeRef.current) {
                startTimeRef.current = now;
            }
            
            const elapsed = now - startTimeRef.current;
            const remaining = Math.max(0, durationMs - elapsed);
            
            const formatter = formatTime || defaultFormatTime;
            displayRef.current.textContent = formatter(remaining);
            
            if (remaining <= 0) {
                onComplete?.();
                return; // Stop the animation loop
            }
        } else {
            // Current time mode
            const formatter = formatTime || formatCurrentTime;
            displayRef.current.textContent = formatter(Date.now());
        }
        
        // Schedule next frame
        animationFrameRef.current = requestAnimationFrame(updateDisplay);
    }, [durationMs, onComplete, formatTime]);
    
    useLayoutEffect(() => {
        // Start the animation loop
        animationFrameRef.current = requestAnimationFrame(updateDisplay);
        
        // Cleanup function
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [updateDisplay]);
    
    return createElement('div', {
        ref: displayRef,
        className: `responsive-timer ${className}`,
        style: {
            fontFamily: 'monospace',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            userSelect: 'none'
        }
    }, isCountdownRef.current ? 
        (formatTime || defaultFormatTime)(durationMs || 0) : 
        (formatTime || formatCurrentTime)(Date.now())
    );
}