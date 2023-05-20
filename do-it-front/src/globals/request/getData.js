import axios from 'axios';
import getToken from './getToken';

const getData = async (setCurrentUSer) => {
  const accessToken = getToken();

  try {
    const res = await axios.get('http://localhost:3030/auth/dashboard', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.data;
    setCurrentUSer(data.user);
  } catch (err) {
    console.log(err);
  }
};

export default getData;
