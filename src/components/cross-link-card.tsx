import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CrossLinkCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  className?: string
}

export function CrossLinkCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: CrossLinkCardProps) {
  const isExternal = href.startsWith("http")
  const LinkComponent = isExternal ? "a" : Link
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href }

  return (
    <LinkComponent
      {...linkProps}
      className={cn(
        "group block p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl",
        "bg-card/80 warm-shadow hover:warm-shadow-enhanced",
        "border border-primary/10 hover:border-primary/20",
        "transition-all duration-300 hover:-translate-y-1",
        // Ensure touch target is at least 44px
        "min-h-[44px]",
        className
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-handwritten text-base sm:text-lg md:text-xl text-primary mb-0.5 sm:mb-1 group-hover:text-primary/80 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-casual line-clamp-2">
            {description}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5 sm:mt-1" />
      </div>
    </LinkComponent>
  )
}
