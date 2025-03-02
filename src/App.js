import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AddProduct from './Components/AddProduct'
import UpdateProduct from './Components/UpdateProduct'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <h1>E-comm Project</h1>
        <Routes>
          <Route path='/addProduct' element={<AddProduct />}></Route>
          <Route path='/updateProduct' element={<UpdateProduct />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
