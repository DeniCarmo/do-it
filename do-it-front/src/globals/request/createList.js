import axios from 'axios';
import getToken from './getToken';

const createList = async (formData) => {
  const accessToken = getToken();

  const res = await axios.post('http://localhost:3030/list/create', formData, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.data;
};

export default createList;
