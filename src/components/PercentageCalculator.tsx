import { useState, useEffect } from 'react';
import '../styles.css';

const PercentageCalculator = () => {
    const [valueA, setValueA] = useState('');
    const [valueB, setValueB] = useState('');
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [result3, setResult3] = useState('');
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
            setResult1('Invalid input');
            setResult2('Invalid input');
            setResult3('Invalid input');
            setExplanation1('');
            setExplanation2('');
            setExplanation3('');
            return;
        }

        if (B === 0) {
            setResult1('Error: Division by zero');
            setResult2('Error: Division by zero');
            setResult3('Error: Division by zero');
            setExplanation1('');
            setExplanation2('');
            setExplanation3('');
            return;
        }

        const calculatedResult1 = (A / 100) * B;
        const calculatedResult2 = (A / B) * 100;
        const calculatedResult3 = ((B - A) / A) * 100;

        setResult1(calculatedResult1.toString());
        setResult2(calculatedResult2.toString());
        setResult3(calculatedResult3.toString());

        setExplanation1(`What is ${A}% of ${B}?`);
        setExplanation2(`${A} is what percent of ${B}?`);
        setExplanation3(`What is the percentage increase/decrease from ${A} to ${B}?`);
    };

    return (
        <div className="percentage-calculator-container">
            <h1>Percentage Calculator</h1>
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
            <div className="percentage-calculator-result">
                {result1}
            </div>
            <textarea
                placeholder="Explanation"
                value={explanation1}
                readOnly
                className="percentage-calculator-input"
            />
            <div className="percentage-calculator-result">
                {result2}
            </div>
            <textarea
                placeholder="Explanation"
                value={explanation2}
                readOnly
                className="percentage-calculator-input"
            />
            <div className="percentage-calculator-result">
                {result3}
            </div>
            <textarea
                placeholder="Explanation"
                value={explanation3}
                readOnly
                className="percentage-calculator-input"
            />
        </div>
    );
};

export default PercentageCalculator;
