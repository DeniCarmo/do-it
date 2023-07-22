import { FormLink, FormText, LoginContainer, LoginTitle } from '../styles/LoginStyles';
import { FormButton, FormContainer, FormInput, FormLabel } from '../styles/FormStyles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getToken from '../globals/request/getToken';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, []);

  const formHandle = (e) => {
    const { name, value } = e.target;

    setFormData((v) => ({ ...v, [name]: value }));
  };

  const setCookie = (val, expiration) => {
    const exDate = new Date();
    exDate.setHours(exDate.getHours() + expiration);
    localStorage.setItem('doitToken', val);
    localStorage.setItem('doitTokenExp', exDate);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert('One or more fields are missing.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3030/auth/login', formData, {
        withCredentials: true,
      });
      const data = await res.data;

      if (data.code === 200) {
        setCookie(data.token, data.expiration);
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LoginContainer className="container">
      <div className="row">
        <LoginTitle className="col-12">Login</LoginTitle>
        <FormContainer className="col-12">
          <FormLabel>E-mail:</FormLabel>
          <FormInput
            type="text"
            name="email"
            className="form-control"
            onChange={(e) => formHandle(e)}
            required
          />

          <FormLabel>Password:</FormLabel>
          <FormInput
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => formHandle(e)}
            required
          />

          <FormButton onClick={formSubmit}>Login</FormButton>

          <FormText>forgot your password?</FormText>
          <FormText>
            click <FormLink to={'/lost-password'}>here</FormLink> to recover it.
          </FormText>
        </FormContainer>
      </div>
    </LoginContainer>
  );
};
export default Login;
