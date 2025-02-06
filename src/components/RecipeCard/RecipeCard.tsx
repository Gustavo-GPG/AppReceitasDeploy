import { Link, useLocation } from 'react-router-dom';
import { RecipeCardProps } from '../../types';
import './RecipeCard.css';

function RecipeCard({ recipe, index, baseHeadTestId = 'card-name' }: RecipeCardProps) {
  const { pathname } = useLocation();
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <Link 
        to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }
        className="recipe-link"
      >
        <div className="recipe-image-container">
          <img
            className="recipe-image"
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
        </div>
        <div className="recipe-content">
          <h2
            className="recipe-title"
            data-testid={ `${index}-${baseHeadTestId}` }
          >
            {recipe.strMeal || recipe.strDrink }
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default RecipeCard;
