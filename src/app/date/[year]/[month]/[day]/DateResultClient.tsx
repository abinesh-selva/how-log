"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DateBreakdown, formatNumber, getMonthSlug } from "@/lib/date-utils";

interface Props {
    dateStr: string;
    breakdown: DateBreakdown;
    funFacts: string[];
    year: number;
    monthIndex: number;
    day: number;
}

export default function DateResultClient({
    dateStr,
    breakdown,
    funFacts,
    year,
    monthIndex,
    day,
}: Props) {
    const router = useRouter();
    const [tickingSeconds, setTickingSeconds] = useState(breakdown.seconds);
    const [newDate, setNewDate] = useState("");

    // Live ticking counter
    useEffect(() => {
        const target = new Date(year, monthIndex, day);
        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.abs(now.getTime() - target.getTime());
            setTickingSeconds(Math.floor(diff / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [year, monthIndex, day]);

    const handleNewDate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDate) return;
        const date = new Date(newDate);
        if (isNaN(date.getTime())) return;
        router.push(
            `/date/${date.getFullYear()}/${getMonthSlug(date.getMonth())}/${date.getDate()}`
        );
    };

    // Build adjacent links
    const targetDate = new Date(year, monthIndex, day);
    const prevDay = new Date(targetDate);
    prevDay.setDate(prevDay.getDate() - 1);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const allBreakdownItems = [
        { raw: breakdown.years, value: formatNumber(breakdown.years), label: "Years", unit: "years" },
        { raw: breakdown.months, value: formatNumber(breakdown.months), label: "Months", unit: "months" },
        { raw: breakdown.weeks, value: formatNumber(breakdown.weeks), label: "Weeks", unit: "weeks" },
        { raw: breakdown.totalDays, value: formatNumber(breakdown.totalDays), label: "Days", unit: "days" },
        { raw: breakdown.totalHours, value: formatNumber(breakdown.totalHours), label: "Hours", unit: "hours" },
        { raw: breakdown.totalMinutes, value: formatNumber(breakdown.totalMinutes), label: "Minutes", unit: "minutes" },
    ];

    // Filter out zero-value metrics
    const breakdownItems = allBreakdownItems.filter((item) => item.raw > 0);

    // Pick the most significant non-zero unit for the hero
    const heroMetric = breakdownItems[0] || { raw: 0, value: "0", label: "Days", unit: "days" };

    // Build sub-line from non-zero metrics (skip the hero metric)
    const subMetrics = breakdownItems.slice(1, 4);

    const infoItems = [
        { label: "Day of Week", value: breakdown.dayOfWeek },
        { label: "Zodiac Sign", value: breakdown.zodiacSign },
        { label: "Chinese Zodiac", value: breakdown.chineseZodiac },
        { label: "Generation", value: breakdown.generation },
    ];

    const shareText = `${dateStr} was ${heroMetric.value} ${heroMetric.unit} ago — that's ${formatNumber(breakdown.totalDays)} days!`;
    const shareUrl =
        typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className="container result-page">
            {/* Hero result */}
            <section className="result-hero animate-fade-in-up">
                <p className="result-date-label">
                    {dateStr} {breakdown.isPast ? "was" : "is in"}
                </p>
                <div className="result-main-number gradient-text">
                    {heroMetric.value}
                </div>
                <div className="result-main-unit">
                    {breakdown.isPast ? `${heroMetric.unit} ago` : `${heroMetric.unit} from now`}
                </div>
                {subMetrics.length > 0 && (
                    <p className="result-sub">
                        {subMetrics.map((m, i) => (
                            <span key={m.label}>{i > 0 ? " · " : ""}{m.value} {m.unit}</span>
                        ))}
                    </p>
                )}
                <p className="result-ticker">
                    ⏱ ...and {formatNumber(tickingSeconds)} seconds {breakdown.isPast ? "ago" : "to go"} (ticking live)
                </p>
            </section>

            {/* Breakdown Grid */}
            <section>
                <div className="section-title">Time Breakdown</div>
                <div className="breakdown-grid">
                    {breakdownItems.map((item, i) => (
                        <div
                            key={item.label}
                            className={`breakdown-card glass-card stagger-${i + 1}`}
                        >
                            <div className="breakdown-value">{item.value}</div>
                            <div className="breakdown-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Share bar */}
            <section className="share-bar animate-fade-in-up stagger-4">
                <button
                    className="share-btn btn btn-secondary"
                    onClick={() => navigator.clipboard?.writeText(shareUrl)}
                >
                    📋 Copy Link
                </button>
                <a
                    className="share-btn btn btn-secondary"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    𝕏 Tweet
                </a>
                <a
                    className="share-btn btn btn-secondary"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📘 Share
                </a>
            </section>

            {/* Fun Facts */}
            <section style={{ marginTop: "var(--space-xl)" }}>
                <div className="section-title">Fun Facts</div>
                <div className="facts-grid">
                    {funFacts.map((fact, i) => (
                        <div key={i} className={`fact-item glass-card animate-fade-in-up stagger-${i + 1}`}>
                            {fact}
                        </div>
                    ))}
                </div>
            </section>

            {/* Date Info */}
            <section style={{ marginTop: "var(--space-2xl)" }}>
                <div className="section-title">Date Info</div>
                <div className="info-grid">
                    {infoItems.map((item, i) => (
                        <div key={item.label} className={`info-card glass-card animate-fade-in-up stagger-${i + 1}`}>
                            <div className="info-card-label">{item.label}</div>
                            <div className="info-card-value">{item.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Adjacent dates navigation */}
            <section style={{ marginTop: "var(--space-2xl)" }}>
                <div className="section-title">Nearby Dates</div>
                <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link
                        href={`/date/${prevDay.getFullYear()}/${getMonthSlug(prevDay.getMonth())}/${prevDay.getDate()}`}
                        className="btn btn-secondary"
                    >
                        ← {prevDay.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </Link>
                    <Link
                        href={`/date/${nextDay.getFullYear()}/${getMonthSlug(nextDay.getMonth())}/${nextDay.getDate()}`}
                        className="btn btn-secondary"
                    >
                        {nextDay.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} →
                    </Link>
                </div>
            </section>

            {/* Try Another */}
            <section className="try-another">
                <div className="section-title">Try Another Date</div>
                <form onSubmit={handleNewDate}>
                    <div className="calc-input-group">
                        <span className="calc-input-icon">📅</span>
                        <input
                            type="date"
                            className="calc-input"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            aria-label="Select another date"
                        />
                        <button type="submit" className="calc-submit">
                            Calculate →
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
