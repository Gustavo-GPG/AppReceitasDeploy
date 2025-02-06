import { useEffect } from 'react';
import { getMealById, getDrinkById } from '../../helpers/fetchApi';
import useRecipeInProgress from '../../hooks/useRecipeInProgress';
import './RecipeInProgress.css';
import { Heart, Share2 } from 'lucide-react';

export default function RecipesInProgress() {
  const { copiedMessageVisible, copyToClipboard, drinkData, handleFavorite,
    isFavorited, mealData, selectedCheckboxes, setDrinkData, setIsFavorited, setMealData,
    setSelectedCheckboxes, id, pathname, handleCheck,
    numberOfIngredients, setNumberOfIngredients, totalIngredientsCount,
    handleCountIngredients, handleFinishRecipe } = useRecipeInProgress();


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


  useEffect(() => {
    const storedCheckboxes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '[]');
    setSelectedCheckboxes(storedCheckboxes);
  }, []);

  const saveSelectedCheckboxesToLocalStorage = (updatedCheckboxes: string[]) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCheckboxes));
  };

  const generateCheckBox = (data: any) => {
    const handleCheckboxChange = (ingredientKey: string) => {
      const updatedCheckboxes = selectedCheckboxes.includes(ingredientKey)
        ? selectedCheckboxes.filter((key) => key !== ingredientKey)
        : [...selectedCheckboxes, ingredientKey];

      const markedIngredientsCount = Object.keys(data)
        .filter((key) => key.startsWith('strIngredient')
        && updatedCheckboxes.includes(key))
        .length;

      setSelectedCheckboxes(updatedCheckboxes);
      saveSelectedCheckboxesToLocalStorage(updatedCheckboxes);

      handleCheck(ingredientKey);
      setNumberOfIngredients(markedIngredientsCount);
    };

    return (
      <div className="ingredient-list">
        {Object.keys(data)
          .filter((key) => key.startsWith('strIngredient') && data[key])
          .map((ingredientKey, index) => (
            <div
              key={ ingredientKey }
            >
              <label
                htmlFor={ ingredientKey }
                data-testid={ `${index}-ingredient-step` }
                style={ {
                  textDecoration: selectedCheckboxes.includes(ingredientKey)
                    ? 'line-through solid rgb(0, 0, 0)'
                    : 'none',
                } }
                className={`ingredient-label ${
                  selectedCheckboxes.includes(ingredientKey) ? 'checked' : ''
                }`}
              >
                <input
                  type="checkbox"
                  id={ ingredientKey }
                  onChange={ () => handleCheckboxChange(ingredientKey) }
                  checked={ selectedCheckboxes.includes(ingredientKey) }
                  className="ingredient-checkbox"
                />
                {data[ingredientKey]}
              </label>
            </div>
          ))}
      </div>      
    );
  };
  
  return (
    <div className="recipe-container">
      {mealData && (
         <div className="recipe-header">
            <h1
              data-testid="recipe-title"
              className="recipe-title"
            >
              {mealData.strMeal}
            </h1>
            <span className="recipe-category" data-testid="recipe-category">
              {mealData.strCategory}
            </span>
            
          <img
            className="recipe-image"
            data-testid="recipe-photo"
            src={ mealData.strMealThumb }
            alt={ mealData.strMeal }
          />

          <div className="recipe-instructions" data-testid="instructions">
            {mealData.strInstructions}
          </div>

          <div className="ingredients-section">
            <h3 className="ingredients-title">Ingredients</h3>
            {generateCheckBox(mealData)}
          </div>
          
        </div>
      )}
      {drinkData && (
        <div className="recipe-header">
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            {drinkData.strDrink}
          </h1>

          <span className="recipe-category" data-testid="recipe-category">
              {drinkData.strCategory}
          </span>

          <img
            className="recipe-image"
            data-testid="recipe-photo"
            src={ drinkData.strDrinkThumb }
            alt={ drinkData.strDrink }
          />
          <div className="recipe-instructions" data-testid="instructions">
            {drinkData.strInstructions}
          </div>
          
          <div className="ingredients-section">
            <h3 className="ingredients-title">Ingredients</h3>
            {generateCheckBox(drinkData)}
          </div>
        </div>
      )}
      <div className="actions-container">
        <button
          className="action-button share-button"
          data-testid="share-btn"
          onClick={ copyToClipboard }
        >
          <Share2 size={20} />
          Compartilhar
        </button>

        {copiedMessageVisible && <p>Link copied!</p>}
        <button
          onClick={ handleFavorite }
          className="action-button favorite-button"
        >
          <Heart
            size={20}
            fill={isFavorited ? "currentColor" : "none"}
            data-testid="favorite-btn"
          />
          {isFavorited ? 'Favorito' : 'Favorite'}
        </button>

        <button
          className="action-button finish-button"
          data-testid="finish-recipe-btn"
          disabled={ numberOfIngredients !== totalIngredientsCount }
          onClick={ () => handleFinishRecipe(mealData || drinkData) }
        >
          Finalizar receita
        </button>
      </div>
    </div>
  );
}
