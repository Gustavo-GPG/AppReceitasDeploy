import { Route, Routes } from 'react-router-dom';
import { MealsRecipes, DrinksRecipes,
  MealsRecipesProgress, DrinksRecipesProgress, DoneRecipes } from '../pages';
import Login from '../components/Login';
import Provider from '../Context/Provider/GlobalContextProvider';
import Home from '../../Home';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Profile from '../pages/Profile/Profile';
import RecipeDetails from '../components/RecipeDetails';

function Rotas() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route index path="/meals" element={ <Home /> } />
        <Route path="/drinks" element={ <Home /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/meals/:id-da-receita" element={ <MealsRecipes /> } />
        <Route path="/drinks/:id-da-receita" element={ <DrinksRecipes /> } />
        <Route path="/meals/:id" element={ <RecipeDetails tipo="meals" /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails tipo="drinks" /> } />
        <Route path="/meals/:id/in-progress" element={ <MealsRecipesProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <DrinksRecipesProgress /> } />
        <Route
          path="/meals/:id-da-receita/in-progress"
          element={ <MealsRecipesProgress /> }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          element={ <DrinksRecipesProgress /> }
        />
      </Routes>
    </Provider>
  );
}

export default Rotas;
