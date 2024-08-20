
import './App.css'
import { Footer, Header } from './components'
import AllRoutes from './routes/AllRoutes'


function App() {


  return (
    <div className='dark:bg-zinc-950 bg-base-100'>
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  )
}

export default App
