import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-image: url('https://media.rawg.io/media/games/062/06285b425e61623530c5430f20e5d222.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: ${({ theme }) => theme.text}; /* Usar el color de texto del tema */
  border: solid 1px black;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const SocialMediaButton = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc; 
  }
`;


export const StyledNavLink = styled(NavLink)`
  color: white; 
  text-decoration: none;
  margin-right: 10px; 
  font-weight: bold;

  &.active {
    border-bottom: 2px solid white; 
  }

  &:hover {
    color: #ccc; 
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
`;
