import { MetadataRoute } from "next";

const MONTHS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://how-log.com";
    const now = new Date();
    const currentYear = now.getFullYear();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${baseUrl}/tools/days-between`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/tools/day-of-week`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/tools/age-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/tools/business-days`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ];

    // Programmatic date pages (current ± 5 years, 1st of each month for sitemap)
    const datePages: MetadataRoute.Sitemap = [];
    for (let y = currentYear - 5; y <= currentYear + 2; y++) {
        for (let m = 0; m < 12; m++) {
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                datePages.push({
                    url: `${baseUrl}/date/${y}/${MONTHS[m]}/${d}`,
                    lastModified: now,
                    changeFrequency: "yearly",
                    priority: y === currentYear ? 0.7 : 0.5,
                });
            }
        }
    }

    return [...staticPages, ...datePages];
}
