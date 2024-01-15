import { useContext, useEffect, useState } from 'react';
import {
  DashboardContainer,
  DashboardItemContainer,
  DashboardTitle,
} from '../styles/DashboardStyles';
import { UserContext } from '../contexts/UserContext';
import Item from '../components/dashboard/Item';
import CreateListModal from '../components/CreateListModal';
import getData from '../globals/request/getData';
import deleteList from '../globals/request/deleteList';
import getToken from '../globals/request/getToken';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userLists, setUserLists] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, []);

  useEffect(() => {
    getData(setCurrentUser);
  }, []);

  useEffect(() => {
    if (currentUser) setUserLists(currentUser.lists);
  }, [currentUser]);

  const removeItem = (id) => {
    deleteList(id);
    getData(setCurrentUser);
  };

  return (
    <DashboardContainer className="container">
      <div className="row">
        <DashboardTitle className="col-12">
          Welcome, {currentUser ? currentUser.username : null}!
        </DashboardTitle>

        <DashboardItemContainer>
          {userLists !== null && userLists.length > 0
            ? userLists.map((list) => {
                return (
                  <Item
                    title={list.name}
                    content={list.description}
                    done={list.done}
                    id={list._id}
                    key={list._id}
                    removeItem={removeItem}
                  />
                );
              })
            : null}
          <CreateListModal />

          <Item
            title="Create a new list"
            content="Click the button bellow to create a new list."
            creation={'true'}
          />
        </DashboardItemContainer>
      </div>
    </DashboardContainer>
  );
};
export default Dashboard;
