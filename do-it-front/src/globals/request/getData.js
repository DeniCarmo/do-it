import axios from 'axios';
import getToken from './getToken';

const getData = async () => {
  const accessToken = getToken();

  try {
    const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default getData;
