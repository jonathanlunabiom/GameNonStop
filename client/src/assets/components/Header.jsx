import React, { useState } from 'react';
import { HeaderContainer, Navigation, Logo, SocialMediaButton, StyledNavLink, IconButton, LoginButton } from './Header.Styles.js';
import { FaFacebookF, FaTwitter, FaInstagram, FaRegSun, FaRegMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext.jsx'; 
import LoginFormModal from './LogIn.jsx'; 

const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  

  return ( 
    <HeaderContainer>
      <Logo>GameNonStop</Logo>
      <Navigation>
        <StyledNavLink to="/">Home</StyledNavLink> 
        <StyledNavLink to="/WishList">Wish List</StyledNavLink> 
        <StyledNavLink to="/cart">My Cart</StyledNavLink>
         <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
      <LoginFormModal show={showLoginModal} onClose={handleCloseModal} />
      </Navigation>
      <IconButton onClick={toggleTheme}>
      {theme === 'light' ? <FaRegMoon size={24} /> : <FaRegSun size={24} />} 
      </IconButton>
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

