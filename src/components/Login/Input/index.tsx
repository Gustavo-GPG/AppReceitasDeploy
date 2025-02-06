import { InputType } from '../../../types';

function Input({ label, name, type, dataTestId, value, handleChange }: InputType) {
  return (
    <>
      <label htmlFor={ name }>{ label }</label>
      <input
        type={ type }
        name={ name }
        data-testid={ dataTestId }
        value={ value }
        onChange={ handleChange }
        className='input-field'
      />
    </>
  );
}

export default Input;
