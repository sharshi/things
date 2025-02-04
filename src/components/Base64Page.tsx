import { useState } from 'react';

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <h1>Base64 Encode/Decode</h1>
            <textarea
                placeholder="Enter text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '80%', boxSizing: 'border-box', marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: '20px' }}>
                <button onClick={handleEncode} style={{ padding: '10px 20px', fontSize: '16px' }}>Encode</button>
                <button onClick={handleDecode} style={{ padding: '10px 20px', fontSize: '16px' }}>Decode</button>
            </div>
            <textarea
                placeholder="Result"
                value={outputText}
                readOnly
                style={{ border: '1px solid black', padding: '10px', minHeight: '150px', width: '80%', boxSizing: 'border-box' }}
            />
        </div>
    );
};

export default Base64Page;
