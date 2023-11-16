import { useState } from 'react';
import Layout from "./assets/components/Layout";
import Header from './assets/components/Header'; 
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './thems';
//import GlobalStyles from './globalStyles';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
console.log(lightTheme)
  return (
    <>  
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
     {/* <GlobalStyles /> */} 
      <Router>
        <Layout>
        <Header />
          <button onClick={toggleTheme}>Change Theme</button>
        </Layout>
      </Router>
    </ThemeProvider>
    </>
  
  );
}

export default App;

