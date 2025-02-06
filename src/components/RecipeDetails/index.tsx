import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { RecipeDetailsType } from '../../types';
import RecommendationCard from '../../containers/RecommendationCard';
import { getMealById, getDrinkById } from '../../helpers/fetchApi';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import useRecipeInProgress from '../../hooks/useRecipeInProgress';
import './RecipeDetails.css'

function RecipeDetails(props: any) {
  const [mealsRecomendation, setMealsRecomendation] = useState<RecipeDetailsType[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const { handleFavorite,
    isFavorited, setIsFavorited, setMealData, setDrinkData,
    handleCountIngredients } = useRecipeInProgress();
  const { pathname } = useLocation();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao buscar as refeições.');
      })
      .then((data) => {
        setMealsRecomendation(data.meals); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => {
        console.error('.Erro ao buscar as refeições:', error);
      });
  }, []);

  const [drinksRecomendations, setDrinksRecomendation] = useState();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=all')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao buscar as refeições');
      })
      .then((data) => {
        setDrinksRecomendation(data.drinks); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => {
        console.error('Erro ao buscar as refeições:', error);
      });
  }, []);

  const { tipo } = props;
  const { id } = useParams<string>();
  const path = tipo === 'meals' ? 'themealdb' : 'thecocktaildb';
  const [recipes, setRecipes] = useState<RecipeDetailsType[]>([]);
  const paragraphs = Array.from({ length: 20 }, (_, index) => index + 1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.${path}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao buscar as refeições');
      })
      .then((data) => {
        setRecipes(data.meals || data.drinks); // Atualiza o estado com os dados recebidos
      })
      .catch((error) => {
        console.error('Erro ao buscar as refeições:', error);
      });
  }, [id, path]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (id !== undefined) {
          if (pathname.includes('meals')) {
            data = await getMealById(id);
            setMealData(data);
          } else {
            data = await getDrinkById(id);
            setDrinkData(data);
          }
          handleCountIngredients(data);
        }
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
    const storedFavoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyFavorited = storedFavoriteRecipes
      .some((recipe: { id: string | undefined; }) => recipe.id === id);
    setIsFavorited(isAlreadyFavorited);
  }, [id, pathname]);

  const handleShare = () => {
    const newPathname = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(newPathname);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  const recommendations = tipo === 'meals' ? drinksRecomendations : mealsRecomendation;
  const handleProgress = () => {
    if (tipo === 'meals') {
      navigate(`/AppReceitasDeploy/meals/${id}/in-progress`);
    } else if (tipo === 'drinks') {
      navigate(`/AppReceitasDeploy/drinks/${id}/in-progress`);
    }
  };

  return (
    <div className="recipe-details">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index} className="recipe-details-card">
            <h1 className="recipe-details-title" data-testid="recipe-title">
              {recipe.strMeal || recipe.strDrink}
            </h1>
            <img
              className="recipe-details-image"
              src={ tipo === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt=""
              data-testid="recipe-photo"
            />
            <p className="recipe-details-category" data-testid="recipe-category">
              {recipe.strCategory}
              {recipe.strAlcoholic && ` • ${recipe.strAlcoholic}`}
            </p>
            <div className="ingredients-details-section">
              {paragraphs.map((item, index1) => {
                const ingredientKey = `strIngredient${index1}` as keyof RecipeDetailsType;
                const measureKey = `strMeasure${index1}` as keyof RecipeDetailsType;
                
                const ingredient = recipe[ingredientKey];
                const measure = recipe[measureKey];

                if (!ingredient) return null;

                return (
                  <div key={index1}>
                    <p
                      className="ingredient-details-item"
                      data-testid={`${index1 - 1}-ingredient-name-and-measure`}
                    >
                      {ingredient} {measure ? `- ${measure}` : ''}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="details-instructions" data-testid="instructions">
              {recipe.strInstructions}
            </p>
            {recipe.strYoutube && (
              <div className="details-video-container" data-testid="video">
                <iframe
                  src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                  title="Recipe Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="loading">Loading...</p>
      )}

      <div className="details-recommendations">
        <span className='recomendations-details-title'>Recomendações: </span>
        {recommendations && recommendations.slice(0, 6).map((recipe, index) => (
          <RecommendationCard key={index} recipe={recipe} index={index} />
        ))}
      </div>
      <div className="details-action-buttons">
        <button
          className="detail-action-button"
          data-testid="start-recipe-btn"
          onClick={handleProgress}
        >
          {tipo === 'meals' ? 'Start' : 'Continue'} Recipe
        </button>

        <button 
          className="detail-action-button"
          data-testid="share-btn" 
          onClick={handleShare}
        >
          <img src={shareIcon} alt="Share" />
          Compartilhar
        </button>

        <button
          className="detail-action-button"
          onClick={handleFavorite}
        >
          <img
            src={isFavorited ? blackHeartIcon : whiteHeartIcon}
            alt="Favorite Recipe"
            data-testid="favorite-btn"
          />
          Favorite
        </button>
      </div>
      {linkCopied && (
        <div className="detail-copy-notification">
          Link copied!
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
