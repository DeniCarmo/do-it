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
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { title, content, done, creation, id, removeItem } = props;
  const { setModalOpen } = useContext(CreateListModalContext);

  const openModal = () => {
    setModalOpen(1);
  };

  return (
    <ItemContainer>
      <ItemHeader>{title ? title : 'Loading title'}</ItemHeader>

      <ItemContent>{content ? content : ''}</ItemContent>

      <ItemFooter>
        {creation !== 'true' ? (
          <>
            <Link to={`/list/${id}`}>
              <FileOpenIcon />
            </Link>

            <ItemButton onClick={() => removeItem(id)}>
              <DeleteIcon />
            </ItemButton>
          </>
        ) : (
          <ItemButton onClick={openModal}>
            <AddCircleIcon />
          </ItemButton>
        )}
      </ItemFooter>
    </ItemContainer>
  );
};
export default Item;
