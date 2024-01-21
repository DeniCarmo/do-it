import axios from 'axios';
import getToken from './getToken';

const addNewItem = async (title, listId) => {
  const accessToken = getToken();
  const newItem = {
    _id: crypto.randomUUID(),
    title,
    done: false,
  };

  const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
  const data = await res.data;

  const listIndex = data.lists.findIndex((list) => list._id === listId);

  data.lists[listIndex].items.push(newItem);

  await axios.put(`http://localhost:8000/users/${accessToken}`, data);
};

export default addNewItem;
