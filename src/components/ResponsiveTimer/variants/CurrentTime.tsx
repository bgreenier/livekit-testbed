import { ResponsiveTimer, type ResponsiveTimerProps } from '../index';

export interface CurrentTimeProps extends Omit<ResponsiveTimerProps, 'durationMs' | 'onComplete'> {
    /**
     * Optional timezone offset in minutes from UTC (default: local timezone)
     */
    timezoneOffset?: number;
}

export function CurrentTime({ timezoneOffset, formatTime, ...props }: CurrentTimeProps) {
    const customFormatTime = formatTime || ((timeMs: number) => {
        const date = timezoneOffset !== undefined 
            ? new Date(timeMs + (timezoneOffset * 60 * 1000))
            : new Date(timeMs);
            
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    });

    return <ResponsiveTimer {...props} formatTime={customFormatTime} />;
}
