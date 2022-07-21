import axios from 'axios';
import { useEffect, useState } from 'react';

const SignUpPage = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { value, id } = e.target;
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'repeat-password') {
      setConfirmPassword(value);
    }
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'username') {
      setUser(value);
    }
  };

  const onClick = async (event) => {
    event.preventDefault();
    const body = {
      username: user,
      email,
      password,
    };
    setApiProgress(true);
    try {
      await axios.post('/api/1.0/users', body);
      setSignUpSuccess(true);
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
    };
  }
  useEffect(() => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [confirmPassword, confirmPassword.length, password, password.length]);

  return (
    <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1'>
      {!signUpSuccess && (
        <form className='card mt-5' data-testid='form-sign-up'>
          <div className='card-header'>
            <h1 className='text-center'>Sign Up</h1>
          </div>
          <div className='card-body'>
            <div className='mb-3'>
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                className='form-control'
                id='username'
                onChange={onChange}
              />
              <span>{errors?.username}</span>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor='email'>
                E-mail
              </label>
              <input className='form-control' id='email' onChange={onChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <input
                className='form-control'
                id='password'
                type={'password'}
                onChange={onChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor='repeat-password'>
                Repeat Password
              </label>
              <input
                className='form-control'
                type='password'
                id='repeat-password'
                onChange={onChange}
              />
            </div>
          </div>
          <div className='text-center'>
            <div className='card-footer'>
              <button
                className='btn btn-primary'
                disabled={disabled || apiProgress}
                type='submit'
                onClick={onClick}
              >
                {apiProgress && (
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <div className='alert alert-success mt-3'>
          Please check your email to activate the account
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
