import { useState, useEffect } from 'react';
import '../styles.css';

const PercentageCalculator = () => {
    const [valueA, setValueA] = useState('');
    const [valueB, setValueB] = useState('');
    const [explanation1, setExplanation1] = useState('');
    const [explanation2, setExplanation2] = useState('');
    const [explanation3, setExplanation3] = useState('');

    useEffect(() => {
        handleCalculation();
    }, [valueA, valueB]);

    const handleCalculation = () => {
        const A = parseFloat(valueA);
        const B = parseFloat(valueB);

        if (isNaN(A) || isNaN(B)) {
            setExplanation1('Invalid input');
            setExplanation2('Invalid input');
            setExplanation3('Invalid input');
            return;
        }

        if (B === 0) {
            setExplanation1('Error: Division by zero');
            setExplanation2('Error: Division by zero');
            setExplanation3('Error: Division by zero');
            return;
        }

        const calculatedResult1 = (A / 100) * B;
        const calculatedResult2 = (A / B) * 100;
        const calculatedResult3 = ((B - A) / A) * 100;

        setExplanation1(<span><strong>{calculatedResult1}</strong> is {A}% of {B}.</span>);
        setExplanation2(<span>{A} is <strong>{calculatedResult2}%</strong> of {B}.</span>);
        setExplanation3(<span><strong>{calculatedResult3}%</strong> is the percentage {calculatedResult3 >= 0 ? 'increase' : 'decrease'} from {A} to {B}.</span>);
    };

    return (
        <div className="percentage-calculator-container">
            <div className="percentage-calculator-header">
                <h1>Percentage Calculator</h1>
            </div>
            <div className="percentage-calculator-inputs">0
                <input
                    type="text"
                    placeholder="Enter value A"
                    value={valueA}
                    onChange={(e) => setValueA(e.target.value)}
                    className="percentage-calculator-input"
                />
                <input
                    type="text"
                    placeholder="Enter value B"
                    value={valueB}
                    onChange={(e) => setValueB(e.target.value)}
                    className="percentage-calculator-input"
                />
            </div>
            <div className="percentage-calculator-results">
                <div className="percentage-calculator-output">
                    {explanation1}
                </div>
                <div className="percentage-calculator-output">
                    {explanation2}
                </div>
                <div className="percentage-calculator-output">
                    {explanation3}
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;
