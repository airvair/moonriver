export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  addOns?: Array<{
    name: string;
    price: string;
  }>;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuSection {
  type: "food" | "drinks";
  categories: MenuCategory[];
}

export const menuData: MenuSection[] = [
  {
    type: "food",
    categories: [
      {
        name: "Breakfast",
        items: [
          {
            name: "Amalfi Parfait",
            price: "$10",
            description: "Greek yogurt, fruit, pumpkin seed & flax granola, honey"
          },
          {
            name: "Avocado Toast",
            price: "$10",
            description: "Rich sourdough with balsamic pomegranate seeds",
            addOns: [{ name: "Add 2 eggs", price: "+$3" }]
          },
          {
            name: "Breakfast Sandwich",
            price: "$8",
            description: "Egg, cheddar cheese, and choice of bacon, sausage, or vegetarian sausage"
          },
          {
            name: "Imperial Breakfast Sandwich",
            price: "$9",
            description: "Breakfast sandwich with goat cheese, fig spread"
          },
          {
            name: "Bagel",
            price: "$3",
            description: "Everything or Plain",
            addOns: [{ name: "Add cream cheese or jam", price: "+$1" }]
          },
          {
            name: "English Muffin",
            price: "$3",
            addOns: [{ name: "Add cream cheese or jam", price: "+$1" }]
          },
          {
            name: "Mascarpone Toast",
            price: "$7",
            addOns: [{ name: "Add strawberries", price: "+$2" }]
          },
          {
            name: "Midsummer",
            price: "$10",
            description: "Blueberry, mascarpone, basil, honey toasted sandwich"
          },
          {
            name: "Regency Toast",
            price: "$12",
            description: "Sourdough with almond butter, berries, sunflower and hemp seeds, honey"
          }
        ]
      },
      {
        name: "Sandwiches",
        items: [
          {
            name: "Bella Capri",
            price: "$12",
            description: "Basil, mozzarella, tomato",
            addOns: [{ name: "Add bacon", price: "+$3" }]
          },
          {
            name: "Baron",
            price: "$12",
            description: "Bacon, lettuce, tomato"
          },
          {
            name: "Bramble & Butter",
            price: "$5",
            description: "Peanut butter, jelly"
          },
          {
            name: "Bramble & Butter Club",
            price: "$10",
            description: "Peanut butter, jelly, bacon"
          },
          {
            name: "Château Poulet",
            price: "$12",
            description: "Chicken Salad on Croissant"
          },
          {
            name: "Continental",
            price: "$12",
            description: "Ham or turkey, greens, provolone, tomato"
          },
          {
            name: "Fool's Gold",
            price: "$12",
            description: "Egg salad sandwich"
          },
          {
            name: "The Gilded Mallow",
            price: "$5",
            description: "Peanut butter, marshmallow"
          },
          {
            name: "Imperial Hen",
            price: "$12",
            description: "Turkey, herbed goat cheese, fig"
          },
          {
            name: "Imperial Ruby",
            price: "$10",
            description: "Tomato, herbed goat cheese, fig"
          }
        ]
      },
      {
        name: "Salads",
        items: [
          {
            name: "Crimson & Ivory",
            price: "$12",
            description: "Pasta, feta and cranberry drenched in lemon vinaigrette"
          },
          {
            name: "Sun Orchard",
            price: "$12",
            description: "Spinach, sweet citrus, and pecans in housemade dressing"
          },
          {
            name: "Sapphire Harvest",
            price: "$12",
            description: "Blueberry, basil, feta, corn in fresh lime vinaigrette"
          }
        ]
      },
      {
        name: "Sweets",
        items: [
          {
            name: "Belgian Waffle",
            price: "$8",
            addOns: [
              { name: "Add Fruit", price: "+$2" },
              { name: "Add Nutella", price: "+$2" }
            ]
          },
          {
            name: "Salted Caramel Crown",
            price: "$10",
            description: "Vanilla ice cream, caramel, peanut butter, potato chips"
          },
          {
            name: "Imperial Snowfall",
            price: "$12",
            description: '"Snow" with sweet mango topping'
          },
          {
            name: "Space Coast Sundae",
            price: "$14",
            description: "Show-stopping sundae with vanilla ice cream, rock candy, cotton candy, lollipop"
          }
        ]
      }
    ]
  },
  {
    type: "drinks",
    categories: [
      {
        name: "Espresso",
        items: [
          {
            name: "Affogato",
            price: "Single Scoop $7 | Double Scoop $8"
          },
          {
            name: "Americano",
            price: "$4.50"
          },
          {
            name: "Cappuccino",
            price: "Regular $5.50 | Large $6.50"
          },
          {
            name: "Cappuccino Freddo",
            price: "Regular $6 | Large $7"
          },
          {
            name: "Cappuccino Viennese",
            price: "$6"
          },
          {
            name: "Espresso Freddo",
            price: "$5"
          },
          {
            name: "Italian Macchiato",
            price: "$4.50"
          },
          {
            name: "Flat White",
            price: "Regular $5.50 | Large $6.50"
          },
          {
            name: "Latte",
            price: "Regular $5.50 | Large $6.50"
          }
        ]
      },
      {
        name: "Tea",
        items: [
          {
            name: "Selection of Luxury Teas",
            price: "$5",
            description: "Available hot or iced"
          },
          {
            name: "Cold Brew Tea",
            price: "$6"
          },
          {
            name: "Matcha",
            price: "Regular $5.50 | Large $6.50"
          },
          {
            name: "Chai",
            price: "Regular $5.50 | Large $6.50"
          }
        ]
      },
      {
        name: "Chocolate",
        items: [
          {
            name: "Parisian Drinking Chocolate",
            price: "$10"
          },
          {
            name: "1776 Spiced Hot Chocolate",
            price: "$10"
          },
          {
            name: "Chocolate Milk",
            price: "$4"
          },
          {
            name: "Double Chocamacalacka",
            price: "$12"
          }
        ]
      },
      {
        name: "Beverages",
        items: [
          {
            name: "Egg Creme",
            price: "$5"
          },
          {
            name: "Italian Soda",
            price: "Regular $4.50 | Large $5.50"
          },
          {
            name: "Lotus Energy",
            price: "Regular $5.50 | Large $6.50"
          },
          {
            name: "Milk Steamer",
            price: "Regular $4.50 | Large $5.50"
          },
          {
            name: "Shirley Temple",
            price: "Regular $4.50 | Large $5.50"
          },
          {
            name: "Lemonade",
            price: "Regular $4.50 | Large $5.50"
          },
          {
            name: "Limeade",
            price: "Regular $4.50 | Large $5.50"
          }
        ]
      },
      {
        name: "Coffee",
        items: [
          {
            name: "Drip Coffee",
            price: "$3.75"
          },
          {
            name: "Iced Coffee",
            price: "Regular $4 | Large $5"
          },
          {
            name: "Cold Brew",
            price: "Regular $5 | Large $6"
          },
          {
            name: "Red Eye",
            price: "$4.75"
          }
        ]
      },
      {
        name: "Additions",
        items: [
          {
            name: "Syrup",
            price: "+$1"
          },
          {
            name: "Almond Milk",
            price: "+$0.75"
          },
          {
            name: "Oat Milk",
            price: "+$0.75"
          },
          {
            name: "Heavy Cream",
            price: "+$0.75"
          },
          {
            name: "Whipped Cream",
            price: "+$0.50"
          },
          {
            name: "Espresso Shot",
            price: "+$1"
          }
        ]
      }
    ]
  }
];

// Note for sandwiches
export const sandwichNote = "Gluten-Free Bread Available +$1";