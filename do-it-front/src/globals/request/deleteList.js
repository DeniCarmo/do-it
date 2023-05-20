import axios from 'axios';
import getToken from './getToken';

const deleteList = async (id) => {
  const accessToken = getToken();
  try {
    await axios.delete('http://localhost:3030/list/delete', {
      data: { id },
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err) {
    console.log(err);
  }
};

export default deleteList;
