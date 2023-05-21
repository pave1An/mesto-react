import Form from './Form';
import useFormWithValidation from '../utils/useFormWithValidation';

function Login({ onLogin }) {
  
  const { values, errors, handleChange, isValid } = useFormWithValidation();
  
  function handleSubmit(e) {
    const { email, password } = values;
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <Form
      title='Вход'
      buttonText='Войти'
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <fieldset className='form-section__fieldset'>
        <input 
          onChange={handleChange} 
          name='email' 
          className='form-section__input' 
          type='email' 
          placeholder='Email' 
          required='required' 
        />
        <span className='form-section__error'>{errors.email}</span>
        <input 
          onChange={handleChange} 
          name='password' 
          className='form-section__input' 
          type='password' 
          placeholder='Пароль' 
          minLength='3' 
          required='required'
        />
        <span className='form-section__error'>{errors.password}</span>
      </fieldset>
    </Form>
  );
}

export default Login;