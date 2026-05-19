"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "sanjaysharmajw@gmail.com";

const contactItems = [
  { tag: "Email", val: EMAIL, action: "Copy", href: null },
  { tag: "LinkedIn", val: "linkedin.com/in/sanjaysharma", action: "Open →", href: "https://linkedin.com/in/sanjaysharma" },
  { tag: "GitHub", val: "github.com/sanjaysharma", action: "Open →", href: "https://github.com/sanjaysharma" },
  { tag: "pub.dev", val: "sanjaysharma.info", action: "Open →", href: "https://pub.dev/publishers/sanjaysharma.info/packages" },
  { tag: "WhatsApp", val: "Message directly", action: "Chat →", href: "https://wa.me/91XXXXXXXXXX" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
    showToast("Message sent — I'll reply soon!");
  };

  return (
    <>
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>

      <section id="contact" className="section" ref={sectionRef}>
        <div className="section-label">
          <span className="num">07</span> Contact
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div className="rv">
            <h2 className="contact-h">
              Have a project?<br />
              Let&apos;s make it <em>real.</em>
            </h2>
            <p className="contact-sub">
              Whether you need a Flutter app, AI integration, or a complete mobile solution —
              I&apos;m available for new projects and consulting.
            </p>

            <div className="contact-items">
              {contactItems.map((item) => (
                <div key={item.tag} className="contact-item">
                  <div className="contact-item-left">
                    <span className="contact-item-tag">{item.tag}</span>
                    <span className="contact-item-val">{item.val}</span>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item-action"
                    >
                      {item.action}
                    </a>
                  ) : (
                    <button
                      className="contact-item-action"
                      onClick={() => {
                        navigator.clipboard.writeText(EMAIL);
                        showToast("Copied: " + EMAIL);
                      }}
                    >
                      {item.action} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="rv d2">
            {sent ? (
              <div style={{ paddingTop: "40px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--fd)", fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>
                  Message sent!
                </h3>
                <p style={{ fontSize: ".88rem", color: "var(--t2)", marginBottom: "20px" }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button className="btn-ghost" onClick={() => setSent(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group" style={{ borderBottom: "1px solid var(--ln)" }}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group" style={{ borderBottom: "1px solid var(--ln)" }}>
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Flutter App Development" required />
                </div>
                <div className="form-group" style={{ borderBottom: "1px solid var(--ln)" }}>
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell me about your project…" required />
                </div>
                <button type="submit" className="form-submit" disabled={sending}>
                  {sending ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
