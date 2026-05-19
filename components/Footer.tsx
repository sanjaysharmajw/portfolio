"use client";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Sanjay Sharma</div>
          <p className="footer-brand-sub">
            Senior Android &amp; Flutter Developer. Building premium mobile experiences.
            Available for freelance projects and consulting.
          </p>
        </div>

        <div className="footer-col">
          <h5>Navigate</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#apps">Apps</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Links</h5>
          <ul>
            <li>
              <a href="https://pub.dev/publishers/sanjaysharma.info/packages" target="_blank" rel="noopener noreferrer">
                pub.dev →
              </a>
            </li>
            <li>
              <a href="https://github.com/sanjaysharma" target="_blank" rel="noopener noreferrer">
                GitHub →
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/sanjaysharma" target="_blank" rel="noopener noreferrer">
                LinkedIn →
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@sanjaysharma" target="_blank" rel="noopener noreferrer">
                YouTube →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} Sanjay Sharma · Crafted with precision</p>
        <div className="footer-socials">
          <a href="https://github.com/sanjaysharma" target="_blank" rel="noopener noreferrer" className="footer-social">GitHub</a>
          <a href="https://linkedin.com/in/sanjaysharma" target="_blank" rel="noopener noreferrer" className="footer-social">LinkedIn</a>
          <a href="https://pub.dev/publishers/sanjaysharma.info/packages" target="_blank" rel="noopener noreferrer" className="footer-social">pub.dev</a>
        </div>
      </div>
    </footer>
  );
}
