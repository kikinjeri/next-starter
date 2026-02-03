// app/menu.ts

export type MenuCategory =
  | "Buy 1 Get 1 Free"
  | "Popular Picks"
  | "Appetizers"
  | "Idli"
  | "Indo-Chinese"
  | "Kothu Parotha"
  | "Dosa"
  | "Rice Biryani"
  | "Specialty Rice"
  | "Fried Rice & Noodles"
  | "Curry Masala (Non-Vegetarian)"
  | "Curry Masala (Vegetarian)"
  | "Indian Bread"
  | "Desserts"
  | "Beverages";

export type MenuItem = {
  name: string;
  price?: number;
  description?: string;
};

export const MENU: Record<MenuCategory, MenuItem[]> = {
  "Buy 1 Get 1 Free": [
    { name: "BOGO Masala Dosa", price: 14 },
    { name: "BOGO Butter Chicken", price: 18, description: "Creamy flavourful sauce with mildly spicy chicken breast." },
    { name: "BOGO Sambar or Rasam Idli", price: 13, description: "Three idlis chopped and soaked in Sambar or Rasam." },
    { name: "BOGO Idly plate (4 Nos)", price: 12 },
    { name: "BOGO Samosa Chaat", price: 11 },
    { name: "BOGO Vegetable Noodles", price: 13 },
    { name: "BOGO Naan", price: 3 },
    { name: "BOGO Chili Idly", price: 14 },
    { name: "BOGO Fish Pakora", price: 16 },
    { name: "BOGO 12 OZ Mango Lassi", price: 5 },
    { name: "BOGO 20 OZ Mango Lassi", price: 7 },
    { name: "BOGO Mysore Plain Dosa", price: 14 },
    { name: "BOGO Mysore Masala Dosa", price: 16 },
    { name: "BOGO Chettinad Masala Dosa", price: 17 },
  ],
  "Popular Picks": [
    { name: "Hyderabadi Gongura Dosa", price: 17, description: "Stuffed with potato masala and spread with rare Andhra gongura chutney." },
    { name: "Pav Bhaji Dosa", price: 17, description: "Mumbai street style vegetable spread." },
    { name: "Ghee Paper Masala Dosa", price: 15, description: "Large thin crepe brushed with ghee." },
    { name: "South Indian Dhal", price: 13, description: "Thick lentils sauce spiced to South Indian style." },
    { name: "Shrimp Biryani", price: 19, description: "Shrimp on flavoured rice served with boiled egg and raita." },
    { name: "Ghee Roast Dosa", price: 14, description: "Crispy dosa brushed with ghee." },
    { name: "Chilli Parotha", price: 15, description: "Parotha sautéed with onions, chilies, red and green peppers." },
    { name: "Chilli Chicken", price: 16, description: "Boneless chicken sautéed with onions, chilies, red and green peppers." },
    { name: "Idli (3pcs) and Vada (1pcs) plate", price: 12, description: "Three idlis with a Mehdu vada, sambar and chutneys." },
    { name: "Chaat Papdi", price: 11, description: "Crispy wafers, chickpeas, potatoes and dahi." },
    { name: "Sambar Vada", price: 10, description: "Mehdu vada soaked in signature Sambar." },
    { name: "Idli 65 (3 chopped)", price: 13, description: "Pieces of idli marinated in Indian spices and deep fried." },
    { name: "Shrimp Fry", price: 17, description: "Deep fried shrimp in Indian spices." },
    { name: "Pani Puri", price: 9, description: "Round hollow puri filled with flavoured water." },
    { name: "Mehdu Vada", price: 8, description: "Crispy fried lentil doughnuts with chutney." },
    { name: "Masala Peanuts", price: 9, description: "Oil roasted salted and seasoned peanuts." },
    { name: "Rasam Soup", price: 8, description: "Tangy spicy tomato soup with curry leaves and tamarind." },
    { name: "Vegetable Uttapam", price: 14, description: "Thick dosa cooked with house veggie mix." },
    { name: "Parotha", price: 3, description: "Layered Indian flat bread." },
    { name: "Pepper Chicken Curry", price: 18, description: "Chicken curry spiced with cumin seed and black pepper." },
    { name: "Idli plate (4pcs)", price: 12, description: "Four idlis with sambar and chutneys." },
    { name: "Samosa (x2)", price: 9, description: "Potato and pea stuffed pastries with tamarind chutney." },
    { name: "Paneer 65 (12)", price: 16, description: "Cottage cheese marinated in Indian spices and deep fried." },
    { name: "Chicken Kothu (with eggs)", price: 17, description: "Kothu parotha with chicken and scrambled eggs." },
    { name: "Lamb Biryani", price: 19, description: "Lamb pieces in flavoured rice with boiled egg and raita." },
    { name: "Rava Dosa", price: 17, description: "Paper thin crepe with semolina and rice flour, aromatic herbs and spices." },
    { name: "Pav Bhaji", price: 9, description: "Thick vegetable curry with soft bread rolls." },
    { name: "Mango Lassi", price: 5 },
    { name: "Podi Idli", price: 13, description: "Chopped idlis tossed in spicy podi oil with sambar and chutneys." },
    { name: "Chicken 65", price: 16, description: "Deep fried chicken marinated in Indian spices." },
    { name: "Small Chicken Biriyani 24 OZ", price: 14 },
    { name: "Small Vegetable Biriyani 24 OZ", price: 11 },
  ],
  Appetizers: [
    { name: "Chaat Papdi", price: 11, description: "Crispy wafers, chickpeas, potatoes and dahi." },
    { name: "Onion Pakora", price: 12, description: "Onion in seasoned batter, deep fried." },
    { name: "Samosa (x2)", price: 9, description: "Potato and pea stuffed pastries with tamarind chutney." },
    { name: "Curd Vada", price: 10, description: "Mehdu vada soaked in spiced curd." },
    { name: "Samosa Chat", price: 11, description: "Broken samosa with chutneys, onions, coriander and spices." },
    { name: "Paneer 65 (12)", price: 16, description: "Deep fried spiced paneer pieces." },
    { name: "Idli 65 (3 chopped)", price: 13, description: "Deep fried spiced idli pieces." },
    { name: "Vegetarian Platter (5pcs)", price: 18, description: "Chef’s choice of 5 vegetarian appetizers." },
    { name: "Shrimp Fry", price: 17, description: "Deep fried shrimp in Indian spices." },
    { name: "Onion Bhaji (x2)", price: 10, description: "Onion fritters in chickpea batter with tamarind sauce." },
    { name: "Masala Peanuts", price: 9 },
    { name: "Rasam Soup", price: 8 },
    { name: "Dal Soup", price: 8, description: "Mild lentil soup with coriander." },
    { name: "Rasam Vada", price: 10, description: "Mehdu vada soaked in rasam." },
    { name: "Sambar Vada", price: 10 },
    { name: "Masala Vada", price: 8 },
    { name: "Pani Puri", price: 9 },
    { name: "Mehdu Vada", price: 8 },
    { name: "Patato Bonda (x2)", price: 10 },
    { name: "Omelette", price: 9 },
    { name: "Egg Bhurji", price: 9, description: "Scrambled eggs with onions, chilies and spices." },
    { name: "Pav Bhaji", price: 9 },
    { name: "Mushroom Manchurian", price: 15 },
    { name: "Chilli Parotha", price: 15 },
    { name: "Chicken Manchurian", price: 16 },
    { name: "Chilli Shrimp", price: 18 },
    { name: "Chilli Chicken", price: 16 },
    { name: "Podi Idli", price: 13 },
    { name: "Fish Pakora", price: 16 },
    { name: "Cauliflower Manchurian", price: 15 },
    { name: "Chilli Paneer", price: 16 },
    { name: "Chilli Idli", price: 14 },
    { name: "Chicken 65", price: 16 },
    { name: "BOGO Sambar or Rasam Idli", price: 13 },
  ],
  Idli: [
    { name: "Idli plate (4pcs)", price: 12, description: "Four idlis with sambar and chutneys." },
    { name: "Podi Idli", price: 13 },
    { name: "Chilli Idli", price: 14 },
    { name: "Idli (3pcs) and Vada (1pcs) plate", price: 12 },
    { name: "Idli 65 (3 chopped)", price: 13 },
    { name: "BOGO Sambar or Rasam Idli", price: 13 },
  ],
  "Indo-Chinese": [
    { name: "Chilli Parotha", price: 15 },
    { name: "Chicken Manchurian", price: 16 },
    { name: "Chilli Shrimp", price: 18 },
    { name: "Chilli Chicken", price: 16 },
    { name: "Cauliflower Manchurian", price: 15 },
    { name: "Chilli Paneer", price: 16 },
    { name: "Mushroom Manchurian", price: 15 },
    { name: "Chilli Idli", price: 14 },
  ],
  "Kothu Parotha": [
    { name: "Lamb Kothu (with eggs)", price: 18, description: "Kothu parotha with lamb and scrambled eggs." },
    { name: "Egg Kothu", price: 16, description: "Kothu parotha with scrambled eggs." },
    { name: "Chicken Kothu (with eggs)", price: 17 },
    { name: "Vegetable Kothu", price: 15 },
  ],
  Dosa: [
    { name: "Podi Plain Dosa", price: 15, description: "Dosa stuffed with special ground dry spice powder." },
    { name: "Chilli Cheese Dosa", price: 16, description: "Dosa sprinkled with cheese and chilies." },
    { name: "Cheese Dosa", price: 15 },
    { name: "Cheese Garlic Dosa", price: 16 },
    { name: "Plain Dosa", price: 13, description: "Thin crepe from fermented rice and lentils." },
    { name: "Ghee Roast Dosa", price: 14 },
    { name: "Sett Dosa (x2)", price: 15, description: "Soft and thick like pancakes." },
    { name: "Paper Dosa", price: 13, description: "Large thin and crispy crepe." },
    { name: "Rava Dosa", price: 17 },
    { name: "Hyderabadi Gongura Dosa", price: 17 },
    { name: "Pav Bhaji Dosa", price: 17 },
    { name: "Ghee Paper Masala Dosa", price: 15 },
    { name: "Chicken Masala Dosa", price: 18, description: "Stuffed with chicken and potato masala." },
    { name: "Egg Dosa", price: 16, description: "Dosa with beaten egg, onions, tomatoes and coriander." },
    { name: "Lamb Masala Dosa", price: 19, description: "Stuffed with lamb and potato masala." },
  ],
  "Rice Biryani": [
    { name: "Shrimp Biryani", price: 19 },
    { name: "Lamb Biryani", price: 19 },
    { name: "Small Chicken Biriyani 24 OZ", price: 14 },
    { name: "Small Vegetable Biriyani 24 OZ", price: 11 },
  ],
  "Specialty Rice": [],
  "Fried Rice & Noodles": [
    { name: "BOGO Vegetable Noodles", price: 13 },
  ],
  "Curry Masala (Non-Vegetarian)": [
    { name: "Pepper Chicken Curry", price: 18 },
    { name: "BOGO Butter Chicken", price: 18 },
  ],
  "Curry Masala (Vegetarian)": [],
  "Indian Bread": [
    { name: "Parotha", price: 3 },
    { name: "BOGO Naan", price: 3 },
  ],
  Desserts: [],
    Beverages: [
      { name: "Fanta", price: 4 },
      { name: "Limca", price: 4 },
      { name: "Thumbs up", price: 4 },
      { name: "Mango Lassi", price: 5 },
      { name: "BOGO 12 OZ Mango Lassi", price: 7 },
    ],
  };