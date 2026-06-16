interface Breadcrumb {
  label: string
  href?: string
}

interface ToolPageWrapperProps {
  title: string
  description: string
  breadcrumbs?: Breadcrumb[]
  children: React.ReactNode
  accentColor?: "coral" | "teal" | "green"
}

const ACCENT_BG = {
  coral: "bg-[var(--coral)]",
  teal:  "bg-[var(--teal)]",
  green: "bg-[var(--green)]",
}

export function ToolPageWrapper({
  title,
  description,
  breadcrumbs,
  children,
  accentColor = "coral",
}: ToolPageWrapperProps) {
  return (
    <main>
      {/* Page header strip */}
      <div className={`${ACCENT_BG[accentColor]} py-10 px-4`}>
        <div className="max-w-3xl mx-auto">
          {breadcrumbs && (
            <nav className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <span>›</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</a>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h1>
          <p className="text-white/70 mt-2 text-base max-w-xl">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {children}
      </div>
    </main>
  )
}
