import { useParams } from 'react-router-dom';
import { ListBody, ListContainer, ListContent, ListTitle } from '../styles/ListStyles';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import getData from '../globals/request/getData';
import ListItem from '../components/list/ListItem';
import getToken from '../globals/request/getToken';

const List = () => {
  const { listId } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, []);

  useEffect(() => {
    getData(setCurrentUser);
    return;
  }, [currentUser]);

  useEffect(() => {
    const setListInfo = async () => {
      let listItemArr = null;
      listItemArr = currentUser.lists.filter((list) => list._id === listId);
      setListData(listItemArr[0]);
    };

    if (currentUser) setListInfo();
    return;
  }, [currentUser]);

  return (
    <ListContainer>
      <ListBody>
        <ListTitle>{listData ? listData.name : 'Loading'}</ListTitle>

        <ListContent>
          {listData !== null && listData.items.length
            ? listData.items.map((item) => {
                return (
                  <ListItem title={item.title} done={item.done} id={item._id} key={item._id} />
                );
              })
            : null}
          <ListItem title="Add New Item" creator="true" />
        </ListContent>
      </ListBody>
    </ListContainer>
  );
};
export default List;
