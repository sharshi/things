import { useState } from 'react';
import '../styles.css';

const PaceCalculator = () => {
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
    const [pace, setPace] = useState('');
    const [unit, setUnit] = useState('miles');
    const [result, setResult] = useState('');

    const handleCalculatePace = () => {
        const dist = parseFloat(distance);
        const totalSeconds = parseInt(time.hours) * 3600 + parseInt(time.minutes) * 60 + parseInt(time.seconds);

        if (isNaN(dist) || isNaN(totalSeconds) || dist <= 0 || totalSeconds <= 0) {
            setResult('Invalid input');
            return;
        }

        const paceSeconds = totalSeconds / dist;
        const paceMinutes = Math.floor(paceSeconds / 60);
        const paceRemainingSeconds = Math.floor(paceSeconds % 60);

        setResult(`Your Pace: ${paceMinutes}:${paceRemainingSeconds < 10 ? '0' : ''}${paceRemainingSeconds} min/${unit}`);
    };

    const handleCalculateTime = () => {
        const dist = parseFloat(distance);
        const paceParts = pace.split(':');
        const paceMinutes = parseInt(paceParts[0]);
        const paceSeconds = parseInt(paceParts[1]);

        if (isNaN(dist) || isNaN(paceMinutes) || isNaN(paceSeconds) || dist <= 0 || paceMinutes < 0 || paceSeconds < 0) {
            setResult('Invalid input');
            return;
        }

        const totalSeconds = (paceMinutes * 60 + paceSeconds) * dist;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setResult(`Total Time: ${hours}h ${minutes}m ${seconds}s`);
    };

    const handleCalculateDistance = () => {
        const totalSeconds = parseInt(time.hours) * 3600 + parseInt(time.minutes) * 60 + parseInt(time.seconds);
        const paceParts = pace.split(':');
        const paceMinutes = parseInt(paceParts[0]);
        const paceSeconds = parseInt(paceParts[1]);

        if (isNaN(totalSeconds) || isNaN(paceMinutes) || isNaN(paceSeconds) || totalSeconds <= 0 || paceMinutes < 0 || paceSeconds < 0) {
            setResult('Invalid input');
            return;
        }

        const paceTotalSeconds = paceMinutes * 60 + paceSeconds;
        const dist = totalSeconds / paceTotalSeconds;

        setResult(`Distance: ${dist.toFixed(2)} ${unit}`);
    };

    const handleUnitChange = (newUnit) => {
        if (newUnit === unit) return;

        const conversionFactor = newUnit === 'miles' ? 1 / 1.60934 : 1.60934;
        setDistance((prevDistance) => (parseFloat(prevDistance) * conversionFactor).toFixed(2));
        setUnit(newUnit);
    };

    return (
        <div className="pace-calculator-container">
            <h1>Pace Calculator</h1>
            <div className="pace-calculator-inputs">
                <input
                    type="text"
                    placeholder="Distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="pace-calculator-input"
                />
                <div className="pace-calculator-time-inputs">
                    <input
                        type="text"
                        placeholder="Hours"
                        value={time.hours}
                        onChange={(e) => setTime({ ...time, hours: e.target.value })}
                        className="pace-calculator-input"
                    />
                    <input
                        type="text"
                        placeholder="Minutes"
                        value={time.minutes}
                        onChange={(e) => setTime({ ...time, minutes: e.target.value })}
                        className="pace-calculator-input"
                    />
                    <input
                        type="text"
                        placeholder="Seconds"
                        value={time.seconds}
                        onChange={(e) => setTime({ ...time, seconds: e.target.value })}
                        className="pace-calculator-input"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Pace (MM:SS)"
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    className="pace-calculator-input"
                />
                <div className="pace-calculator-unit-toggle">
                    <button onClick={() => handleUnitChange('miles')} className={unit === 'miles' ? 'active' : ''}>Miles</button>
                    <button onClick={() => handleUnitChange('kilometers')} className={unit === 'kilometers' ? 'active' : ''}>Kilometers</button>
                </div>
            </div>
            <div className="pace-calculator-buttons">
                <button onClick={handleCalculatePace} className="pace-calculator-button">Calculate Pace</button>
                <button onClick={handleCalculateTime} className="pace-calculator-button">Calculate Time</button>
                <button onClick={handleCalculateDistance} className="pace-calculator-button">Calculate Distance</button>
            </div>
            <div className="pace-calculator-result">
                {result}
            </div>
        </div>
    );
};

export default PaceCalculator;
