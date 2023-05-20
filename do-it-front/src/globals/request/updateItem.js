import axios from 'axios';
import getToken from './getToken';

const updateItemStatus = async (done, id, listId) => {
  const accessToken = getToken();

  const res = await axios.put(
    'http://localhost:3030/list/update-item',
    { done, id, listId },
    { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = res.data;
};

export default updateItemStatus;
