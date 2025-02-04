import { useState } from 'react';

const PercentageCalculator = () => {
    const [baseValue, setBaseValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState('');

    const handleCalculate = () => {
        const base = parseFloat(baseValue);
        const percent = parseFloat(percentage);
        if (!isNaN(base) && !isNaN(percent)) {
            const calculatedResult = (base * percent) / 100;
            setResult(calculatedResult.toString());
        } else {
            setResult('Invalid input');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <h1>Percentage Calculator</h1>
            <input
                type="text"
                placeholder="Enter base value"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                style={{ border: '1px solid black', padding: '10px', width: '80%', boxSizing: 'border-box', marginBottom: '20px' }}
            />
            <input
                type="text"
                placeholder="Enter percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                style={{ border: '1px solid black', padding: '10px', width: '80%', boxSizing: 'border-box', marginBottom: '20px' }}
            />
            <button onClick={handleCalculate} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px' }}>Calculate</button>
            <div style={{ border: '1px solid black', padding: '10px', width: '80%', boxSizing: 'border-box', textAlign: 'center' }}>
                {result}
            </div>
        </div>
    );
};

export default PercentageCalculator;
