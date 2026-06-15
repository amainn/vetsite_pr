import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'
import Service from './Service.jsx'
import Pharmacy from './Pharmacy.jsx'
import Profile from './Profile.jsx'

import Register from './Register.jsx'
import Auth from './Auth.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/pharmacy' element={<Pharmacy/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
