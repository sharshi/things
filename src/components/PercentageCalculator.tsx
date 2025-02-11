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

        setExplanation1(`${calculatedResult1} is ${A}% of ${B}.`);
        setExplanation2(`${A} is ${calculatedResult2}% of ${B}.`);
        setExplanation3(`${calculatedResult3}% is the percentage ${calculatedResult3 >= 0 ? 'increase' : 'decrease'} from ${A} to ${B}.`);
    };

    return (
        <div className="percentage-calculator-container">
            <div className="percentage-calculator-header">
                <h1>Percentage Calculator</h1>
            </div>
            <div className="percentage-calculator-inputs">
                <div className="percentage-calculator-input">
                    {valueA}
                </div>
                <div className="percentage-calculator-input">
                    {valueB}
                </div>
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
