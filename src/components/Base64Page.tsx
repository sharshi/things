import { useState } from 'react';
import '../styles.css';

const Base64Page = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleEncode = () => {
        setOutputText(btoa(inputText));
    };

    const handleDecode = () => {
        try {
            setOutputText(atob(inputText));
        } catch (e) {
            setOutputText('Invalid base64 string');
        }
    };

    return (
        <div className="base64-page-container">
            <h1>Base64 Encode/Decode</h1>
            <textarea
                placeholder="Enter text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="base64-page-textarea"
            />
            <div className="base64-page-button-container">
                <button onClick={handleEncode} className="base64-page-button">Encode</button>
                <button onClick={handleDecode} className="base64-page-button">Decode</button>
            </div>
            <textarea
                placeholder="Result"
                value={outputText}
                readOnly
                className="base64-page-textarea"
            />
        </div>
    );
};

export default Base64Page;
