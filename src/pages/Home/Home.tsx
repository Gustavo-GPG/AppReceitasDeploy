import Footer from '../../components/Footer';
import { Header } from '../../components';
import Recipes from '../../components/Recipes/Recipes';
import RecipesCategories from '../../components/RecipesCategories/RecipeCategories';

function Home() {
  return (
    <>
      <Header />
      <RecipesCategories />
      <Recipes />
      <Footer />
    </>
  );
}

export default Home;
