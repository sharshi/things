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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '20px', boxSizing: 'border-box', width: '100%' }}>
            <h1>Base64 Encode/Decode</h1>
            <textarea
                placeholder="Enter text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="child"
                style={{ border: '1px solid black', padding: '10px', minHeight: '100px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '20px', width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, marginBottom: '20px', width: '100%' }}>
                <button onClick={handleEncode} style={{ padding: '10px 20px', fontSize: '16px' }}>Encode</button>
                <button onClick={handleDecode} style={{ padding: '10px 20px', fontSize: '16px' }}>Decode</button>
            </div>
            <textarea
                placeholder="Result"
                value={outputText}
                readOnly
                className="child"
                style={{ border: '1px solid black', padding: '10px', minHeight: '100px', flexGrow: 1, boxSizing: 'border-box', width: '100%' }}
            />
        </div>
    );
};

export default Base64Page;
