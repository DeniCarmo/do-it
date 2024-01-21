import { useNavigate, useParams } from 'react-router-dom';
import {
  ListBody,
  ListBottom,
  ListContainer,
  ListContent,
  ListLink,
  ListTitle,
} from '../styles/ListStyles';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import getData from '../globals/request/getData';
import ListItem from '../components/list/ListItem';
import getToken from '../globals/request/getToken';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ItemButton } from '../styles/dashboard/ItemStyles';
import deleteList from '../globals/request/deleteList';

const List = () => {
  const { listId } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [listData, setListData] = useState(null);
  const [refresh, setRefresh] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, []);

  useEffect(() => {
    getData().then((data) => {
      setCurrentUser(data);
    });
  }, [refresh, setCurrentUser]);

  useEffect(() => {
    const setListInfo = () => {
      let listItemArr = null;
      listItemArr = currentUser.lists.filter((list) => list._id === listId);
      setListData(listItemArr[0]);
    };

    if (currentUser) setListInfo();
  }, [currentUser]);

  const finishList = async () => {
    try {
      await deleteList(listId);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ListContainer>
      <ListBody>
        <ListTitle>
          <ListLink to={'/dashboard'}>
            <ArrowBackIcon />
          </ListLink>
          {listData ? listData.name : 'Loading'}
        </ListTitle>

        <ListContent>
          {listData !== null && listData.items && listData.items.length
            ? listData.items.map((item) => {
                return (
                  <ListItem
                    title={item.title}
                    done={item.done}
                    id={item._id}
                    key={item._id}
                    refreshList={setRefresh}
                  />
                );
              })
            : null}
        </ListContent>

        <ListItem title="Add New Item" creator refreshList={setRefresh} />

        <ListBottom onClick={finishList}>
          <ItemButton>
            <AssignmentTurnedInIcon />
            Finish
          </ItemButton>
        </ListBottom>
      </ListBody>
    </ListContainer>
  );
};
export default List;
