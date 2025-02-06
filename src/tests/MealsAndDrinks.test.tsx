import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from './Mocks/testData';
import testDataDrinks from './Mocks/testDataDrinks';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Teste da tela de receitas', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: async () => testData,
      } as Response,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Teste se os cards são renderizdos corretamente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    await waitFor(() => {
      const recipeCard = screen.getByTestId(/^0-recipe-card$/);
      expect(recipeCard).toBeInTheDocument();
    });
  });
  it('Teste os filtros de "meals" por categoria', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    await waitFor(async () => {
      const recipeCardName = screen.getByTestId(/^0-card-name$/);
      const buttonFilter = screen.getByTestId('Beef-category-filter');
      await userEvent.click(buttonFilter);
      const recipeCard = await recipeCardName;
      expect(recipeCard).toBeInTheDocument();
    });
  });
  it('Teste do filtro de categoria "All"', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    await waitFor(async () => {
      const recipeCardName = screen.getByTestId(/^0-card-name$/);
      const buttonFilter = screen.getByTestId('All-category-filter');
      await userEvent.click(buttonFilter);
      const recipeCard = await recipeCardName;
      expect(recipeCard).toBeInTheDocument();
    });
  });
});
describe('Teste da tela de receitas', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: async () => testDataDrinks,
      } as Response,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Teste se a tela de "Drinks" é renderizada', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(() => {
      const recipeCard = screen.getByTestId(/^0-recipe-card$/);
      expect(recipeCard).toBeInTheDocument();
    });
  });
  it('Teste os filtros de "drinks" por categoria', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(async () => {
      const recipeCardName = screen.getByTestId(/^0-card-name$/);
      const buttonFilter = screen.getAllByTestId('Cocktail-category-filter');
      await userEvent.click(buttonFilter[0]);
      const recipeCard = await recipeCardName;
      expect(recipeCard).toBeInTheDocument();
    });
  });
  it('Teste do filtro de categoria "All"', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    await waitFor(async () => {
      const recipeCardName = screen.getByTestId(/^0-card-name$/);
      const buttonFilter = screen.getByTestId(/^All-category-filter$/);
      await userEvent.click(buttonFilter);
      const recipeCard = await recipeCardName;
      expect(recipeCard).toBeInTheDocument();
    });
  });
});
