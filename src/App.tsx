import gatherLogo from './assets/gather.svg'
import './App.css'
import { Countdown } from './components/ResponsiveTimer/variants/Countdown'
import { CurrentTime } from './components/ResponsiveTimer/variants/CurrentTime'
import { useEffect } from 'react';

const durationSeconds = new URLSearchParams(window.location.search).get('durationSeconds') ?? "30";

function App() {
  useEffect(function startRecordingOnLoad() {
    console.log("START_RECORDING");
  }, []);

  return (
    <>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <a href="https://react.dev" target="_blank">
          <img src={gatherLogo} className="logo" alt="Gather logo" />
        </a>
        
        <h1>Livekit Testbed</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' }}>
          
          {/* Current Time Display */}
          <div>
            <h2>Current Time (High Precision)</h2>
            <CurrentTime className="current-time-display" />
          </div>
          
          {/* Countdown Timer */}
          <div>
            {durationSeconds && (
              <Countdown 
                durationMs={Number(durationSeconds) * 1000}
                className="countdown-display"
                onComplete={() => {
                  console.log("END_RECORDING");
                }}
              />
            )}
          </div>
          
        </div>
        
        <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#666' }}>
          <p>All timers use <code>requestAnimationFrame</code> for high-precision updates</p>
          <p>Notice the smooth centisecond precision in all displays</p>
          <p>Specify <code>durationSeconds</code> as a query parameter to change the duration (in seconds)</p>
        </div>
      </div>
    </>
  )
}

export default App
