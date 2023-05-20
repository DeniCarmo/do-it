import axios from 'axios';
import getToken from './getToken';

const deleteItem = async (id, listId) => {
  const accessToken = getToken();

  const res = await axios.delete('http://localhost:3030/list/delete-item', {
    data: { id, listId },
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = res.data;
};

export default deleteItem;
