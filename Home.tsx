import Footer from './src/components/Footer';
import { Header } from './src/components';
import Recipes from './src/components/Recipes/Recipes';
import RecipesCategories from './src/components/RecipesCategories/RecipeCategories';

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
