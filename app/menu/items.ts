export interface FoodItem {
  title: string
  description: string
  image: string
  href: string
  cookingTime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  servings: number
  rating: number
}

export const MENU_ITEMS: FoodItem[] = [
  {
    title: "Adobo",
    description: "Classic Filipino chicken or pork adobo with soy sauce and vinegar",
    image: "🍗",
    href: "/filipino/adobo",
    cookingTime: 45,
    difficulty: "Medium",
    servings: 6,
    rating: 4.8
  },
  {
    title: "Sinigang",
    description: "Sour tamarind soup with pork and vegetables",
    image: "🥘",
    href: "/filipino/sinigang",
    cookingTime: 90,
    difficulty: "Medium",
    servings: 8,
    rating: 4.6
  },
  {
    title: "Kare-Kare",
    description: "Peanut stew with beef and vegetables",
    image: "🥜",
    href: "/filipino/kare-kare",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 6,
    rating: 4.7
  },
  {
    title: "Lechon Kawali",
    description: "Crispy fried pork belly",
    image: "🥓",
    href: "/filipino/lechon-kawali",
    cookingTime: 75,
    difficulty: "Medium",
    servings: 4,
    rating: 4.5
  },
  {
    title: "Pancit Canton",
    description: "Stir-fried noodles with vegetables and meat",
    image: "🍜",
    href: "/filipino/pancit-canton",
    cookingTime: 25,
    difficulty: "Easy",
    servings: 4,
    rating: 4.4
  },
  {
    title: "Halo-Halo",
    description: "Mixed dessert with shaved ice and sweet ingredients",
    image: "🍧",
    href: "/filipino/halo-halo",
    cookingTime: 15,
    difficulty: "Easy",
    servings: 2,
    rating: 4.9
  },
  {
    title: "Tapsilog",
    description: "Beef tapa with garlic rice and fried egg",
    image: "🍳",
    href: "/filipino/tapsilog",
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,
    rating: 4.3
  },
  {
    title: "Longganisa",
    description: "Sweet Filipino sausage with garlic rice",
    image: "🌭",
    href: "/filipino/longganisa",
    cookingTime: 15,
    difficulty: "Easy",
    servings: 2,
    rating: 4.2
  },
  {
    title: "Tocino",
    description: "Sweet cured pork with garlic rice",
    image: "🥩",
    href: "/filipino/tocino",
    cookingTime: 15,
    difficulty: "Easy",
    servings: 2,
    rating: 4.1
  },
  {
    title: "Chicken Tinola",
    description: "Ginger chicken soup with green papaya",
    image: "🍲",
    href: "/filipino/chicken-tinola",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 6,
    rating: 4.4
  },
  {
    title: "Beef Caldereta",
    description: "Spicy beef stew with tomato sauce",
    image: "🥘",
    href: "/filipino/beef-caldereta",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 6,
    rating: 4.6
  },
  {
    title: "Pancit Bihon",
    description: "Rice noodles with vegetables and meat",
    image: "🍝",
    href: "/filipino/pancit-bihon",
    cookingTime: 30,
    difficulty: "Medium",
    servings: 4,
    rating: 4.3
  },
  {
    title: "Lumpia",
    description: "Fresh spring rolls with vegetables",
    image: "🥬",
    href: "/filipino/lumpia",
    cookingTime: 45,
    difficulty: "Medium",
    servings: 4,
    rating: 4.5
  },
  {
    title: "Sisig",
    description: "Sizzling pork dish with onions and chili",
    image: "🔥",
    href: "/filipino/sisig",
    cookingTime: 40,
    difficulty: "Medium",
    servings: 4,
    rating: 4.7
  },
  {
    title: "Bulalo",
    description: "Beef marrow soup with corn and vegetables",
    image: "🍖",
    href: "/filipino/bulalo",
    cookingTime: 180,
    difficulty: "Hard",
    servings: 8,
    rating: 4.8
  },
  {
    title: "Bicol Express",
    description: "Spicy pork with coconut milk and chili",
    image: "🌶️",
    href: "/filipino/bicol-express",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 4,
    rating: 4.4
  },
  {
    title: "Dinuguan",
    description: "Pork blood stew with vinegar",
    image: "🩸",
    href: "/filipino/dinuguan",
    cookingTime: 90,
    difficulty: "Hard",
    servings: 6,
    rating: 4.2
  },
  {
    title: "Pancit Malabon",
    description: "Thick rice noodles with seafood",
    image: "🦐",
    href: "/filipino/pancit-malabon",
    cookingTime: 35,
    difficulty: "Medium",
    servings: 4,
    rating: 4.5
  },
  {
    title: "Kare-Kareng Pata",
    description: "Peanut stew with pork hock",
    image: "🍖",
    href: "/filipino/kare-kareng-pata",
    cookingTime: 150,
    difficulty: "Hard",
    servings: 6,
    rating: 4.6
  },
  {
    title: "Chicken Arroz Caldo",
    description: "Chicken rice porridge with ginger",
    image: "🍚",
    href: "/filipino/chicken-arroz-caldo",
    cookingTime: 50,
    difficulty: "Medium",
    servings: 4,
    rating: 4.3
  },
  {
    title: "Ginisang Monggo",
    description: "Mung bean soup with vegetables",
    image: "🫘",
    href: "/filipino/ginisang-monggo",
    cookingTime: 80,
    difficulty: "Easy",
    servings: 6,
    rating: 4.1
  },
  {
    title: "Pancit Palabok",
    description: "Rice noodles with shrimp sauce",
    image: "🍜",
    href: "/filipino/pancit-palabok",
    cookingTime: 40,
    difficulty: "Medium",
    servings: 4,
    rating: 4.4
  },
  {
    title: "Chicken Inasal",
    description: "Grilled chicken marinated in calamansi",
    image: "🍗",
    href: "/filipino/chicken-inasal",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 4,
    rating: 4.7
  },
  {
    title: "Beef Mechado",
    description: "Beef stew with tomato sauce and vegetables",
    image: "🥩",
    href: "/filipino/beef-mechado",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 6,
    rating: 4.5
  },
  {
    title: "Pancit Sotanghon",
    description: "Glass noodles with chicken and vegetables",
    image: "🍜",
    href: "/filipino/pancit-sotanghon",
    cookingTime: 30,
    difficulty: "Easy",
    servings: 4,
    rating: 4.2
  },
  {
    title: "Chicken Afritada",
    description: "Chicken stew with tomato sauce and potatoes",
    image: "🍗",
    href: "/filipino/chicken-afritada",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 4,
    rating: 4.3
  },
  {
    title: "Beef Tapa",
    description: "Cured beef strips with garlic rice",
    image: "🥩",
    href: "/filipino/beef-tapa",
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,
    rating: 4.1
  },
  {
    title: "Pancit Luglug",
    description: "Thick rice noodles with shrimp sauce",
    image: "🍜",
    href: "/filipino/pancit-luglug",
    cookingTime: 35,
    difficulty: "Medium",
    servings: 4,
    rating: 4.3
  },
  {
    title: "Chicken Menudo",
    description: "Chicken stew with tomato sauce and vegetables",
    image: "🍗",
    href: "/filipino/chicken-menudo",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 4,
    rating: 4.2
  },
  {
    title: "Beef Nilaga",
    description: "Boiled beef with vegetables",
    image: "🥩",
    href: "/filipino/beef-nilaga",
    cookingTime: 120,
    difficulty: "Medium",
    servings: 6,
    rating: 4.4
  },
  {
    title: "Pancit Canton Guisado",
    description: "Stir-fried egg noodles with vegetables",
    image: "🍜",
    href: "/filipino/pancit-canton-guisado",
    cookingTime: 25,
    difficulty: "Easy",
    servings: 4,
    rating: 4.1
  },
  {
    title: "Chicken Sopas",
    description: "Chicken macaroni soup with milk",
    image: "🍲",
    href: "/filipino/chicken-sopas",
    cookingTime: 45,
    difficulty: "Easy",
    servings: 6,
    rating: 4.3
  },
  {
    title: "Beef Pochero",
    description: "Beef stew with banana and vegetables",
    image: "🥩",
    href: "/filipino/beef-pochero",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 6,
    rating: 4.5
  },
  {
    title: "Pancit Habhab",
    description: "Stir-fried rice noodles from Quezon",
    image: "🍜",
    href: "/filipino/pancit-habhab",
    cookingTime: 30,
    difficulty: "Medium",
    servings: 4,
    rating: 4.2
  },
  {
    title: "Chicken Pastel",
    description: "Chicken pie with vegetables and cream",
    image: "🥧",
    href: "/filipino/chicken-pastel",
    cookingTime: 90,
    difficulty: "Hard",
    servings: 4,
    rating: 4.4
  },
  {
    title: "Beef Estofado",
    description: "Beef stew with sweet sauce and vegetables",
    image: "🥩",
    href: "/filipino/beef-estofado",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 6,
    rating: 4.3
  },
  {
    title: "Pancit Molo",
    description: "Dumpling soup with ground pork",
    image: "🥟",
    href: "/filipino/pancit-molo",
    cookingTime: 60,
    difficulty: "Medium",
    servings: 4,
    rating: 4.2
  },
  {
    title: "Chicken Relleno",
    description: "Stuffed chicken with ground pork",
    image: "🍗",
    href: "/filipino/chicken-relleno",
    cookingTime: 120,
    difficulty: "Hard",
    servings: 4,
    rating: 4.6
  },
  {
    title: "Beef Morcon",
    description: "Stuffed beef roll with vegetables",
    image: "🥩",
    href: "/filipino/beef-morcon",
    cookingTime: 150,
    difficulty: "Hard",
    servings: 4,
    rating: 4.5
  },
  {
    title: "Pancit Batil Patung",
    description: "Egg noodles with carabao meat from Tuguegarao",
    image: "🍜",
    href: "/filipino/pancit-batil-patung",
    cookingTime: 45,
    difficulty: "Medium",
    servings: 4,
    rating: 4.4
  }
]
