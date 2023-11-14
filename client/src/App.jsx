import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GameList from './assets/components/videogames'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id ="card-Example"> 
        {GameList()}
        {GameList()}
        {GameList()}
        {GameList()}
        {GameList()}
        {GameList()}
      </div>
    </>
  )
}

export default App
