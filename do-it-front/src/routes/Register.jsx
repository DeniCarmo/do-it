import { useState } from 'react';
import { FormButton, FormContainer, FormInput, FormLabel } from '../styles/FormStyles';
import { RegisterContainer, RegisterTitle } from '../styles/RegisterStyles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const formHandle = (e) => {
    const { name, value } = e.target;

    setFormData((v) => ({ ...v, [name]: value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, passwordConfirm } = formData;

    if (!username || !email || !password || !passwordConfirm) {
      alert('All fields msut be filled.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Passwords does not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3030/auth/register', formData);
      const data = await res.data;

      if (data.code === 200) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RegisterContainer className="container">
      <div className="row">
        <RegisterTitle className="col-12">Register</RegisterTitle>
        <FormContainer>
          <FormLabel>Username:</FormLabel>
          <FormInput
            type="text"
            name="username"
            onChange={(e) => formHandle(e)}
            className="form-control"
            required
          />
          <FormLabel>E-mail:</FormLabel>
          <FormInput
            type="email"
            name="email"
            onChange={(e) => formHandle(e)}
            className="form-control"
            required
          />
          <FormLabel>Password:</FormLabel>
          <FormInput
            type="password"
            name="password"
            onChange={(e) => formHandle(e)}
            className="form-control"
            required
          />
          <FormLabel>Confirm Password:</FormLabel>
          <FormInput
            type="password"
            name="passwordConfirm"
            onChange={(e) => formHandle(e)}
            className="form-control"
            required
          />
          <p>Passwords must match.</p>
          <FormButton onClick={formSubmit}>Register</FormButton>
          <br />
          OR
          <br />
          <Link to="/">Login</Link>
        </FormContainer>
      </div>
    </RegisterContainer>
  );
};
export default Register;
