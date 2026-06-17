import Link from "next/link"

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

const ACCENT = {
  coral: { bg: "bg-[var(--coral)]",  ring: "bg-[var(--coral-dark)]" },
  teal:  { bg: "bg-[var(--teal)]",   ring: "bg-[var(--teal-mid)]"   },
  green: { bg: "bg-[var(--green)]",  ring: "bg-[var(--green)]"      },
}

export function ToolPageWrapper({
  title,
  description,
  breadcrumbs,
  children,
  accentColor = "coral",
}: ToolPageWrapperProps) {
  const { bg } = ACCENT[accentColor]

  return (
    <main>
      {/* Page header */}
      <div className={`${bg} relative overflow-hidden py-16 px-5`}>
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white opacity-[0.06]" />
        <div className="absolute right-24 bottom-0 w-32 h-32 rounded-full bg-white opacity-[0.04]" />

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          {breadcrumbs && (
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/40 mb-5">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">›</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <h1 className="text-6xl md:text-5xl font-black text-white leading-tight tracking-tighter">
            {title}
          </h1>
          <p className="text-white/55 mt-3 text-base max-w-xl leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[var(--cream)] min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          {children}
        </div>
      </div>
    </main>
  )
}
