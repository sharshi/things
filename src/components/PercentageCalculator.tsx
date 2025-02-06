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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '20px', boxSizing: 'border-box', width: '100%' }}>
            <h1>Percentage Calculator</h1>
            <input
                type="text"
                placeholder="Enter base value"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                className="child"
                style={{ border: '1px solid black', padding: '10px', flexGrow: 1, marginBottom: '20px', width: '100%' }}
            />
            <input
                type="text"
                placeholder="Enter percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="child"
                style={{ border: '1px solid black', padding: '10px', flexGrow: 1, marginBottom: '20px', width: '100%' }}
            />
            <button onClick={handleCalculate} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px' }}>Calculate</button>
            <div style={{ border: '1px solid black', padding: '10px', flexGrow: 1, textAlign: 'center', width: '100%' }}>
                {result}
            </div>
        </div>
    );
};

export default PercentageCalculator;
