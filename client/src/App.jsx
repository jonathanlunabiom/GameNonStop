import { useState } from 'react'
import './App.css'
import Layout from "./assets/components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
