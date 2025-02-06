import { useState } from 'react';
import '../styles.css';

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
        <div className="percentage-calculator-container">
            <h1>Percentage Calculator</h1>
            <input
                type="text"
                placeholder="Enter base value"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                className="percentage-calculator-input"
            />
            <input
                type="text"
                placeholder="Enter percentage"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="percentage-calculator-input"
            />
            <button onClick={handleCalculate} className="percentage-calculator-button">Calculate</button>
            <div className="percentage-calculator-result">
                {result}
            </div>
        </div>
    );
};

export default PercentageCalculator;
