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
        <Route path="/AppReceitasDeploy" element={ <Login /> } />
        <Route index path="/AppReceitasDeploy/meals" element={ <Home /> } />
        <Route path="/AppReceitasDeploy/drinks" element={ <Home /> } />
        <Route path="/AppReceitasDeploy/profile" element={ <Profile /> } />
        <Route path="/AppReceitasDeploy/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/AppReceitasDeploy/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/AppReceitasDeploy/meals/:id-da-receita" element={ <MealsRecipes /> } />
        <Route path="/AppReceitasDeploy/drinks/:id-da-receita" element={ <DrinksRecipes /> } />
        <Route path="/AppReceitasDeploy/meals/:id" element={ <RecipeDetails tipo="meals" /> } />
        <Route path="/AppReceitasDeploy/drinks/:id" element={ <RecipeDetails tipo="drinks" /> } />
        <Route path="/AppReceitasDeploy/meals/:id/in-progress" element={ <MealsRecipesProgress /> } />
        <Route path="/AppReceitasDeploy/drinks/:id/in-progress" element={ <DrinksRecipesProgress /> } />
        <Route
          path="/AppReceitasDeploy/meals/:id-da-receita/in-progress"
          element={ <MealsRecipesProgress /> }
        />
        <Route
          path="/AppReceitasDeploy/drinks/:id-da-receita/in-progress"
          element={ <DrinksRecipesProgress /> }
        />
      </Routes>
    </Provider>
  );
}

export default Rotas;
