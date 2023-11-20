
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './thems';
import GlobalStyles from './globalStyles';
import AppRoutes from './Routes';
import { ThemeProvider } from './assets/components/ThemeContext';
import { useTheme } from './assets/components/ThemeContext';

function App() {
  return (
    <ThemeProvider> 
      <StyledThemeProviderWrapper />
    </ThemeProvider>
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
