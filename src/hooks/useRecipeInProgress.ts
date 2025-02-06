import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DrinksDetailsType, MealsDetailsType } from '../types';

function useRecipeInProgress() {
  const [drinkData, serDrinkData] = useState<DrinksDetailsType | null>(null);
  const [mealData, setMealData] = useState<MealsDetailsType | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);
  const [totalIngredientsCount, setTotalIngredientsCount] = useState(0);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleFavorite = () => {
    const favoriteRecipe = {
      id,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: mealData?.strArea || drinkData?.strArea || '',
      category: mealData?.strCategory || drinkData?.strCategory || '',
      alcoholicOrNot: drinkData?.strAlcoholic || '',
      name: mealData?.strMeal || drinkData?.strDrink || '',
      image: mealData?.strMealThumb || drinkData?.strDrinkThumb || '',
    };
    const storedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    const isAlreadyFavorited = storedFavoriteRecipes
      .some((recipe: { id: string | undefined; }) => recipe.id === favoriteRecipe.id);

    if (isAlreadyFavorited) {
      const updatedFavoriteRecipes = storedFavoriteRecipes
        .filter((recipe: { id: string | undefined; }) => recipe.id !== favoriteRecipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    } else {
      const updatedFavoriteRecipes = [...storedFavoriteRecipes, favoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    }

    setIsFavorited(!isAlreadyFavorited);
    if (isAlreadyFavorited) {
      const updatedFavoriteRecipes = storedFavoriteRecipes
        .filter((recipe: { id: string | undefined; }) => recipe.id !== favoriteRecipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
      setIsFavorited(false);
    } else {
      const updatedFavoriteRecipes = [...storedFavoriteRecipes, favoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
      setIsFavorited(true);
    }
  };

  const copyToClipboard = () => {
    const newPathname = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(newPathname);
    setCopiedMessageVisible(true);
    setTimeout(() => {
      setCopiedMessageVisible(false);
    }, 3000);
  };

  const handleCheck = (ingredient: string) => {
    setCheckedIngredients((prev) => (prev.includes(ingredient)
      ? prev.filter((i) => i !== ingredient)
      : [...prev, ingredient]));
  };

  const handleCountIngredients = (data: any) => {
    const totalcount = Object.keys(data)
      .filter((key) => key
        .startsWith('strIngredient') && data[key] && data[key].trim() !== '')
      .length;

    setTotalIngredientsCount(totalcount);
  };

  const handleFinishRecipe = (recipeData: any) => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    const doneRecipe = {
      id,
      nationality: recipeData?.strArea || '',
      name: recipeData?.strDrink || recipeData?.strMeal || '',
      category: recipeData?.strCategory || '',
      image: recipeData?.strDrinkThumb || recipeData?.strMealThumb || '',
      tags: recipeData?.strTags ? recipeData.strTags.split(',') : [],
      alcoholicOrNot: recipeData?.strAlcoholic || '',
      type: pathname.includes('meals') ? 'meal' : 'drink',
      doneDate: new Date().toISOString(),
    };

    const updatedDoneRecipes = [...storedDoneRecipes, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    navigate('/done-recipes');
  };

  return {
    drinkData,
    serDrinkData,
    mealData,
    setMealData,
    isFavorited,
    setIsFavorited,
    handleFavorite,
    selectedCheckboxes,
    setSelectedCheckboxes,
    copiedMessageVisible,
    setCopiedMessageVisible,
    copyToClipboard,
    id,
    pathname,
    checkedIngredients,
    setCheckedIngredients,
    handleCheck,
    numberOfIngredients,
    setNumberOfIngredients,
    totalIngredientsCount,
    setTotalIngredientsCount,
    handleCountIngredients,
    handleFinishRecipe,
  };
}

export default useRecipeInProgress;
