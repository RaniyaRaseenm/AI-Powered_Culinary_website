import React, { useState } from 'react';
import { ChefHat, ArrowRight, ArrowLeft, Sparkles, Save, Share2 } from 'lucide-react';

// Types
type CuisineType = string;
type Ingredient = {
  id: string;
  name: string;
  category: string;
};

type GeneratedDish = {
  name: string;
  description: string;
  imageUrl: string;
  preparationTime: string;
  difficulty: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
};

// Data
const cuisineTypes = [
  'Italian', 'Chinese', 'Mexican', 'Indian', 'French', 'Thai', 
  'Mediterranean', 'Japanese', 'Korean', 'Spanish', 'Greek', 'Lebanese'
];

const ingredientsByCategory = {
  Proteins: [
    { id: 'chicken', name: 'Chicken', category: 'Proteins' },
    { id: 'beef', name: 'Beef', category: 'Proteins' },
    { id: 'pork', name: 'Pork', category: 'Proteins' },
    { id: 'fish', name: 'Fish', category: 'Proteins' },
    { id: 'shrimp', name: 'Shrimp', category: 'Proteins' },
    { id: 'tofu', name: 'Tofu', category: 'Proteins' },
    { id: 'eggs', name: 'Eggs', category: 'Proteins' },
    { id: 'beans', name: 'Beans', category: 'Proteins' },
  ],
  Vegetables: [
    { id: 'tomatoes', name: 'Tomatoes', category: 'Vegetables' },
    { id: 'onions', name: 'Onions', category: 'Vegetables' },
    { id: 'bell-peppers', name: 'Bell Peppers', category: 'Vegetables' },
    { id: 'mushrooms', name: 'Mushrooms', category: 'Vegetables' },
    { id: 'spinach', name: 'Spinach', category: 'Vegetables' },
    { id: 'carrots', name: 'Carrots', category: 'Vegetables' },
    { id: 'broccoli', name: 'Broccoli', category: 'Vegetables' },
    { id: 'zucchini', name: 'Zucchini', category: 'Vegetables' },
  ],
  Grains: [
    { id: 'rice', name: 'Rice', category: 'Grains' },
    { id: 'pasta', name: 'Pasta', category: 'Grains' },
    { id: 'quinoa', name: 'Quinoa', category: 'Grains' },
    { id: 'bread', name: 'Bread', category: 'Grains' },
    { id: 'couscous', name: 'Couscous', category: 'Grains' },
    { id: 'noodles', name: 'Noodles', category: 'Grains' },
  ],
  Spices: [
    { id: 'garlic', name: 'Garlic', category: 'Spices' },
    { id: 'ginger', name: 'Ginger', category: 'Spices' },
    { id: 'basil', name: 'Basil', category: 'Spices' },
    { id: 'oregano', name: 'Oregano', category: 'Spices' },
    { id: 'cumin', name: 'Cumin', category: 'Spices' },
    { id: 'paprika', name: 'Paprika', category: 'Spices' },
    { id: 'thyme', name: 'Thyme', category: 'Spices' },
    { id: 'rosemary', name: 'Rosemary', category: 'Spices' },
  ],
  Dairy: [
    { id: 'cheese', name: 'Cheese', category: 'Dairy' },
    { id: 'milk', name: 'Milk', category: 'Dairy' },
    { id: 'yogurt', name: 'Yogurt', category: 'Dairy' },
    { id: 'butter', name: 'Butter', category: 'Dairy' },
    { id: 'cream', name: 'Cream', category: 'Dairy' },
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'ingredients' | 'creation'>('welcome');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [generatedDish, setGeneratedDish] = useState<GeneratedDish | null>(null);
  const [dishName, setDishName] = useState<string>('');

  // Simulated AI dish generation
  const generateDish = (cuisine: string, ingredients: string[]): GeneratedDish => {
    const dishTemplates = {
      Italian: {
        names: ['Rustico', 'Delizia', 'Supremo', 'Classico', 'Fresco'],
        descriptions: ['A traditional Italian creation with rich flavors', 'An elegant dish inspired by Tuscan cuisine', 'A hearty meal perfect for family gatherings'],
        images: [
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Chinese: {
        names: ['Golden', 'Dragon', 'Phoenix', 'Harmony', 'Imperial'],
        descriptions: ['A balanced dish with authentic Chinese flavors', 'Inspired by traditional Szechuan cooking', 'A delicate blend of Eastern spices'],
        images: [
          'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Mexican: {
        names: ['Fiesta', 'Azteca', 'Picante', 'Sol', 'Tierra'],
        descriptions: ['A vibrant dish bursting with Mexican flavors', 'Inspired by ancient Aztec cooking traditions', 'A spicy celebration of Mexican cuisine'],
        images: [
          'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Indian: {
        names: ['Masala', 'Tandoor', 'Curry', 'Maharaja', 'Spice'],
        descriptions: ['A fragrant dish with traditional Indian spices', 'Inspired by royal Mughal cuisine', 'A warming blend of aromatic spices'],
        images: [
          'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      French: {
        names: ['Provençal', 'Bourgeois', 'Champagne', 'Classique', 'Elegant'],
        descriptions: ['A sophisticated dish with French elegance', 'Inspired by countryside French cooking', 'A refined creation with delicate flavors'],
        images: [
          'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Thai: {
        names: ['Bangkok', 'Tropical', 'Coconut', 'Lemongrass', 'Jade'],
        descriptions: ['A fragrant dish with Thai herbs and spices', 'Inspired by street food from Bangkok', 'A perfect balance of sweet, sour, and spicy'],
        images: [
          'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Mediterranean: {
        names: ['Aegean', 'Coastal', 'Olive', 'Sunset', 'Breeze'],
        descriptions: ['A fresh Mediterranean creation with vibrant flavors', 'Inspired by coastal Mediterranean cuisine', 'A healthy blend of fresh ingredients'],
        images: [
          'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Japanese: {
        names: ['Sakura', 'Zen', 'Harmony', 'Umami', 'Wasabi'],
        descriptions: ['A delicate Japanese creation with balanced flavors', 'Inspired by traditional Japanese cooking', 'A minimalist approach to maximum flavor'],
        images: [
          'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Korean: {
        names: ['Seoul', 'Kimchi', 'Bulgogi', 'Hanbok', 'Spicy'],
        descriptions: ['A bold Korean creation with fermented flavors', 'Inspired by Korean street food culture', 'A perfect balance of spicy and savory'],
        images: [
          'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Spanish: {
        names: ['Iberico', 'Flamenco', 'Paella', 'Tapas', 'Andaluz'],
        descriptions: ['A vibrant Spanish creation with bold flavors', 'Inspired by traditional Spanish tapas', 'A celebration of Spanish culinary heritage'],
        images: [
          'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Greek: {
        names: ['Olympus', 'Aegean', 'Santorini', 'Mykonos', 'Acropolis'],
        descriptions: ['A classic Greek creation with Mediterranean flair', 'Inspired by ancient Greek traditions', 'A healthy blend of olive oil and herbs'],
        images: [
          'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      Lebanese: {
        names: ['Beirut', 'Cedar', 'Levant', 'Mezze', 'Baalbek'],
        descriptions: ['A flavorful Lebanese creation with Middle Eastern spices', 'Inspired by Levantine cuisine', 'A perfect blend of herbs and spices'],
        images: [
          'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    };

    const template = dishTemplates[cuisine as keyof typeof dishTemplates] || dishTemplates.Italian;
    const randomName = template.names[Math.floor(Math.random() * template.names.length)];
    const randomDescription = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    const randomImage = template.images[Math.floor(Math.random() * template.images.length)];

    return {
      name: `${randomName} ${cuisine} Fusion`,
      description: `${randomDescription}. This unique creation combines ${ingredients.slice(0, 3).join(', ')} ${ingredients.length > 3 ? 'and more' : ''} in a ${cuisine.toLowerCase()} style preparation.`,
      imageUrl: randomImage,
      preparationTime: `${20 + Math.floor(Math.random() * 40)} minutes`,
      difficulty: ['Easy', 'Medium', 'Advanced'][Math.floor(Math.random() * 3)],
      servings: Math.floor(Math.random() * 4) + 2,
      ingredients: ingredients,
      instructions: [
        'Prepare all ingredients according to traditional methods',
        `Season with ${cuisine.toLowerCase()} spices and herbs`,
        'Cook using optimal temperature and timing',
        'Plate with artistic presentation',
        'Serve immediately while hot'
      ]
    };
  };

  const handleCuisineSelect = (cuisine: CuisineType) => {
    setSelectedCuisine(cuisine);
    setCurrentPage('ingredients');
  };

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientId)
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const handleCreateDish = () => {
    const ingredientNames = selectedIngredients.map(id => {
      for (const category of Object.values(ingredientsByCategory)) {
        const ingredient = category.find(ing => ing.id === id);
        if (ingredient) return ingredient.name;
      }
      return id;
    });

    const dish = generateDish(selectedCuisine, ingredientNames);
    setGeneratedDish(dish);
    setDishName(dish.name);
    setCurrentPage('creation');
  };

  const handleStartOver = () => {
    setCurrentPage('welcome');
    setSelectedCuisine('');
    setSelectedIngredients([]);
    setGeneratedDish(null);
    setDishName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sandal to-white">
      <style>{`
        :root {
          --sandal: #F5E6D3;
          --maroon: #800020;
          --maroon-light: #A0002A;
          --maroon-dark: #600018;
        }
        
        .bg-sandal { background-color: var(--sandal); }
        .bg-maroon { background-color: var(--maroon); }
        .text-maroon { color: var(--maroon); }
        .border-maroon { border-color: var(--maroon); }
        .hover\\:bg-maroon:hover { background-color: var(--maroon); }
        .hover\\:bg-maroon-light:hover { background-color: var(--maroon-light); }
        .from-sandal { --tw-gradient-from: var(--sandal); }
        .to-white { --tw-gradient-to: #ffffff; }
        
        .slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .ingredient-card {
          transition: all 0.3s ease;
        }
        
        .ingredient-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(128, 0, 32, 0.15);
        }
        
        .cuisine-card {
          transition: all 0.3s ease;
        }
        
        .cuisine-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(128, 0, 32, 0.2);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sandal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-maroon" />
              <h1 className="text-2xl font-bold text-maroon">AI Culinary Creator</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className={currentPage === 'welcome' ? 'text-maroon font-semibold' : ''}>
                Cuisine
              </span>
              <ArrowRight className="h-4 w-4" />
              <span className={currentPage === 'ingredients' ? 'text-maroon font-semibold' : ''}>
                Ingredients
              </span>
              <ArrowRight className="h-4 w-4" />
              <span className={currentPage === 'creation' ? 'text-maroon font-semibold' : ''}>
                Creation
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Page */}
        {currentPage === 'welcome' && (
          <div className="slide-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-maroon mb-4">
                Welcome to AI Culinary Creator
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Discover unique dishes created just for you! Select your favorite cuisine type 
                and let our AI chef create something extraordinary based on your ingredient preferences.
              </p>
              <div className="flex items-center justify-center space-x-2 text-maroon">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-semibold">Choose Your Cuisine Adventure</span>
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineSelect(cuisine)}
                  className="cuisine-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg border-2 border-transparent hover:border-maroon text-center group"
                >
                  <div className="text-4xl mb-3">
                    {cuisine === 'Italian' && '🍝'}
                    {cuisine === 'Chinese' && '🥢'}
                    {cuisine === 'Mexican' && '🌮'}
                    {cuisine === 'Indian' && '🍛'}
                    {cuisine === 'French' && '🥖'}
                    {cuisine === 'Thai' && '🍜'}
                    {cuisine === 'Mediterranean' && '🫒'}
                    {cuisine === 'Japanese' && '🍣'}
                    {cuisine === 'Korean' && '🍲'}
                    {cuisine === 'Spanish' && '🥘'}
                    {cuisine === 'Greek' && '🧄'}
                    {cuisine === 'Lebanese' && '🫓'}
                  </div>
                  <h3 className="text-lg font-semibold text-maroon group-hover:text-maroon-dark">
                    {cuisine}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients Page */}
        {currentPage === 'ingredients' && (
          <div className="slide-in">
            <div className="text-center mb-8">
              <button
                onClick={() => setCurrentPage('welcome')}
                className="inline-flex items-center space-x-2 text-maroon hover:text-maroon-dark mb-4"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Cuisines</span>
              </button>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">
                Select Your Ingredients
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                Creating a <span className="font-semibold text-maroon">{selectedCuisine}</span> dish
              </p>
              <p className="text-gray-600">
                Choose ingredients to create your perfect dish ({selectedIngredients.length} selected)
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-maroon mb-4 border-b border-sandal pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {ingredients.map((ingredient) => {
                      const isSelected = selectedIngredients.includes(ingredient.id);
                      return (
                        <button
                          key={ingredient.id}
                          onClick={() => handleIngredientToggle(ingredient.id)}
                          className={`ingredient-card p-4 rounded-lg border-2 text-center transition-all ${
                            isSelected
                              ? 'bg-maroon text-white border-maroon shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-maroon'
                          }`}
                        >
                          <div className="font-medium">{ingredient.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={handleCreateDish}
                disabled={selectedIngredients.length === 0}
                className="inline-flex items-center space-x-3 bg-maroon text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-maroon-light disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                <Sparkles className="h-6 w-6" />
                <span>Create My Dish</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Dish Creation Page */}
        {currentPage === 'creation' && generatedDish && (
          <div className="slide-in">
            <div className="text-center mb-8">
              <button
                onClick={() => setCurrentPage('ingredients')}
                className="inline-flex items-center space-x-2 text-maroon hover:text-maroon-dark mb-4"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Ingredients</span>
              </button>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8 text-maroon" />
                <h2 className="text-3xl md:text-4xl font-bold text-maroon">
                  Your Dish is Ready!
                </h2>
                <Sparkles className="h-8 w-8 text-maroon" />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                {/* Dish Image */}
                <div className="mb-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={generatedDish.imageUrl}
                      alt={dishName}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => {
                        // Fallback image if the original fails to load
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-sm font-medium text-maroon">{selectedCuisine} Cuisine</div>
                        <div className="text-xs text-gray-600">AI-Generated Creation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Dish Details */}
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Give your dish a name:
                      </label>
                      <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-maroon text-lg font-semibold"
                        placeholder="Enter dish name..."
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-maroon mb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{generatedDish.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-sandal p-3 rounded-lg">
                          <div className="text-sm font-medium text-maroon">Prep Time</div>
                          <div className="text-lg font-semibold">{generatedDish.preparationTime}</div>
                        </div>
                        <div className="bg-sandal p-3 rounded-lg">
                          <div className="text-sm font-medium text-maroon">Difficulty</div>
                          <div className="text-lg font-semibold">{generatedDish.difficulty}</div>
                        </div>
                      </div>

                      <div className="bg-sandal p-3 rounded-lg">
                        <div className="text-sm font-medium text-maroon">Serves</div>
                        <div className="text-lg font-semibold">{generatedDish.servings} people</div>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients & Instructions */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-maroon mb-3">Selected Ingredients</h3>
                      <div className="space-y-2">
                        {generatedDish.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-maroon rounded-full"></div>
                            <span className="text-gray-700">{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-maroon mb-3">Preparation Steps</h3>
                      <div className="space-y-3">
                        {generatedDish.instructions.map((instruction, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="bg-maroon text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-sandal">
                  <button className="inline-flex items-center space-x-2 bg-maroon text-white px-6 py-3 rounded-lg hover:bg-maroon-light transition-all">
                    <Save className="h-5 w-5" />
                    <span>Save Recipe</span>
                  </button>
                  <button className="inline-flex items-center space-x-2 bg-white text-maroon border-2 border-maroon px-6 py-3 rounded-lg hover:bg-sandal transition-all">
                    <Share2 className="h-5 w-5" />
                    <span>Share Dish</span>
                  </button>
                  <button
                    onClick={handleStartOver}
                    className="inline-flex items-center space-x-2 bg-sandal text-maroon px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
                  >
                    <ChefHat className="h-5 w-5" />
                    <span>Create Another</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sandal mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ChefHat className="h-6 w-6 text-maroon" />
              <span className="text-lg font-semibold text-maroon">AI Culinary Creator</span>
            </div>
            <p className="text-gray-600">
              Discover endless culinary possibilities with AI-powered dish creation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;