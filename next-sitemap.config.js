/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://howlongtogo.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://howlongtogo.com"}/sitemap-years.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://howlongtogo.com"}/sitemap-monthday.xml`,
    ],
  },
  exclude: ["/tools/*/result", "/api/*", "/countdown/[id]/edit"],
  transform: async (config, path) => {
    // Year pages and month/day pages get daily refresh
    if (path.startsWith("/date/")) {
      return { loc: path, changefreq: "daily", priority: 0.8, lastmod: new Date().toISOString() }
    }
    // Tool pages are evergreen
    if (path.startsWith("/tools/")) {
      return { loc: path, changefreq: "monthly", priority: 0.9, lastmod: new Date().toISOString() }
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() }
  },
}
