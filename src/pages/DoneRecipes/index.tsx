import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import { Header } from '../../components';
import './DoneRecipes.css';

function DoneRecipes() {
  const [filtrar, setFiltrar] = useState('all');
  const [copyIndex, setCopyIndex] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('doneRecipes') || 'null') || []);
  }, []);

  const recipesFilter = recipes.filter((recipe) => {
    if (filtrar === 'all') return true;
    return recipe.type === filtrar;
  });

  const handleClick = (
    id: string,
    type: string,
    index: number,
  ) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {
          setCopyIndex(null);
        }, 3000);
      });
  };

  return (
    <>
      <Header />
      <div className="done-filters-btn">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFiltrar('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFiltrar('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFiltrar('drink') }
        >
          Drinks
        </button>
      </div>

      {recipesFilter.map((recipe, index) => (

        <div key={ index } className="done-div-donerecipes">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { maxWidth: '150px', maxHeight: '150px' } }
            />
          </Link>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          { recipesFilter[index].type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}

            </p>
          ) : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </p>
          )}
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}

          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleClick(recipe.id, recipe.type, index) }
          >
            <img
              src={ shareIcon }
              alt="share"
            />
          </button>
          {copyIndex === index && <p>Link copied!</p>}

          {recipe.tags.length > 0 && recipe.tags.map((tagName, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
              className="tag"
            >
              {tagName}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
