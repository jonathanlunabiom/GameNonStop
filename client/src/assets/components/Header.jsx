//import Navigation from "./Navigation.jsx";
import { HeaderContainer, Navigation, Logo, SocialMediaButton, StyledNavLink } from './Header.Styles.js';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>GameNonStop</Logo>
      <Navigation>
        <StyledNavLink to="/">Home</StyledNavLink> 
        <StyledNavLink to="/WishList">Wish List</StyledNavLink> 
        <StyledNavLink to="/cart">My Cart</StyledNavLink>
      </Navigation>
      <div>
        <SocialMediaButton href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <FaFacebookF />
        </SocialMediaButton>
        <SocialMediaButton href="https://www.twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter />
        </SocialMediaButton>
        <SocialMediaButton href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram />
        </SocialMediaButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;

