import { fireEvent } from '@testing-library/dom';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWith';
import { chickenMeals } from './Mocks/mealChicken';
import { soupMeals } from './Mocks/mealSoup';
import { mealFirstLetter } from './Mocks/mealFirstLetter';
import { drinkLemon } from './Mocks/drinkLemon';
import { oneMeal } from './Mocks/oneMeal';
import App from '../App';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const ingredientSearchRadio = 'ingredient-search-radio';
const execSearchBtn = 'exec-search-btn';
const nameSearchRadio = 'name-search-radio';

describe('Cobertura de testes para o componente Home', () => {
  const mockFetch = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(chickenMeals) }) as any);
  };
  beforeEach(mockFetch);
  afterEach(vi.clearAllMocks);

  test('Verifica título da página', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const title = screen.getByText('Meals');

    expect(title).toBeInTheDocument();
  });

  test('Verifica ícone do componente Home', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const icon = screen.getByTestId('profile-top-btn');

    expect(icon).toBeInTheDocument();
  });

  test('Testa se ao clicar no ícone de lupa  o Search Bar é renderizado', async () => {
    (renderWithRouter(<App />, { route: '/meals' }));
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const radioIngrediente = await screen.findByTestId('ingredient-search-radio');

    expect(radioIngrediente).toBeInTheDocument();
  });

  test('Verifica busca de ingredientes no filtro de busca', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioIngrediente = screen.getByTestId(ingredientSearchRadio);

    fireEvent.change(inputSearch, { target: { value: 'chicken' } });
    fireEvent.click(radioIngrediente);

    const nameElement = await screen.findByText('Brown Stew Chicken');

    expect(nameElement).toBeInTheDocument();
  });
});

describe('Testes para o Radio Name', () => {
  const mockFetchSoup = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(soupMeals) }) as any);
  };

  beforeEach(mockFetchSoup);
  afterEach(vi.clearAllMocks);

  test('Verifica Leblebi Soup', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(nameSearchRadio);

    fireEvent.change(inputSearch, { target: { value: 'soup' } });
    fireEvent.click(radioName);

    const nameElement = await screen.findByText('Leblebi Soup');

    expect(nameElement).toBeInTheDocument();
  });
});

describe('Testes para o Radio First Letter', () => {
  const mockFetchFistLetter = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealFirstLetter) }) as any);
  };

  beforeEach(mockFetchFistLetter);
  afterEach(vi.clearAllMocks);

  test('Verifica se o filtro do rádio chama o endpoint corretamente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(searchInput);
    const radioSearchLetter = screen.getByTestId('first-letter-search-radio');

    fireEvent.change(inputSearch, { target: { value: 'a' } });
    fireEvent.click(radioSearchLetter);

    const nameElement = await screen.findByText('Apple Frangipan Tart');

    expect(nameElement).toBeInTheDocument();
  });
});

describe('Testes para /drinks Ingredient', () => {
  const mockFetchDrinkIngredient = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinkLemon) }) as any);
  };

  beforeEach(mockFetchDrinkIngredient);
  afterEach(vi.clearAllMocks);

  test('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(searchInput);
    const radioSearchLetter = screen.getByTestId(ingredientSearchRadio);
    const submitBtn = screen.getByTestId(execSearchBtn);

    fireEvent.change(inputSearch, { target: { value: 'lemon' } });
    fireEvent.click(radioSearchLetter);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
    });
  });
});

describe('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', () => {
  const mockFetchOnlyFood = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(oneMeal) }) as any);
  };

  beforeEach(mockFetchOnlyFood);
  afterEach(vi.clearAllMocks);

  test('Verifica se apenas uma comida é encontrada', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const iconSearch = screen.getByTestId(searchTopBtn);
    expect(iconSearch).toBeInTheDocument();

    userEvent.click(iconSearch);

    const radioName = await screen.findByTestId('name-search-radio');
    const inputSearch = await screen.findByTestId(searchInput);
    const submitBtn = await screen.findByTestId('exec-search-btn');

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(submitBtn);

    await waitFor(() => expect(window.location.pathname).toBe('/meals/52771'));
  });
});
