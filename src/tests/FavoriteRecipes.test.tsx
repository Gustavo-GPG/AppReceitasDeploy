import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

const FavoriteRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('testes da página de receitas favoritas', () => {
  const favoriteRecipes = 'favoriteRecipes';
  const routeFav = '/favorite-recipes';

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(FavoriteRecipesMock));
  });
  afterEach(() => {
    renderWithRouter(<App />);
  });
  it('verificando renderização dos elementos', () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);
    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const nameSpicy = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    expect(nameSpicy).toBeInTheDocument();
  });
  it('testando rotas', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);
    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    await userEvent.click(imageSpicy);
    expect(imageSpicy).not.toBeInTheDocument();
  });

  it('testando filter Meals', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnMeals);
    expect(imageAquamarine).not.toBeInTheDocument();
    expect(imageSpicy).toBeInTheDocument();
  });

  it('testando filter Drinks', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnDrinks);
    expect(imageSpicy).not.toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
  });

  it('testando botão de copiar', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);
    const btnCopy = screen.getByTestId('btn-Copy0');
    await userEvent.click(btnCopy);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });

  it('testando filter All', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);

    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(imageSpicy).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    await userEvent.click(btnDrinks);
    expect(imageSpicy).not.toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();

    await userEvent.click(btnAll);

    expect(screen.queryByRole('heading', {
      name: /spicy arrabiata penne/i,
    })).toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /aquamarine/i,
    })).toBeInTheDocument();
  });

  it('removendo receitas favoritas', async () => {
    renderWithRouter(<App />, { route: routeFav });
    expect(JSON.parse(localStorage.getItem(favoriteRecipes) || '[]')).toEqual(FavoriteRecipesMock);
    const imageSpicy = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const imageAquamarine = screen.getByRole('img', {
      name: /aquamarine/i,
    });
    const btnFavoriteSpicy = screen.getByTestId('btn-favorite0');

    expect(imageAquamarine).toBeInTheDocument();
    expect(imageSpicy).toBeInTheDocument();
    expect(btnFavoriteSpicy).toBeInTheDocument();

    await userEvent.click(btnFavoriteSpicy);

    expect(imageSpicy).not.toBeInTheDocument();
    expect(imageAquamarine).toBeInTheDocument();
  });
});
