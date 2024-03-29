import {
  ItemButton,
  ItemContainer,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from '../../styles/dashboard/ItemStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useContext } from 'react';
import { CreateListModalContext } from '../../contexts/CreateListModalContext';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Item = (props) => {
  const { title, content, done, creation, id, removeItem } = props;
  const { setModalOpen } = useContext(CreateListModalContext);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(1);
  };

  const navigateToList = () => {
    navigate(`/list/${id}`);
  };

  return (
    <ItemContainer>
      <ItemHeader>{title ? title : 'Loading title'}</ItemHeader>

      <ItemContent>{content ? content : ''}</ItemContent>

      <ItemFooter>
        {!creation ? (
          <>
            <ItemButton onClick={navigateToList}>
              <FileOpenIcon />
              Open
            </ItemButton>

            <ItemButton onClick={() => removeItem(id)}>
              <DeleteIcon />
              Delete
            </ItemButton>
          </>
        ) : (
          <ItemButton onClick={openModal}>
            <AddCircleIcon />
            New
          </ItemButton>
        )}
      </ItemFooter>
    </ItemContainer>
  );
};

Item.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  done: PropTypes.bool,
  creation: PropTypes.bool,
  id: PropTypes.string,
  removeItem: PropTypes.func,
};

export default Item;
