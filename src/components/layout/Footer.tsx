import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="logo-icon">⏱</span>
                            <span>How-Log</span>
                        </div>
                        <p>
                            The fastest, most beautiful way to calculate time. Know your dates,
                            share your milestones, track your moments.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-heading">Tools</h4>
                        <ul className="footer-links">
                            <li><Link href="/tools/days-between">Days Between</Link></li>
                            <li><Link href="/tools/day-of-week">Day of Week</Link></li>
                            <li><Link href="/tools/age-calculator">Age Calculator</Link></li>
                            <li><Link href="/tools/business-days">Business Days</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Popular</h4>
                        <ul className="footer-links">
                            <li><Link href="/date/2000/january/1">Y2K — Jan 1, 2000</Link></li>
                            <li><Link href="/date/2001/september/11">9/11 — Sep 11, 2001</Link></li>
                            <li><Link href="/date/1969/july/20">Moon Landing</Link></li>
                            <li><Link href="/date/1990/january/1">Start of the 90s</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Use</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} How-Log. Built with ♥</span>
                    <span>Know your time — beautifully.</span>
                </div>
            </div>
        </footer>
    );
}
