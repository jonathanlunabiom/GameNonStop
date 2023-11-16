// App.jsx
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './thems';
import GlobalStyles from './globalStyles';
import Routes from './Routes';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <button onClick={toggleTheme}>Change Theme</button>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
