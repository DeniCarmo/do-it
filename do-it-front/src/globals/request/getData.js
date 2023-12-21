import axios from 'axios';
import getToken from './getToken';

const getData = async (setCurrentUSer) => {
  const accessToken = getToken();

  try {
    const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
    const data = await res.data;
    setCurrentUSer(data);
  } catch (err) {
    console.log(err);
  }
};

export default getData;
