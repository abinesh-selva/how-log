"use client";

import { useState } from "react";
import { calculateDaysBetween, formatNumber } from "@/lib/date-utils";

export default function DaysBetweenPage() {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [result, setResult] = useState<ReturnType<typeof calculateDaysBetween> | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date1 || !date2) return;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
        setResult(calculateDaysBetween(d1, d2));
    };

    return (
        <div className="container">
            <div className="tool-page">
                <h1 className="animate-fade-in-up">
                    <span className="gradient-text">Days Between</span> Calculator
                </h1>
                <p className="tool-page-desc animate-fade-in-up stagger-1">
                    Calculate the exact number of days, weeks, months, and years between any two dates.
                </p>

                <form onSubmit={handleCalculate} className="tool-form glass-card animate-fade-in-up stagger-2">
                    <div className="tool-form-row">
                        <label htmlFor="date1">Start Date</label>
                        <input
                            id="date1"
                            type="date"
                            value={date1}
                            onChange={(e) => setDate1(e.target.value)}
                            required
                        />
                    </div>
                    <div className="tool-form-row">
                        <label htmlFor="date2">End Date</label>
                        <input
                            id="date2"
                            type="date"
                            value={date2}
                            onChange={(e) => setDate2(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "center" }}>
                        Calculate Days →
                    </button>
                </form>

                {result && (
                    <div className="tool-result glass-card animate-fade-in-up">
                        <div className="tool-result-value gradient-text">{formatNumber(result.days)}</div>
                        <div className="tool-result-label">days between these dates</div>

                        <div className="breakdown-grid" style={{ marginTop: "var(--space-xl)" }}>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.years)}</div>
                                <div className="breakdown-label">Years</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.months)}</div>
                                <div className="breakdown-label">Months</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.weeks)}</div>
                                <div className="breakdown-label">Weeks</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.days)}</div>
                                <div className="breakdown-label">Days</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.hours)}</div>
                                <div className="breakdown-label">Hours</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.businessDays)}</div>
                                <div className="breakdown-label">Business Days</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
