import { DrinksDetailsType, MealsDetailsType, RecipeType } from '../types';

const mealAPI = 'https://www.themealdb.com/api/json/v1/1';
const cocktailAPI = 'https://www.thecocktaildb.com/api/json/v1/1';

// função para buscar comidas por ingrediente, nome ou primeira letra

async function searchMealsAPI(option: string, query: string) : Promise<RecipeType[]> {
  let endpoint = '';

  if (option === 'ingredient') {
    endpoint = `${mealAPI}/filter.php?i=${query}`;
  } else if (option === 'name') {
    endpoint = `${mealAPI}/search.php?s=${query}`;
  } else if (option === 'first-letter') {
    endpoint = `${mealAPI}/search.php?f=${query}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.meals ? data.meals : [];
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

async function searchCocktailsAPI(option: string, query: string) : Promise<RecipeType[]> {
  let endpoint = '';

  if (option === 'ingredient') {
    endpoint = `${cocktailAPI}/filter.php?i=${query}`;
  } else if (option === 'name') {
    endpoint = `${cocktailAPI}/search.php?s=${query}`;
  } else if (option === 'first-letter') {
    endpoint = `${cocktailAPI}/search.php?f=${query}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.drinks ? data.drinks : [];
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}

async function getMealById(idMeal: string) : Promise<MealsDetailsType | null> {
  const endpoint = `${mealAPI}/lookup.php?i=${idMeal}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data.meals[0] ? data.meals[0] : null;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}
async function getDrinkById(idDrink: string): Promise<DrinksDetailsType | null> {
  const endpoint = `${cocktailAPI}/lookup.php?i=${idDrink}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.drinks[0] ? data.drinks[0] : null;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}
 async function getMealsRecommendations(): Promise<RecipeType[]> {
   const endpoint = `${mealAPI}/search.php?s=`;
   try {
     const response = await fetch(endpoint);
     const data = await response.json();
     return data.meals ? data.meals.slice(0, 6) : [];
   } catch (error) {
     console.error('Erro:', error);
     return [];
   }
 }

 async function getDrinksRecommendations(): Promise<RecipeType[]> {
   const endpoint = `${cocktailAPI}/search.php?s=`;
   try {
     const response = await fetch(endpoint);
     const data = await response.json();

     return data.drinks ? data.drinks.slice(0, 6) : [];
   } catch (error) {
     console.error('Erro:', error);
     return [];
   }
 }
const fetchByCategory = async (pathname: string, category: string) => {
  try {
    const endpoint = pathname === '/meals'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    return (data[pathname.replace('/', '')].slice(0, 12));
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
};

const fetchAllRecipes = async (pathname: string) => {
  try {
    const endpointAll = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all';

    const responseAll = await fetch(endpointAll);
    const dataAll = await responseAll.json();
    return (dataAll[pathname.replace('/', '')].slice(0, 12));
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
};
const fetchCategories = async (pathname: string) => {
  try {
    const endpoint = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const response = await fetch(endpoint);
    const data = await response.json();
    return (data[pathname.replace('/', '')].slice(0, 5));
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};
export { fetchCategories,
  fetchAllRecipes,
  fetchByCategory,
  searchMealsAPI,
  searchCocktailsAPI,
  getMealById,
  getDrinkById };
