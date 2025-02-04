import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Things</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/diff" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.5em' }}>Diff Viewer</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/base64" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.5em' }}>Base64 Encode/Decode</Link>
                </li>
            </ul>
        </div>
    );
};
