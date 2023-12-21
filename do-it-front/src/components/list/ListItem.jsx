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

const ListItem = (props) => {
  const { title, done, creator, id } = props;
  const [itemTitle, setItemTitle] = useState('');
  const { listId } = useParams();

  const inputHandle = (e) => {
    const { name, value } = e.target;

    setItemTitle((v) => ({ ...v, [name]: value }));
  };

  const addItem = () => {
    if (!itemTitle) {
      alert('Item title must be filled.');
      return;
    }

    addNewItem(itemTitle, listId);
  };

  const updateItem = (v) => {
    updateItemStatus(v, id, listId);
  };

  const deleteListItem = () => {
    deleteItem(id, listId);
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

      {creator !== 'true' ? (
        <ListItemButtons>
          {done ? (
            <Link>
              <CheckBoxIcon onClick={(e) => updateItem(false)} />
            </Link>
          ) : (
            <Link>
              <CheckBoxOutlineBlankIcon onClick={(e) => updateItem(true)} />
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
  creator: PropTypes.string,
  id: PropTypes.string,
};
export default ListItem;
