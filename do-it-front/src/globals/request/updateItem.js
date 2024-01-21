import axios from 'axios';
import getToken from './getToken';

const updateItemStatus = async (done, id, listId) => {
  const accessToken = getToken();

  const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
  const data = await res.data;

  data.lists.forEach((list) => {
    if (list._id === listId) {
      list.items.forEach((item) => {
        if (item._id === id) {
          item.done = done;
        }
      });
    }
  });

  await axios.put(`http://localhost:8000/users/${accessToken}`, data);
};

export default updateItemStatus;
