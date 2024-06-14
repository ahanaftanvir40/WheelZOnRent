
import './App.css'
import { Header } from './components'
import AllRoutes from './routes/AllRoutes'


function App() {


  return (
    <div className='bg-gradient-to-br from-blue-900 via-purple-800 to-red-800'>
      <Header />
      <AllRoutes />
    </div>
  )
}

export default App
