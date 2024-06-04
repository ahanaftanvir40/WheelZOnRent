
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [cars, setCars] = useState([])
  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get('http://localhost:3000/cars')
      setCars(res.data)
    }
    fetchCars()
  }, [])

  return (
    <>
      <h1>WheelzOnRent</h1>
      <h3>Total Cars {cars.length}</h3>
    </>
  )
}

export default App
