import { cleanup, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from '../helpers/renderWith';
import { drinkGin } from './Mocks/drinkGin';
import { drinksFirstLatter } from './Mocks/drinksFirstLatter';
import { oneDrink } from './Mocks/oneDrink';
import App from '../App';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const execSearchBtn = 'exec-search-btn';
const nameSearchRadio = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';

describe('Testes para /drinks Name', () => {
  const mockFetchDrinkName = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinkGin) }) as any);
  };

  beforeEach(mockFetchDrinkName);
  afterEach(cleanup);

  test('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(searchInput);
    const radioSearchLetter = screen.getByTestId(nameSearchRadio);
    const submitBtn = screen.getByTestId(execSearchBtn);

    fireEvent.change(inputSearch, { target: { value: 'gin' } });
    fireEvent.click(radioSearchLetter);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
    });
  });
});

describe('Testes para /drinks Name', () => {
  const mockFetchDrinkFirstLatter = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinksFirstLatter) }) as any);
  };

  beforeEach(mockFetchDrinkFirstLatter);
  afterEach(cleanup);

  test('Na tela de bebidas, se o radio selecionado for First Latter, a busca na API é feita corretamente pela primeira letra', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const iconSearch = screen.getByTestId(searchTopBtn);

    fireEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(searchInput);
    const radioSearchLetter = screen.getByTestId(firstLetterSearchRadio);
    const submitBtn = screen.getByTestId(execSearchBtn);

    fireEvent.change(inputSearch, { target: { value: 'a' } });
    fireEvent.click(radioSearchLetter);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    });
  });
});

describe('Testes alert Drinks', () => {
  // beforeEach(() => { vi.spyOn(window, 'alert').mockImplementation(() => {}); });
  const newAlert = vi.spyOn(window, 'alert');

  test('teste window.alert', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const iconSearch = screen.getByTestId(searchTopBtn);
    fireEvent.click(iconSearch);

    const radioSearchLetter = screen.getByTestId(firstLetterSearchRadio);
    fireEvent.click(radioSearchLetter);

    const inputSearch = screen.getByTestId(searchInput);
    fireEvent.change(inputSearch, { target: { value: 'aaa' } });

    const submit = screen.getByTestId(execSearchBtn);
    fireEvent.click(submit);

    await waitFor(() => {
      expect(newAlert).toBeCalledWith('Your search must have only 1 (one) character');
    });
  });
});

describe('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', () => {
  const mockFetchOnlyDrink = () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(oneDrink) }) as any);
  };

  beforeEach(mockFetchOnlyDrink);
  afterEach(vi.clearAllMocks);

  test('Verifica se apenas uma bebida é encontrada', async () => {
    renderWithRouter(<App />, { route: '/drinks' });
    const iconSearch = screen.getByTestId(searchTopBtn);
    expect(iconSearch).toBeInTheDocument();

    userEvent.click(iconSearch);

    const radioName = await screen.findByTestId('name-search-radio');
    const inputSearch = await screen.findByTestId(searchInput);
    const submitBtn = await screen.findByTestId('exec-search-btn');

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(submitBtn);

    await waitFor(() => expect(window.location.pathname).toBe('/drinks/178319'));
  });
});
