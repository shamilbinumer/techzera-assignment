import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import EmpDetails from './components/pages/EmpDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/employee-details/:id' Component={EmpDetails} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
