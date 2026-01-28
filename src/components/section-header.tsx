import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-8 sm:mb-10 md:mb-16 px-2 sm:px-0", className)}>
      {badge && (
        <div className="mb-5 sm:mb-6">
          <span className="inline-block text-xs sm:text-sm font-medium uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            {badge}
          </span>
        </div>
      )}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5"
        style={{ fontFamily: "TanNimbus, sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-casual leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
