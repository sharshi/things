export const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Things</h1>
            <p>Welcome to the Things app. Here you can find various tools to help you with your tasks:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px', flexGrow: 1 }}>
                    <strong>Diff Viewer:</strong> Compare two pieces of text and see the differences highlighted.
                </li>
                <li style={{ marginBottom: '10px', flexGrow: 1 }}>
                    <strong>Base64 Encode/Decode:</strong> Encode or decode text to and from Base64 format.
                </li>
                <li style={{ marginBottom: '10px', flexGrow: 1 }}>
                    <strong>Percentage Calculator:</strong> Calculate percentages easily.
                </li>
            </ul>
        </div>
    );
};
