import { FormLink, FormText, LoginContainer, LoginTitle } from '../styles/LoginStyles';
import { FormButton, FormContainer, FormInput, FormLabel } from '../styles/FormStyles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getToken from '../globals/request/getToken';
import { toast } from 'react-toastify';

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
    let validateLogin = false;
    let userId = null;
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast('One or more fields are missing.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8000/users');
      const data = await res.data;

      if (data && data.length) {
        data.forEach((user) => {
          /* This step is usually done in the back end with encryption on the password for safety */
          if (user.email === formData.email && user.password === formData.password) {
            validateLogin = true;
            userId = user._id;
          }
        });
      }

      if (validateLogin) {
        /* Usually set in the back end with generated token and expiration date, this one is set to expire in one hour */
        setCookie(userId, 1);
        navigate('/dashboard');
      } else {
        toast('User or password incorrect.');
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
