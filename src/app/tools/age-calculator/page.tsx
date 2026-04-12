"use client";

import { useState } from "react";
import { calculateDateBreakdown, formatNumber, getZodiacSign, getChineseZodiac, getGeneration } from "@/lib/date-utils";

export default function AgeCalculatorPage() {
    const [birthDate, setBirthDate] = useState("");
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
        totalHours: number;
        totalMinutes: number;
        totalSeconds: number;
        nextBirthday: number;
        zodiac: string;
        chineseZodiac: string;
        generation: string;
    } | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!birthDate) return;
        const date = new Date(birthDate);
        if (isNaN(date.getTime())) return;

        const breakdown = calculateDateBreakdown(date);
        const now = new Date();
        let nextBday = new Date(now.getFullYear(), date.getMonth(), date.getDate());
        if (nextBday <= now) {
            nextBday = new Date(now.getFullYear() + 1, date.getMonth(), date.getDate());
        }
        const daysUntilBirthday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        setResult({
            years: breakdown.years,
            months: breakdown.months,
            days: breakdown.totalDays,
            totalDays: breakdown.totalDays,
            totalHours: breakdown.totalHours,
            totalMinutes: breakdown.totalMinutes,
            totalSeconds: breakdown.totalSeconds,
            nextBirthday: daysUntilBirthday,
            zodiac: getZodiacSign(date.getMonth() + 1, date.getDate()),
            chineseZodiac: getChineseZodiac(date.getFullYear()),
            generation: getGeneration(date.getFullYear()),
        });
    };

    return (
        <div className="container">
            <div className="tool-page">
                <h1 className="animate-fade-in-up">
                    <span className="gradient-text">Age</span> Calculator
                </h1>
                <p className="tool-page-desc animate-fade-in-up stagger-1">
                    Find your exact age in years, months, days — plus fun facts about your birthdate.
                </p>

                <form onSubmit={handleCalculate} className="tool-form glass-card animate-fade-in-up stagger-2">
                    <div className="tool-form-row">
                        <label htmlFor="birthDate">Birthday</label>
                        <input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "center" }}>
                        Calculate Age →
                    </button>
                </form>

                {result && (
                    <div className="tool-result glass-card animate-fade-in-up">
                        <div className="tool-result-value gradient-text">{result.years}</div>
                        <div className="tool-result-label">years old</div>

                        <div className="breakdown-grid" style={{ marginTop: "var(--space-xl)" }}>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.months)}</div>
                                <div className="breakdown-label">Months</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.totalDays)}</div>
                                <div className="breakdown-label">Days Alive</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.totalHours)}</div>
                                <div className="breakdown-label">Hours</div>
                            </div>
                            <div className="breakdown-card glass-card">
                                <div className="breakdown-value">{formatNumber(result.totalMinutes)}</div>
                                <div className="breakdown-label">Minutes</div>
                            </div>
                        </div>

                        <div className="info-grid" style={{ marginTop: "var(--space-xl)" }}>
                            <div className="info-card glass-card">
                                <div className="info-card-label">🎂 Next Birthday</div>
                                <div className="info-card-value">{result.nextBirthday} days</div>
                            </div>
                            <div className="info-card glass-card">
                                <div className="info-card-label">Zodiac Sign</div>
                                <div className="info-card-value">{result.zodiac}</div>
                            </div>
                            <div className="info-card glass-card">
                                <div className="info-card-label">Chinese Zodiac</div>
                                <div className="info-card-value">{result.chineseZodiac}</div>
                            </div>
                            <div className="info-card glass-card">
                                <div className="info-card-label">Generation</div>
                                <div className="info-card-value">{result.generation}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
