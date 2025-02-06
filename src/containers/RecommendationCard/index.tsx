import { RecipeDetailsType } from '../../types';
import './RecomendarionCard.css'

type RecommendationCardProps = {
  recipe: RecipeDetailsType;
  index: number;
};

function RecommendationCard({ recipe, index }: RecommendationCardProps) {
  return (
    <div
      data-testid={ `${index}-recommendation-card` }
      style={ { display: 'block' } }
      className="recommendation-card"
    >
      <h2
        className="recommendation-title"
        data-testid={ `${index}-recommendation-title` }
      >
        {recipe.strMeal || recipe.strDrink}
      </h2>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        style={ { width: '250px' } }
        className="recommendation-image"
      />  
      
    </div>
  );
}

export default RecommendationCard;
