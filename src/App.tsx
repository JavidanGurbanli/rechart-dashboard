import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicDashboard from './components/dynamic-dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DynamicDashboard/>
    </>
  )
}

export default App
