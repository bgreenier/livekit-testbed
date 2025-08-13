import { ResponsiveTimer, type ResponsiveTimerProps } from '../index';

export interface CountdownProps extends Omit<ResponsiveTimerProps, 'durationMs'> {
    /**
     * Duration in milliseconds for the countdown
     */
    durationMs: number;
}

export function Countdown(props: CountdownProps) {
    return <ResponsiveTimer {...props} />;
}
