import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h4>Product</h4>
          <Link to="/">KeaLedger</Link>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <a href="mailto:support@eterno.nz">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Eterno Limited. All rights reserved.</p>
        <p>Christchurch, New Zealand</p>
      </div>
    </footer>
  );
}
