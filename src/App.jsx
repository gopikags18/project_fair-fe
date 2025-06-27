
import './App.css'
import '../bootstrap.min.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { useContext } from 'react'
import  { loginContext } from '../context/LoginContext'


function App() {
// route guarding using navigate and context api
const {isloggedIn, setLoggedIn} = useContext(loginContext)

  return (
    <>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/dashboard' element={isloggedIn?<Dashboard/>:<Navigate to={'/login'}/>}/>        
{/* navigating to login page if the user does not exist */}
<Route path='/projects' element={isloggedIn?<Projects/>:<Navigate to={'/login'}/>}/>
<Route path='/login' element={<Auth/>}/>
<Route path='/register' element={<Auth insideRegister={true}/>}/>
</Routes>
<Footer/>

      </>
  )
}

export default App
