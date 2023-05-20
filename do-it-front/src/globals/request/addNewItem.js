import axios from 'axios';
import getToken from './getToken';

const addNewItem = async (title, listId) => {
  const accessToken = getToken();

  const res = await axios.post(
    'http://localhost:3030/list/add-item',
    { title, listId },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = res.data;
};

export default addNewItem;
