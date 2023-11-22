import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';


const FooterContainer = styled.footer`
  background-color: #1F1F1F; 
  color: white; 
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const Link = styled.a`
  color: white; 
  text-decoration: none;

  &:hover {
    color: #cccccc; 
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const IconStyleWrapper = styled.div`
  color: white; 

  &:hover {
    color: #cccccc; 
  }
`;

const ScrollToTop = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <FooterContainer>
        <FooterNav>
          <Link href="/">Home</Link>
          <Link href="/wishList">WishList</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/contact">Contact</Link>
        </FooterNav>
        <SocialLinks>
          <IconStyleWrapper>
            <Link href="https://www.facebook.com/people/Game-Non-Stop/100066726956310/" target="_blank" rel="noopener noreferrer"><FaFacebook size="1.5em" /></Link>
          </IconStyleWrapper>
          <IconStyleWrapper>
            <Link href="https://twitter.com/game_non_stop" target="_blank" rel="noopener noreferrer"><FaTwitter size="1.5em" /></Link>
          </IconStyleWrapper>
          <IconStyleWrapper>
            <Link href="https://www.instagram.com/gamenonstopi/" target="_blank" rel="noopener noreferrer"><FaInstagram size="1.5em" /></Link>
          </IconStyleWrapper>
        </SocialLinks>
        <ScrollToTop onClick={scrollToTop}>
          <FaArrowUp size="1.5em" />
        </ScrollToTop>
        <div>Game non Stop © 2023</div>
      </FooterContainer>
  );
};

export default Footer;
