/**
 * Core date calculation engine for How-Log
 * All the math for date differences, business days, zodiac, etc.
 */

export interface DateBreakdown {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;
    isPast: boolean;
    dayOfWeek: string;
    zodiacSign: string;
    chineseZodiac: string;
    generation: string;
}

export interface DaysBetweenResult {
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    minutes: number;
    seconds: number;
    businessDays: number;
}

const DAYS_OF_WEEK = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
];

const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

const MONTH_DISPLAY = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const ZODIAC_SIGNS = [
    { sign: 'Capricorn', emoji: '♑', start: [1, 1], end: [1, 19] },
    { sign: 'Aquarius', emoji: '♒', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', emoji: '♓', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', emoji: '♈', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', emoji: '♉', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', emoji: '♊', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', emoji: '♋', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', emoji: '♌', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', emoji: '♍', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', emoji: '♎', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', emoji: '♏', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', emoji: '♐', start: [11, 22], end: [12, 21] },
    { sign: 'Capricorn', emoji: '♑', start: [12, 22], end: [12, 31] },
];

const CHINESE_ZODIAC = [
    'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox',
    'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'
];

const CHINESE_ZODIAC_EMOJI: Record<string, string> = {
    Monkey: '🐒', Rooster: '🐓', Dog: '🐕', Pig: '🐖',
    Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇',
    Dragon: '🐲', Snake: '🐍', Horse: '🐴', Goat: '🐐'
};

export function getZodiacSign(month: number, day: number): string {
    for (const z of ZODIAC_SIGNS) {
        const afterStart = month > z.start[0] || (month === z.start[0] && day >= z.start[1]);
        const beforeEnd = month < z.end[0] || (month === z.end[0] && day <= z.end[1]);
        if (afterStart && beforeEnd) {
            return `${z.emoji} ${z.sign}`;
        }
    }
    return '♑ Capricorn';
}

export function getChineseZodiac(year: number): string {
    const animal = CHINESE_ZODIAC[year % 12];
    return `${CHINESE_ZODIAC_EMOJI[animal]} ${animal}`;
}

export function getGeneration(year: number): string {
    if (year >= 2013) return 'Gen Alpha';
    if (year >= 1997) return 'Gen Z';
    if (year >= 1981) return 'Millennial';
    if (year >= 1965) return 'Gen X';
    if (year >= 1946) return 'Baby Boomer';
    if (year >= 1928) return 'Silent Generation';
    return 'Greatest Generation';
}

export function getDayOfWeek(date: Date): string {
    return DAYS_OF_WEEK[date.getDay()];
}

export function getMonthName(monthIndex: number): string {
    return MONTH_DISPLAY[monthIndex];
}

export function getMonthSlug(monthIndex: number): string {
    return MONTHS[monthIndex];
}

export function monthSlugToIndex(slug: string): number {
    return MONTHS.indexOf(slug.toLowerCase());
}

/**
 * Format number with US-style commas. Avoids toLocaleString which
 * produces different output on Node (server) vs browser (client),
 * causing React hydration mismatches.
 */
export function formatNumber(n: number): string {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function calculateDateBreakdown(targetDate: Date): DateBreakdown {
    const now = new Date();
    const isPast = targetDate <= now;
    const earlier = isPast ? targetDate : now;
    const later = isPast ? now : targetDate;

    // Total difference in milliseconds
    const diffMs = later.getTime() - earlier.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calendar-based breakdown
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const weeks = Math.floor(totalDays / 7);

    return {
        years,
        months: years * 12 + months,
        weeks,
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        isPast,
        dayOfWeek: getDayOfWeek(targetDate),
        zodiacSign: getZodiacSign(targetDate.getMonth() + 1, targetDate.getDate()),
        chineseZodiac: getChineseZodiac(targetDate.getFullYear()),
        generation: getGeneration(targetDate.getFullYear()),
    };
}

export function calculateDaysBetween(date1: Date, date2: Date): DaysBetweenResult {
    const earlier = date1 <= date2 ? date1 : date2;
    const later = date1 <= date2 ? date2 : date1;
    const diffMs = later.getTime() - earlier.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalSeconds = Math.floor(diffMs / 1000);

    // Business days (exclude Sat & Sun)
    let businessDays = 0;
    const current = new Date(earlier);
    while (current <= later) {
        const dow = current.getDay();
        if (dow !== 0 && dow !== 6) businessDays++;
        current.setDate(current.getDate() + 1);
    }

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    if (later.getDate() < earlier.getDate()) months--;
    if (months < 0) { years--; months += 12; }

    return {
        days: totalDays,
        weeks: Math.floor(totalDays / 7),
        months: years * 12 + months,
        years,
        hours: Math.floor(diffMs / (1000 * 60 * 60)),
        minutes: Math.floor(diffMs / (1000 * 60)),
        seconds: totalSeconds,
        businessDays,
    };
}

/**
 * Generate static params for programmatic SEO pages
 * Generates dates from startYear to endYear
 */
export function generateDateParams(startYear: number, endYear: number) {
    const params: { year: string; month: string; day: string }[] = [];
    for (let y = startYear; y <= endYear; y++) {
        for (let m = 0; m < 12; m++) {
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                params.push({
                    year: y.toString(),
                    month: MONTHS[m],
                    day: d.toString(),
                });
            }
        }
    }
    return params;
}

/**
 * Format a date for display: "January 1, 2000"
 */
export function formatDateDisplay(year: number, month: number, day: number): string {
    return `${MONTH_DISPLAY[month]} ${day}, ${year}`;
}

/**
 * Get fun facts for a given time breakdown
 */
export function getFunFacts(breakdown: DateBreakdown): string[] {
    const facts: string[] = [];
    const heartbeats = Math.floor(breakdown.totalMinutes * 72);
    const breaths = Math.floor(breakdown.totalMinutes * 16);
    const moonCycles = (breakdown.totalDays / 29.53).toFixed(1);
    const earthRotations = breakdown.totalDays;
    const orbits = (breakdown.totalDays / 365.25).toFixed(2);

    facts.push(`💓 About ${formatNumber(heartbeats)} heartbeats`);
    facts.push(`🌬️ About ${formatNumber(breaths)} breaths taken`);
    facts.push(`🌙 ${moonCycles} moon cycles`);
    facts.push(`🌍 ${formatNumber(earthRotations)} Earth rotations`);
    facts.push(`☀️ ${orbits} trips around the Sun`);

    if (breakdown.totalDays > 365) {
        const leapYears = Math.floor(breakdown.years / 4);
        facts.push(`📅 ${leapYears} leap year${leapYears !== 1 ? 's' : ''} experienced`);
    }

    return facts;
}

/**
 * Get popular upcoming dates for countdown display
 */
export function getPopularCountdowns(): { name: string; emoji: string; date: Date; slug: string }[] {
    const now = new Date();
    const year = now.getFullYear();
    const nextYear = year + 1;

    const events = [
        { name: 'Christmas', emoji: '🎄', month: 11, day: 25 },
        { name: 'New Year', emoji: '🎆', month: 0, day: 1 },
        { name: 'Halloween', emoji: '🎃', month: 9, day: 31 },
        { name: "Valentine's Day", emoji: '💕', month: 1, day: 14 },
        { name: 'Independence Day', emoji: '🇺🇸', month: 6, day: 4 },
        { name: "St. Patrick's Day", emoji: '☘️', month: 2, day: 17 },
        { name: 'Mother\'s Day', emoji: '💐', month: 4, day: 11 },
        { name: 'Father\'s Day', emoji: '👔', month: 5, day: 15 },
    ];

    return events.map(e => {
        let eventDate = new Date(year, e.month, e.day);
        if (eventDate <= now) {
            eventDate = new Date(nextYear, e.month, e.day);
        }
        return {
            name: e.name,
            emoji: e.emoji,
            date: eventDate,
            slug: `/date/${eventDate.getFullYear()}/${MONTHS[e.month]}/${e.day}`,
        };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
}
