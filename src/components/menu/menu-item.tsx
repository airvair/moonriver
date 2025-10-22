import { MenuItem } from "@/lib/menu-data";

interface MenuItemComponentProps {
  item: MenuItem;
}

export function MenuItemComponent({ item }: MenuItemComponentProps) {
  return (
    <div className="group relative p-4 rounded-xl hover:bg-accent/10 transition-all duration-300">
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-casual font-medium text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h4>

          {item.description && (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {item.description}
            </p>
          )}

          {item.addOns && item.addOns.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.addOns.map((addOn, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/50 text-secondary-foreground"
                >
                  {addOn.name} <span className="ml-1 font-medium">{addOn.price}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="text-right">
          <span className="text-lg font-handwritten text-primary whitespace-nowrap">
            {item.price}
          </span>
        </div>
      </div>
    </div>
  );
}