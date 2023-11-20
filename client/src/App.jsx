import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './thems';
import GlobalStyles from './globalStyles';
import AppRoutes from './Routes';
import { ThemeProvider } from './assets/components/ThemeContext';
import { useTheme } from './assets/components/ThemeContext';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { CartProvider } from './assets/utils/CartContext';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <CartProvider>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <StyledThemeProviderWrapper />
        </ThemeProvider>
      </ApolloProvider>
    </CartProvider>
  );
}

export default App;

function StyledThemeProviderWrapper() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppRoutes />
    </StyledThemeProvider>
  );
}
