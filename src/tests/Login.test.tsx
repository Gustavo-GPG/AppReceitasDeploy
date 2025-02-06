import { screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const dataTestIdEmail = 'email-input';
const dataTestIdPassword = 'password-input';
const dataTestIdButton = 'login-submit-btn';

describe('Cobertura de testes para o componente Login', () => {
  test('Verifica se o input de email está renderizado na tela', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    expect(inputEmail).toBeInTheDocument();
  });

  test('Verifica se o input de senha está renderizado na tela', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId(dataTestIdPassword);
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o botão de login está renderizado na tela', () => {
    renderWithRouter(<App />);
    const buttonLogin = screen.getByTestId(dataTestIdButton);
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Verifica se o botão de login está desabilitado', () => {
    renderWithRouter(<App />);
    const buttonLogin = screen.getByTestId(dataTestIdButton);
    expect(buttonLogin).toBeDisabled();
  });

  test('Verifica se ao digitar um email válido e uma senha com mais de 6 caracteres o botão de login é habilitado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputPassword = screen.getByTestId(dataTestIdPassword);
    const buttonLogin = screen.getByTestId(dataTestIdButton);

    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(buttonLogin).toBeEnabled();
  });

  test('Verifica se ao clicar no botão "Entrar" o usuário é redirecionado para a tela principal de receitas de comidas', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, { history });

    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputPassword = screen.getByTestId(dataTestIdPassword);
    const buttonLogin = screen.getByTestId(dataTestIdButton);

    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    fireEvent.click(buttonLogin);

    const foodRecipes = await screen.findByText('Meals');
    expect(foodRecipes).toBeInTheDocument();
  });
});
