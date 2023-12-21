import { useContext, useEffect, useState } from 'react';
import getToken from '../../globals/request/getToken';
import { MenuContainer, MenuItem, MenuLink } from '../../styles/MenuStyles';
import logout from '../../globals/request/logout';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [acessToken, setAccessToken] = useState(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(getToken());
  }, [currentUser]);

  useEffect(() => {
    if (!getToken()) navigate('/');
  }, []);

  const logoutUser = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <MenuContainer className="col-12">
      <MenuItem>
        <MenuLink to="/dashboard">Dashboard</MenuLink>
      </MenuItem>

      <MenuItem>
        {acessToken ? (
          <MenuLink onClick={logoutUser}>Logout</MenuLink>
        ) : (
          <MenuLink to="/">Login</MenuLink>
        )}
      </MenuItem>

      <MenuItem>
        <MenuLink to="/register">Register</MenuLink>
      </MenuItem>
    </MenuContainer>
  );
};
export default Menu;
