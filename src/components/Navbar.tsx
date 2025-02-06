import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/diff" className={location.pathname === '/diff' ? 'active' : ''}>Diff Viewer</Link>
            <Link to="/base64" className={location.pathname === '/base64' ? 'active' : ''}>Base64 Encode/Decode</Link>
            <Link to="/percentage-calculator" className={location.pathname === '/percentage-calculator' ? 'active' : ''}>Percentage Calculator</Link>
        </nav>
    );
};

export default Navbar;
