import { useState } from 'react';
import { FormButton, FormContainer, FormInput, FormLabel } from '../styles/FormStyles';
import { LoginContainer, LoginTitle } from '../styles/LoginStyles';
import axios from 'axios';

const initialState = {
  email: '',
  password: '',
  confirmPass: '',
};

const LostPassword = () => {
  const [formData, setFormData] = useState(initialState);

  const formHandle = (e) => {
    const { name, value } = e.target;

    setFormData((v) => ({ ...v, [name]: value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPass } = formData;

    if (!email || !password || !confirmPass) {
      alert('All fields must be filled!');
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords doesn't match.");
      return;
    }

    try {
      const res = await axios.put('http://localhost:3030/auth/reset-password', formData);
      const data = await res.data;

      console.log(data);

      setFormData(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginContainer className="container">
      <div className="row">
        <LoginTitle className="col-12">Recover Password</LoginTitle>

        <FormContainer className="col-12">
          <FormLabel>Enter your e-mail</FormLabel>

          <FormInput
            type="text"
            name="email"
            className="form-control"
            onChange={(e) => formHandle(e)}
            required
          />

          <FormLabel>New Password</FormLabel>

          <FormInput
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => formHandle(e)}
            required
          />

          <FormLabel>Confirm New Password</FormLabel>

          <FormInput
            type="password"
            name="confirmPass"
            className="form-control"
            onChange={(e) => formHandle(e)}
            required
          />

          <FormButton onClick={formSubmit}>Submit</FormButton>
        </FormContainer>
      </div>
    </LoginContainer>
  );
};
export default LostPassword;
