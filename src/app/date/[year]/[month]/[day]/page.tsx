import { Metadata } from "next";
import {
    monthSlugToIndex,
    formatDateDisplay,
    calculateDateBreakdown,
    getFunFacts,
    formatNumber,
    getMonthSlug,
} from "@/lib/date-utils";
import DateResultClient from "./DateResultClient";

interface Props {
    params: { year: string; month: string; day: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const year = parseInt(params.year);
    const monthIndex = monthSlugToIndex(params.month);
    const day = parseInt(params.day);
    const dateStr = formatDateDisplay(year, monthIndex, day);
    const targetDate = new Date(year, monthIndex, day);
    const breakdown = calculateDateBreakdown(targetDate);

    const title = breakdown.isPast
        ? `How Long Ago Was ${dateStr}? — ${breakdown.years} Years Ago`
        : `How Long Until ${dateStr}? — ${breakdown.years} Years Away`;

    const description = breakdown.isPast
        ? `${dateStr} was ${breakdown.years} years ago. That's ${formatNumber(breakdown.totalDays)} days, ${formatNumber(breakdown.totalHours)} hours, or ${formatNumber(breakdown.totalMinutes)} minutes ago. It was a ${breakdown.dayOfWeek}.`
        : `${dateStr} is ${formatNumber(breakdown.totalDays)} days away. That's ${formatNumber(breakdown.totalHours)} hours, or ${formatNumber(breakdown.totalMinutes)} minutes from now.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
        },
        alternates: {
            canonical: `/date/${params.year}/${params.month}/${params.day}`,
        },
    };
}

// Generate static params for popular dates (for demo: current year ± 5 years)
// In production, expand this to cover 50+ years
export async function generateStaticParams() {
    const params: { year: string; month: string; day: string }[] = [];
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 2;

    // Generate only 1st of each month for initial build speed, ISR handles the rest
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            params.push({
                year: y.toString(),
                month: getMonthSlug(m),
                day: "1",
            });
        }
    }

    // Also add popular dates
    const popular = [
        [2000, 0, 1], [2001, 8, 11], [1969, 6, 20], [1990, 0, 1],
        [1989, 10, 9], [1945, 7, 15], [1963, 10, 22], [1776, 6, 4],
    ];
    popular.forEach(([y, m, d]) => {
        params.push({
            year: y.toString(),
            month: getMonthSlug(m),
            day: d.toString(),
        });
    });

    return params;
}

export default function DatePage({ params }: Props) {
    const year = parseInt(params.year);
    const monthIndex = monthSlugToIndex(params.month);
    const day = parseInt(params.day);
    const targetDate = new Date(year, monthIndex, day);
    const dateStr = formatDateDisplay(year, monthIndex, day);
    const breakdown = calculateDateBreakdown(targetDate);
    const funFacts = getFunFacts(breakdown);

    // Structured data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `How long ago was ${dateStr}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${dateStr} was ${formatNumber(breakdown.totalDays)} days ago (${breakdown.years} years, ${breakdown.months % 12} months).`,
                },
            },
            {
                "@type": "Question",
                name: `What day of the week was ${dateStr}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${dateStr} was a ${breakdown.dayOfWeek}.`,
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DateResultClient
                dateStr={dateStr}
                breakdown={breakdown}
                funFacts={funFacts}
                year={year}
                monthIndex={monthIndex}
                day={day}
            />
        </>
    );
}
