import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';
import { fetchAllRecipes,
  fetchByCategory, fetchCategories } from '../../helpers/fetchApi';
  import './RecipesCategories.css';

interface Category {
  strCategory: string;
}

function RecipesCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { pathname } = useLocation();
  const [layout, setLayout] = useContext(GlobalContext);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    (async () => {
      const dataCategory = await fetchCategories(pathname);
      setCategories(dataCategory);
    })();
  }, [pathname]);

  const fetchRecipes = async (newCategory: string) => {
    const ternary = newCategory === category ? '' : newCategory;
    setCategory(ternary);
    const data = ternary === '' ? await fetchAllRecipes(pathname)
      : await fetchByCategory(pathname, newCategory);

    setLayout({
      searchResults: {
        ...layout.searchResults,
        [pathname.replace('/', '')]: data,
      },
    });
  };

  const buttonAll = async () => {
    const data = await fetchAllRecipes(pathname);
    setLayout({
      searchResults: {
        ...layout.searchResults,
        [pathname.replace('/', '')]: data,
      },
    });
  };

  return (
    <div className="categories-container">
      <button
        onClick={ buttonAll }
        data-testid="All-category-filter"
        className="category-button"
      >
        All
      </button>
        {categories.map((currCategory) => (
          <button
            onClick={ () => fetchRecipes(currCategory.strCategory) }
            key={ currCategory.strCategory }
            data-testid={ `${currCategory.strCategory}-category-filter` }
            className="category-button"
          >
            {currCategory.strCategory}
          </button>
        ))}
    </div>
  );
}

export default RecipesCategories;
