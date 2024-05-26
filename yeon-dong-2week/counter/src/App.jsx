import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    setNumber(number + 1);
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }
  return (
    <>
      <h2>{number}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </>
  )
}

export default App
