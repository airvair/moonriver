import { MenuCategory } from "@/lib/menu-data";
import { MenuItemComponent } from "./menu-item";

interface MenuCategoryComponentProps {
  category: MenuCategory & { sectionType?: "food" | "drinks" };
  note?: string;
  showSectionBadge?: boolean;
}

// Category icons mapping
const categoryIcons: Record<string, string> = {
  "Breakfast": "🌅",
  "Sandwiches": "🥪",
  "Salads": "🥗",
  "Sweets": "🍰",
  "Espresso": "☕",
  "Tea": "🍵",
  "Chocolate": "🍫",
  "Beverages": "🥤",
  "Coffee": "☕",
  "Additions": "✨",
};

export function MenuCategoryComponent({ category, note, showSectionBadge }: MenuCategoryComponentProps) {
  const icon = categoryIcons[category.name] || "🍽️";

  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl opacity-60 animate-pulse" style={{ animationDuration: '3s' }}>
            {icon}
          </span>
          <div className="relative">
            <h3 className="text-3xl font-handwritten text-primary relative inline-block">
              {category.name}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 transform scale-x-50 transition-transform group-hover:scale-x-100" />
            </h3>
            {showSectionBadge && category.sectionType && (
              <span className="absolute -top-3 -right-12 px-2 py-1 bg-primary/20 text-primary text-xs font-casual rounded-full">
                {category.sectionType === "food" ? "Food" : "Drinks"}
              </span>
            )}
          </div>
          <span className="text-3xl opacity-60 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
            {icon}
          </span>
        </div>
        {note && (
          <p className="text-sm text-muted-foreground font-casual italic mt-2">
            {note}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {category.items.map((item, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MenuItemComponent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}