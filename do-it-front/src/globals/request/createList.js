import axios from 'axios';
import getToken from './getToken';

const createList = async (formData) => {
  const accessToken = getToken();
  const user = await axios.get(`http://localhost:8000/users?_id=${accessToken}`);

  user.data[0].lists.push(formData);

  await axios.put(`http://localhost:8000/users/${accessToken}`, user.data[0]);
};

export default createList;
