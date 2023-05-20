import axios from 'axios';
import getToken from './getToken';

const logout = async () => {
  const accessToken = getToken();

  try {
    if (accessToken) {
      const res = await axios.get('http://localhost:3030/auth/logout', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.data;

      localStorage.removeItem('doitToken');
      localStorage.removeItem('doitTokenExp');
    } else {
      console.log('Invalid access token.');
    }
  } catch (err) {
    console.log(err);
  }
};

export default logout;
