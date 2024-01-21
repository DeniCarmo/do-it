import axios from 'axios';
import getToken from './getToken';

const deleteItem = async (id, listId) => {
  const accessToken = getToken();

  const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
  const data = await res.data;

  const listIndex = data.lists.findIndex((list) => list._id === listId);

  data.lists[listIndex].items = data.lists[listIndex].items.filter((item) => item._id !== id);

  await axios.put(`http://localhost:8000/users/${accessToken}`, data);
};

export default deleteItem;
