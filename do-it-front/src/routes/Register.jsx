import { useState } from 'react';
import { FormButton, FormContainer, FormInput, FormLabel } from '../styles/FormStyles';
import { RegisterContainer, RegisterTitle } from '../styles/RegisterStyles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  _id: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const getAllUsers = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/users`);
    let data = await res.data;
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const userExists = async (id, email) => {
  let users = await getAllUsers();
  let emailExits = false;
  let idExists = false;

  if (users && users.length > 0) {
    users.forEach((user) => {
      if (user._id === id && user.email === email) {
        emailExits = true;
        idExists = true;
      }

      if (user._id === id) {
        idExists = true;
      }

      if (user.email === email) {
        emailExits = true;
      }
    });
  }

  if (emailExits && idExists) return 'Email and id already registered';

  if (idExists) return 'ID already registered';

  if (emailExits) return 'Email already registered';

  if (!emailExits && !idExists) return 'ok';
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

    formData._id = crypto.randomUUID();
    formData.lists = [];

    if ((await userExists(formData._id, formData.email)) === 'ok') {
      try {
        const res = await axios.post('http://localhost:8000/users', formData);

        navigate('/');
        toast('Registration successful');
      } catch (err) {
        console.log(err);
      }
    } else {
      toast(await userExists(formData._id, formData.email));
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
