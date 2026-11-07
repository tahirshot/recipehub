import { Category, Recipe } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Preset curated fallback recipes for offline simulation or network hiccups
export const FALLBACK_RECIPES: Recipe[] = [
  {
    id: '52772',
    name: 'Teriyaki Chicken Casserole',
    category: 'Chicken',
    area: 'Japanese',
    instructions: 'Preheat oven to 350° F. Spray a 9x13-inch baking dish with cooking spray.\n\nCombine soy sauce, water, brown sugar, ginger and garlic in a small saucepan over medium heat. Bring to a boil, reduce heat and simmer 5 minutes.\n\nIn a small bowl, whisk cornstarch and cold water until smooth. Pour into soy sauce mixture and simmer until thickened, 1 to 2 minutes.\n\nPlace chicken breasts into prepared baking dish. Pour 1 cup of sauce over chicken. Bake until chicken is cooked through, about 30 minutes.\n\nRemove from oven, shred chicken, and toss with cooked rice, broccoli, and remaining teriyaki sauce. Garnish with sesame seeds.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    tags: ['Meat', 'Casserole', 'Asian'],
    youtubeUrl: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
    cookTimeMinutes: 45,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Soy Sauce', measure: '3/4 cup' },
      { name: 'Water', measure: '1/2 cup' },
      { name: 'Brown Sugar', measure: '1/4 cup' },
      { name: 'Ground Ginger', measure: '1/2 tsp' },
      { name: 'Minced Garlic', measure: '1/2 tsp' },
      { name: 'Cornstarch', measure: '4 tbsp' },
      { name: 'Chicken Breasts', measure: '2' },
      { name: 'Stir-fry Vegetables', measure: '1 (12 oz.) bag' },
      { name: 'Brown Rice', measure: '3 cups cooked' },
    ],
  },
  {
    id: '52855',
    name: 'Banana Pancakes',
    category: 'Breakfast',
    area: 'American',
    instructions: 'In a bowl, mash the ripe banana with a fork until smooth.\n\nAdd the egg, milk, melted butter, and vanilla extract. Whisk together until thoroughly blended.\n\nIn another bowl, whisk together flour, baking powder, and a pinch of salt. Fold the dry ingredients into the wet batter until just combined (small lumps are okay).\n\nHeat a lightly greased non-stick skillet over medium-high heat. Pour 1/4 cup of batter per pancake.\n\nCook until bubbles surface and pop, about 2-3 minutes. Flip and cook until golden brown on the other side, 1-2 minutes. Serve warm with maple syrup and sliced fresh bananas.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
    tags: ['Breakfast', 'Desert', 'Sweet'],
    youtubeUrl: 'https://www.youtube.com/watch?v=kSKtb2Sv-_U',
    cookTimeMinutes: 20,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Banana', measure: '1 large ripe' },
      { name: 'Egg', measure: '1' },
      { name: 'Flour', measure: '1 cup' },
      { name: 'Milk', measure: '3/4 cup' },
      { name: 'Baking Powder', measure: '2 tsp' },
      { name: 'Butter', measure: '2 tbsp melted' },
      { name: 'Maple Syrup', measure: 'For serving' },
    ],
  },
  {
    id: '52948',
    name: 'Creamy Tomato Pasta',
    category: 'Pasta',
    area: 'Italian',
    instructions: 'Bring a large pot of salted water to a boil. Cook pasta al dente according to package directions, reserving 1/2 cup of starchy pasta water before draining.\n\nIn a large skillet over medium heat, warm olive oil. Sauté finely minced garlic and red pepper flakes for 1 minute until fragrant.\n\nAdd crushed tomatoes, Italian seasoning, salt, and pepper. Simmer gently for 10 minutes.\n\nStir in heavy cream and grated parmesan cheese until silky. Toss in the drained pasta and fresh basil leaves, adding a splash of reserved pasta water if needed to loosen the sauce. Serve immediately.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    tags: ['Pasta', 'ComfortFood', 'Vegetarian'],
    youtubeUrl: 'https://www.youtube.com/watch?v=1IszT_guI08',
    cookTimeMinutes: 25,
    servings: 3,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Penne or Fettuccine', measure: '300g' },
      { name: 'Olive Oil', measure: '2 tbsp' },
      { name: 'Garlic', measure: '3 cloves' },
      { name: 'Crushed Tomatoes', measure: '400g can' },
      { name: 'Heavy Cream', measure: '1/2 cup' },
      { name: 'Parmesan Cheese', measure: '1/2 cup grated' },
      { name: 'Fresh Basil', measure: 'Handful' },
    ],
  },
  {
    id: '52774',
    name: 'Pad See Ew',
    category: 'Beef',
    area: 'Thai',
    instructions: 'Slice beef thinly across the grain. Marinate with 1 tsp soy sauce and cornstarch for 10 minutes.\n\nHeat wok over high heat with 2 tbsp vegetable oil. Add minced garlic and cook for 15 seconds.\n\nAdd beef and stir-fry until 80% cooked. Push to side of wok, crack eggs into the empty space, and scramble lightly.\n\nAdd wide rice noodles, Chinese broccoli (Gai Lan), dark soy sauce, oyster sauce, and sugar. Toss vigorously over very high heat for 2-3 minutes to caramelize the noodles and create wok hei smokiness.\n\nServe hot with chilli flakes and white vinegar.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    tags: ['Stir-fry', 'Noodles', 'Spicy'],
    youtubeUrl: 'https://www.youtube.com/watch?v=Ohy1DELF4is',
    cookTimeMinutes: 20,
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Wide Rice Noodles', measure: '350g' },
      { name: 'Beef Flank Steak', measure: '200g' },
      { name: 'Chinese Broccoli', measure: '2 cups chopped' },
      { name: 'Eggs', measure: '2' },
      { name: 'Dark Soy Sauce', measure: '2 tbsp' },
      { name: 'Oyster Sauce', measure: '1.5 tbsp' },
      { name: 'Garlic', measure: '4 cloves' },
    ],
  },
  {
    id: '52893',
    name: 'Apple & Blackberry Crumble',
    category: 'Dessert',
    area: 'British',
    instructions: 'Heat oven to 190C/170C fan/gas 5. Peel, core and slice the apples. Toss with blackberries and 2 tbsp sugar in an ovenproof baking dish.\n\nFor the crumble topping, place flour, rolled oats, cubed cold butter, and remaining sugar into a mixing bowl.\n\nRub together with your fingertips until the mixture resembles coarse, clumpy breadcrumbs.\n\nScatter the crumble mixture evenly over the fruit layer. Bake for 35 to 40 minutes until golden brown on top and fruit juices bubble around the edges.\n\nServe warm with vanilla custard, cream, or vanilla ice cream.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
    tags: ['Dessert', 'Baking', 'Fruit'],
    youtubeUrl: 'https://www.youtube.com/watch?v=4vhcOwCNNE4',
    cookTimeMinutes: 50,
    servings: 6,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Bramley Apples', measure: '4 large' },
      { name: 'Blackberries', measure: '200g' },
      { name: 'Plain Flour', measure: '150g' },
      { name: 'Rolled Oats', measure: '50g' },
      { name: 'Cold Butter', measure: '100g cubed' },
      { name: 'Brown Sugar', measure: '100g' },
    ],
  },
  {
    id: '52819',
    name: 'Cajun Spiced Fish Tacos',
    category: 'Seafood',
    area: 'Mexican',
    instructions: 'In a bowl, mix cajun seasoning with olive oil. Rub generously over the white fish fillets.\n\nHeat a cast-iron skillet over medium-high heat. Sear fish for 3-4 minutes per side until blackened and easily flaked with a fork.\n\nIn another bowl, toss shredded red cabbage with lime juice, chopped coriander, and a pinch of salt to make crisp slaw.\n\nWarm corn or flour tortillas in a dry pan.\n\nAssemble tacos with flaked seasoned fish, crisp slaw, sliced avocado, and a drizzle of lime crema.',
    thumbnail: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
    tags: ['Fish', 'Tacos', 'Fresh'],
    youtubeUrl: 'https://www.youtube.com/watch?v=p4vW734J8Z0',
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      { name: 'White Fish Fillets (Cod/Tilapia)', measure: '400g' },
      { name: 'Cajun Seasoning', measure: '2 tbsp' },
      { name: 'Small Tortillas', measure: '8' },
      { name: 'Red Cabbage', measure: '2 cups shredded' },
      { name: 'Avocado', measure: '1 sliced' },
      { name: 'Fresh Lime', measure: '2' },
      { name: 'Sour Cream or Mayo', measure: '1/3 cup' },
    ],
  },
];

export const POPULAR_CATEGORIES: Category[] = [
  { id: '1', name: 'Chicken', thumbnail: 'https://www.themealdb.com/images/category/chicken.png', description: 'Tender poultry dishes from casseroles to roasts' },
  { id: '2', name: 'Beef', thumbnail: 'https://www.themealdb.com/images/category/beef.png', description: 'Hearty steak, stews, and gourmet burgers' },
  { id: '3', name: 'Dessert', thumbnail: 'https://www.themealdb.com/images/category/dessert.png', description: 'Sweet treats, pies, cakes, and puddings' },
  { id: '4', name: 'Pasta', thumbnail: 'https://www.themealdb.com/images/category/pasta.png', description: 'Classic Italian pastas and creamy bakes' },
  { id: '5', name: 'Seafood', thumbnail: 'https://www.themealdb.com/images/category/seafood.png', description: 'Fresh fish fillets, prawns, and coastal delicacies' },
  { id: '6', name: 'Vegetarian', thumbnail: 'https://www.themealdb.com/images/category/vegetarian.png', description: 'Wholesome plant-rich recipes and bowls' },
  { id: '7', name: 'Breakfast', thumbnail: 'https://www.themealdb.com/images/category/breakfast.png', description: 'Morning pancakes, eggs, and energy bowls' },
  { id: '8', name: 'Pork', thumbnail: 'https://www.themealdb.com/images/category/pork.png', description: 'Savory chops, roasts, and stir-fries' },
];

// Helper to convert TheMealDB raw meal object into Recipe
function formatRawMeal(meal: Record<string, any>): Recipe {
  const ingredients: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({
        name: ing.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }

  // Generate realistic cook times based on category/ingredients
  let cookTime = 30;
  if (meal.strCategory === 'Beef') cookTime = 50;
  else if (meal.strCategory === 'Dessert') cookTime = 40;
  else if (meal.strCategory === 'Pasta') cookTime = 25;
  else if (meal.strCategory === 'Breakfast') cookTime = 20;
  else if (meal.strCategory === 'Seafood') cookTime = 25;

  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
  if (ingredients.length <= 6) difficulty = 'Easy';
  else if (ingredients.length > 12) difficulty = 'Hard';

  const tags = meal.strTags ? meal.strTags.split(',').map((t: string) => t.trim()) : [];

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || 'General',
    area: meal.strArea || 'International',
    instructions: meal.strInstructions || 'No instructions provided.',
    thumbnail: meal.strMealThumb || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
    tags,
    youtubeUrl: meal.strYoutube || undefined,
    ingredients,
    source: meal.strSource || undefined,
    cookTimeMinutes: cookTime,
    servings: 4,
    difficulty,
  };
}

export const mealDbService = {
  // Search recipes by query
  async searchRecipes(query: string = ''): Promise<Recipe[]> {
    try {
      const q = query.trim();
      const url = q ? `${BASE_URL}/search.php?s=${encodeURIComponent(q)}` : `${BASE_URL}/search.php?s=a`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.meals) {
        return [];
      }
      return data.meals.map(formatRawMeal);
    } catch (err) {
      console.warn('TheMealDB search failed, using fallback recipes', err);
      if (!query.trim()) return FALLBACK_RECIPES;
      return FALLBACK_RECIPES.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Get recipes by category
  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    try {
      if (category === 'All') {
        return this.searchRecipes('');
      }
      const url = `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.meals) return [];
      
      // The filter endpoint only returns idMeal, strMeal, strMealThumb.
      // We can fetch details for top 12 or use lightweight format
      const previewMeals: Recipe[] = data.meals.slice(0, 14).map((m: any) => ({
        id: m.idMeal,
        name: m.strMeal,
        category,
        instructions: 'Tap to load full detailed step-by-step instructions from RecipeHub.',
        thumbnail: m.strMealThumb,
        ingredients: [
          { name: 'Fresh Ingredients', measure: 'As needed' },
          { name: 'Seasonings', measure: 'To taste' },
        ],
        cookTimeMinutes: 30,
        servings: 4,
        difficulty: 'Medium' as const,
      }));
      return previewMeals;
    } catch (err) {
      console.warn('TheMealDB category fetch failed', err);
      return FALLBACK_RECIPES.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }
  },

  // Get recipe by ID with full details
  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        return formatRawMeal(data.meals[0]);
      }
      const fallback = FALLBACK_RECIPES.find((r) => r.id === id);
      return fallback || null;
    } catch (err) {
      const fallback = FALLBACK_RECIPES.find((r) => r.id === id);
      return fallback || null;
    }
  },

  // Get Categories
  async getCategories(): Promise<Category[]> {
    try {
      const url = `${BASE_URL}/categories.php`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.categories) {
        return data.categories.map((c: any) => ({
          id: c.idCategory,
          name: c.strCategory,
          thumbnail: c.strCategoryThumb,
          description: c.strCategoryDescription || '',
        }));
      }
      return POPULAR_CATEGORIES;
    } catch (err) {
      return POPULAR_CATEGORIES;
    }
  },

  // Get random meal for featured banner
  async getRandomMeal(): Promise<Recipe> {
    try {
      const url = `${BASE_URL}/random.php`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        return formatRawMeal(data.meals[0]);
      }
      return FALLBACK_RECIPES[0];
    } catch {
      return FALLBACK_RECIPES[0];
    }
  },
};
