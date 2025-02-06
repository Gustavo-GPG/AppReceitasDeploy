import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAllRecipes } from '../../helpers/fetchApi';
import RecipeCard from '../RecipeCard/RecipeCard';
import { RecipeType } from '../../types';
import { GlobalContext } from '../../Context/GlobalContext';
import './Recipes.css';

export default function Recipes() {
  const [layout, setLayout] = useContext(GlobalContext);
  const { searchResults } = layout;
  const { pathname } = useLocation();

  useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchAllRecipes(pathname);
      setLayout((prevLayout) => ({
        ...prevLayout,
        searchResults: {
          ...prevLayout.searchResults,
          [pathname.replace('/', '')]: data,
        },
      }));
    };
    initialFetch();
  }, [pathname, setLayout]);

  const renderRecipes = (recipes: RecipeType[]) => (
    recipes.slice(0, 12).map((recipe, index) => (
      <RecipeCard
        index={ index }
        key={ recipe.idMeal || recipe.idDrink }
        recipe={ recipe }
        data-testid={ `${recipe.idMeal || recipe.idDrink}-recipe-card` }
      />
    ))
  );

  return (
    <div className="recipes-container">
      {pathname === '/meals' && searchResults.meals.length > 0 && renderRecipes(searchResults.meals)}
      {pathname === '/drinks' && searchResults.drinks.length > 0 && renderRecipes(searchResults.drinks)}
    </div>
  );
}
