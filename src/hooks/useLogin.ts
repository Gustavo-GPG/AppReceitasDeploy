import { useState } from 'react';
import { InicialStateLoginType } from '../types';

function useLogin(initialState: InicialStateLoginType) {
  const [loginForm, setLoginForm] = useState(initialState);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return [loginForm, handleChange];
}

export default useLogin;
