import axios from 'axios';
import getToken from './getToken';

const deleteList = async (id) => {
  const accessToken = getToken();
  try {
    const res = await axios.get(`http://localhost:8000/users/${accessToken}`);
    const data = await res.data;

    const newListArray = data.lists.filter((list) => list._id !== id);

    data.lists.splice(0, data.lists.length, ...newListArray);

    await axios.put(`http://localhost:8000/users/${accessToken}`, data);
  } catch (err) {
    console.log(err);
  }
};

export default deleteList;
