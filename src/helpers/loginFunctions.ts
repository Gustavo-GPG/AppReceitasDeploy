const isValidEmail = (emailParam: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(emailParam);
};

export const isValidForm = (email: string, password: string) => {
  return isValidEmail(email) && password.length > 6;
};

export const handleSubmit = (email: string) => (event: React.
  FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const user = { email };
  localStorage.setItem('user', JSON.stringify(user));
};
