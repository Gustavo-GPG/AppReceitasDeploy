import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import { isValidForm, handleSubmit } from '../../helpers/loginFunctions';
import { INITIAL_STATE_LOGIN } from './InitialState';
import { ChefHat, Mail, Lock } from 'lucide-react';
import "./Login.css"

function Login() {
  const [loginForm, setLoginForm] = useState(INITIAL_STATE_LOGIN);
  const navigate = useNavigate();

  const { email, password } = loginForm;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitAndNavigate = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(email)(event);
    navigate('/meals');
  };

  return (
    <div className="container">
      <div className="login-card">
        <div className="header">
          <div className="icon-container">
            <ChefHat />
          </div>
          <h1>Bem-vindo(a) de volta, Chef!</h1>
          <p>Entre para acessar suas receitas favoritas</p>
        </div>

        <form onSubmit={ submitAndNavigate } className='form'>
          <div className="input-group">
            <div className="input-icon">
              <Mail />
            </div>
            <Input
              label="Email"
              name="email"
              type="email"
              dataTestId="email-input"
              value={ email }
              handleChange={ handleChange }
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock />
            </div>
            <Input
              label="Senha"
              name="password"
              type="password"
              dataTestId="password-input"
              value={ password }
              handleChange={ handleChange }
            />
          </div>
          
          <Button
            clicar="Entrar"
            dataTestId="login-submit-btn"
            disabled={ isValidForm(email, password) }
            handleSubmit={ handleSubmit(email) }
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
