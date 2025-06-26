import './App.css'
// import Home from './Pages/Home'
import About from'./Pages/About'
import Contact from'./Pages/Contact'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Add from'./Pages/Add'
import Error from './Pages/Error'
import EditUser from './Pages/EditUser'
import { Home1 } from './Pages/Home1'


//  run this file firstofall we can start json server in git bash terminal command is npx json-server User.json
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home1/>}/>   
         <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/*" element={<Error/>}/>
      <Route path="add" element={<Add/>}/>
      <Route path="/EditUser/:id" element={<EditUser/>}/>
      
    </Routes>
    </BrowserRouter> 

    </>
  )
}

export default App
