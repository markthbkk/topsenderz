import { useState } from 'react'
import Home from './components/Home.jsx'
import { GlobalProvider } from "./context/GlobalState";

// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalProvider>
      <div className="App">
      
        <Home />
      </div>
    </GlobalProvider>)
    
    
}

export default App
