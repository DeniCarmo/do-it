import { HeaderContainer, HeaderNav } from '../styles/HeaderStyles';
import Menu from './Header/Menu';

const Header = (props) => {
  return (
    <HeaderContainer>
      <HeaderNav className="container">
        <div className="row">
          <Menu />
        </div>
      </HeaderNav>
    </HeaderContainer>
  );
};
export default Header;
