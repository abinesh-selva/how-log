"use client";

import { useState } from "react";
import { getDayOfWeek, getZodiacSign, getChineseZodiac, getGeneration, formatDateDisplay } from "@/lib/date-utils";

export default function DayOfWeekPage() {
    const [dateInput, setDateInput] = useState("");
    const [result, setResult] = useState<{
        dayOfWeek: string;
        dateStr: string;
        zodiac: string;
        chineseZodiac: string;
        generation: string;
        isLeapYear: boolean;
        dayOfYear: number;
        weekNumber: number;
    } | null>(null);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!dateInput) return;
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return;

        const year = date.getFullYear();
        const startOfYear = new Date(year, 0, 0);
        const diff = date.getTime() - startOfYear.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weekNumber = Math.ceil(dayOfYear / 7);
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

        setResult({
            dayOfWeek: getDayOfWeek(date),
            dateStr: formatDateDisplay(year, date.getMonth(), date.getDate()),
            zodiac: getZodiacSign(date.getMonth() + 1, date.getDate()),
            chineseZodiac: getChineseZodiac(year),
            generation: getGeneration(year),
            isLeapYear,
            dayOfYear,
            weekNumber,
        });
    };

    return (
        <div className="container">
            <div className="tool-page">
                <h1 className="animate-fade-in-up">
                    <span className="gradient-text">Day of the Week</span> Calculator
                </h1>
                <p className="tool-page-desc animate-fade-in-up stagger-1">
                    Find out what day of the week any date falls on, plus zodiac and other fun info.
                </p>

                <form onSubmit={handleCalculate} className="tool-form glass-card animate-fade-in-up stagger-2">
                    <div className="tool-form-row">
                        <label htmlFor="dateInput">Date</label>
                        <input
                            id="dateInput"
                            type="date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "center" }}>
                        Find Day →
                    </button>
                </form>

                {result && (
                    <div className="tool-result glass-card animate-fade-in-up">
                        <div className="tool-result-value gradient-text">{result.dayOfWeek}</div>
                        <div className="tool-result-label">{result.dateStr}</div>

                        <div className="info-grid" style={{ marginTop: "var(--space-xl)" }}>
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
                            <div className="info-card glass-card">
                                <div className="info-card-label">Day of Year</div>
                                <div className="info-card-value">Day #{result.dayOfYear}</div>
                            </div>
                            <div className="info-card glass-card">
                                <div className="info-card-label">Week Number</div>
                                <div className="info-card-value">Week {result.weekNumber}</div>
                            </div>
                            <div className="info-card glass-card">
                                <div className="info-card-label">Leap Year?</div>
                                <div className="info-card-value">{result.isLeapYear ? "✅ Yes" : "❌ No"}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
