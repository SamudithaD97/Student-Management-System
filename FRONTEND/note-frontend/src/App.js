import Navbar from './components/Navbar';
import Notes from './components/Notes';
import Login from './components/Login';
import Admin from './components/Admin';
import  './App.css';
import Register from './components/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default function App() {
 
  return (

    <><Navbar/>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Notes/>}></Route>
         <Route path="/Login" element={<Login/>} /> 
         <Route path="/Register" element={<Register/>} />
         <Route path="/Admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>

      
    </>
  )
}
