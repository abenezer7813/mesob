import {
  FaCoffee,
  FaUtensils,
  FaShareAlt,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Brand */}
        <div className="footer-column brand-column">
          <h2>Mesob House</h2>

          <p>
            Sharing traditions from the Ethiopian
            <br />
            highlands — one Gursha at a time.
          </p>

          <div className="coffee-box">
            <FaCoffee className="coffee-icon" />
            <span>
              Traditional Coffee Ceremony daily
              <br />
              at 4:00 PM
            </span>
          </div>
        </div>

        {/* Hospitality Hours */}
        <div className="footer-column">
          <h3>HOSPITALITY HOURS</h3>

          <p>Tuesday – Sunday: 11:30 AM – 11:00 PM</p>

          <p>
            Monday: Reserved for Private
            <br />
            Banquets
          </p>

          <strong>Jebena Buna & Fresh Roasting All Evening</strong>
        </div>

        {/* Guest Account */}
        <div className="footer-column">
          <h3>GUEST ACCOUNT & TRADITIONS</h3>

          <p>Sign In to Mesob Rewards</p>
          <p>Create Member Profile</p>
          <p>Vegan Fasting (Beyaynetu / Tsom)</p>
          <p>House Tej (Pure Honey Wine)</p>
        </div>

        {/* Location */}
        <div className="footer-column location-column">
          <h3>ADDIS LOCATION</h3>

          <p>
            Bole Medhanialem, Addis Ababa &<br />
            express delivery across town.
          </p>

          <a href="tel:+251911234567">
            +251 911 234 567
          </a>

          <div className="social-icons">
            <FaUtensils />
            <FaCoffee />
            <FaShareAlt />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © 2025 Mesob House Habesha Dining. Authentic Ethiopian & Eritrean Heritage.
        </p>

        <div className="footer-links">
          <a href="#">Gursha Hospitality</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Table</a>
        </div>
      </div>

     
    </footer>
  );
}

export default Footer;