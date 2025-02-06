import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

test('renders Footer component', () => {
  renderWithRouter(<App />, { route: '/meals' });

  // Verifica se o componente Footer foi renderizado
  expect(screen.getByTestId('footer')).toBeInTheDocument();

  // Verifica se os botões de drinks e meals foram renderizados
  expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
});

test('navigates to /drinks when drinks button is clicked', () => {
  renderWithRouter(<App />, { route: '/meals' });

  // Simula o clique no botão de drinks
  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  drinksButton.click();

  // Verifica se a navegação para /drinks ocorreu
  expect(window.location.pathname).toBe('/drinks');
});

test('navigates to /meals when meals button is clicked', () => {
  renderWithRouter(<App />, { route: '/meals' });

  // Simula o clique no botão de meals
  const mealsButton = screen.getByTestId('meals-bottom-btn');
  mealsButton.click();

  // Verifica se a navegação para /meals ocorreu
  expect(window.location.pathname).toBe('/meals');
});
