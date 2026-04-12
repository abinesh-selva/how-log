"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
    const { theme, toggle } = useTheme();
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    <span className="logo-icon">⏱</span>
                    <span>How-Log</span>
                </Link>

                <button
                    className="nav-toggle"
                    onClick={() => setNavOpen(!navOpen)}
                    aria-label="Toggle navigation"
                >
                    {navOpen ? "✕" : "☰"}
                </button>

                <nav className={`nav ${navOpen ? "open" : ""}`}>
                    <Link href="/tools/days-between" className="nav-link" onClick={() => setNavOpen(false)}>
                        Days Between
                    </Link>
                    <Link href="/tools/day-of-week" className="nav-link" onClick={() => setNavOpen(false)}>
                        Day of Week
                    </Link>
                    <Link href="/tools/age-calculator" className="nav-link" onClick={() => setNavOpen(false)}>
                        Age Calculator
                    </Link>
                    <Link href="/tools/business-days" className="nav-link" onClick={() => setNavOpen(false)}>
                        Business Days
                    </Link>
                    <button
                        className="theme-toggle"
                        onClick={toggle}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                </nav>
            </div>
        </header>
    );
}
