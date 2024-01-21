import {
  ListItemButtons,
  ListItemContainer,
  ListItemInput,
  ListItemTitle,
} from '../../styles/ListItemStyles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import addNewItem from '../../globals/request/addNewItem';
import { Link, useParams } from 'react-router-dom';
import updateItemStatus from '../../globals/request/updateItem';
import deleteItem from '../../globals/request/deleteItem';
import { PropTypes } from 'prop-types';

const ListItem = ({ title, done, creator, id, refreshList }) => {
  const [itemTitle, setItemTitle] = useState('');
  const { listId } = useParams();

  const inputHandle = (e) => {
    const { name, value } = e.target;

    setItemTitle((v) => ({ ...v, [name]: value }));
  };

  const addItem = async () => {
    if (!itemTitle) {
      alert('Item title must be filled.');
      return;
    }

    try {
      await addNewItem(itemTitle.title, listId);
      /*
        Updates the value with random numbers to ensure a different value 
        will be send and trigger the useEffect hook.
      */
      refreshList(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (v) => {
    try {
      await updateItemStatus(v, id, listId);
      refreshList(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  const deleteListItem = async () => {
    try {
      await deleteItem(id, listId);
      refreshList(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListItemContainer>
      {creator ? (
        <ListItemInput
          type="text"
          placeholder="Add New Item"
          name="title"
          onChange={(e) => inputHandle(e)}
        />
      ) : (
        <ListItemTitle>{title}</ListItemTitle>
      )}

      {!creator ? (
        <ListItemButtons>
          {done ? (
            <Link>
              <CheckBoxIcon onClick={() => updateItem(false)} />
            </Link>
          ) : (
            <Link>
              <CheckBoxOutlineBlankIcon onClick={() => updateItem(true)} />
            </Link>
          )}
          <Link>
            <DeleteIcon onClick={deleteListItem} />
          </Link>
        </ListItemButtons>
      ) : (
        <ListItemButtons>
          <Link onClick={addItem}>
            <AddCircleIcon />
          </Link>
        </ListItemButtons>
      )}
    </ListItemContainer>
  );
};

ListItem.propTypes = {
  title: PropTypes.string,
  done: PropTypes.bool,
  creator: PropTypes.bool,
  id: PropTypes.string,
  refreshList: PropTypes.func,
};
export default ListItem;
