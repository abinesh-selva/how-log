"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMonthSlug, getPopularCountdowns } from "@/lib/date-utils";

export default function HomePage() {
  const router = useRouter();
  const [dateInput, setDateInput] = useState("");
  const [countdowns, setCountdowns] = useState<ReturnType<typeof getPopularCountdowns>>([]);

  useEffect(() => {
    setCountdowns(getPopularCountdowns());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateInput) return;

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return;

    const year = date.getFullYear();
    const month = getMonthSlug(date.getMonth());
    const day = date.getDate();
    router.push(`/date/${year}/${month}/${day}`);
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const tools = [
    {
      icon: "📊",
      title: "Days Between",
      desc: "Calculate the exact duration between two dates",
      href: "/tools/days-between",
    },
    {
      icon: "📅",
      title: "Day of the Week",
      desc: "Find what day any date falls on",
      href: "/tools/day-of-week",
    },
    {
      icon: "🎂",
      title: "Age Calculator",
      desc: "Your exact age in years, months, and days",
      href: "/tools/age-calculator",
    },
    {
      icon: "💼",
      title: "Business Days",
      desc: "Count working days between dates",
      href: "/tools/business-days",
    },
  ];

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title animate-fade-in-up">
          Know your time — <span className="gradient-text">beautifully.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up stagger-1">
          The fastest, most beautiful date calculator on the internet.
          Find how long ago, days between, or count down to any date.
        </p>

        {/* Calculator Input */}
        <form onSubmit={handleSubmit} className="calc-input-wrapper animate-fade-in-up stagger-2">
          <div className="calc-input-group">
            <span className="calc-input-icon">📅</span>
            <input
              type="date"
              className="calc-input"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="Pick a date..."
              aria-label="Select a date"
            />
            <button type="submit" className="calc-submit">
              Calculate →
            </button>
          </div>
        </form>
      </section>

      {/* Tool Cards */}
      <section className="animate-fade-in-up stagger-3">
        <div className="section-title">Date Tools</div>
        <div className="tools-grid">
          {tools.map((tool, i) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`tool-card glass-card animate-fade-in-up stagger-${i + 3}`}
            >
              <span className="tool-card-icon">{tool.icon}</span>
              <div className="tool-card-title">{tool.title}</div>
              <div className="tool-card-desc">{tool.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Countdowns */}
      {countdowns.length > 0 && (
        <section style={{ marginTop: "var(--space-3xl)" }} className="animate-fade-in-up stagger-5">
          <div className="section-title">Popular Countdowns</div>
          <div className="countdown-scroll">
            {countdowns.map((cd) => (
              <Link
                key={cd.name}
                href={cd.slug}
                className="countdown-card glass-card"
              >
                <span className="countdown-emoji">{cd.emoji}</span>
                <div className="countdown-name">{cd.name}</div>
                <div className="countdown-days">{getDaysUntil(cd.date)}d</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* API Banner */}
      <section className="api-banner animate-fade-in-up stagger-6">
        <h3>
          <span className="gradient-text">For Developers</span>
        </h3>
        <p>Free REST API · 1,000 requests/day · JSON responses</p>
        <Link href="/api" className="btn btn-primary">
          Coming Soon →
        </Link>
      </section>
    </div>
  );
}
