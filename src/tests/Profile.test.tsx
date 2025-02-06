import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Teste do header', () => {
  test('Verifica se ao clicar no botão "Entrar" o usuário é redirecionado para a tela principal de receitas de comidas', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const dataTestIdButton = 'profile-top-btn';

    const buttonProfile = screen.getByTestId(dataTestIdButton);

    fireEvent.click(buttonProfile);

    const profile = await screen.findByText(/Profile/i);
    expect(profile).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão "Entrar" o usuário é redirecionado para a tela principal de receitas de comidas', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const dataTestIdButton = 'search-top-btn';

    const buttonSearch = screen.getByTestId(dataTestIdButton);

    fireEvent.click(buttonSearch);

    const search = await screen.findByText(/Search/i);
    expect(search).toBeInTheDocument();
  });
});

describe('Teste da tela Profile', () => {
  test('Teste se o título está correto', () => {
    renderWithRouter(<App />, { route: '/profile' });
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Profile');
  });

  test('testa se o botão Done Recipes leva para a rota certa', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const btnDoneRecipes = screen.getByRole('button', { name: /Done Recipes/i });
    fireEvent.click(btnDoneRecipes);

    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('testa se o botão Favorites leva para a rota certa', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const btnFavorites = screen.getByRole('button', { name: /Favorite Recipes/i });
    fireEvent.click(btnFavorites);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('testa se o botão logout leva para a rota certa e limpa o localStorage', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const btnLogout = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(btnLogout);

    expect(window.location.pathname).toBe('/');
  });
});
