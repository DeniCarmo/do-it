import axios from 'axios';
import getToken from './getToken';

const addNewItem = async (title, listId) => {
  const accessToken = getToken();

  const res = await axios.post(`http://localhost:8000/users/${accessToken}`);
  const data = await res.data;

  const newListArray = data.lists.filter((list) => list._id === listId);

  data.lists.splice(0, data.lists.length, ...newListArray);

  await axios.put(`http://localhost:8000/users/${accessToken}`, data);
};

export default addNewItem;
