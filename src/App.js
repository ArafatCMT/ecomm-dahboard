import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AddProduct from './Components/AddProduct'
import UpdateProduct from './Components/UpdateProduct'
import Protected from './Components/Protected';
import ProductList from './Components/ProductList';
import SearchProduct from './Components/SearchProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Protected Cmp={ProductList} />}></Route>
          <Route path='/addProduct' element={<Protected Cmp={AddProduct} />}></Route>
          <Route path='/updateProduct/:id' element={<Protected Cmp={UpdateProduct} />}></Route>
          <Route path='/search' element={<Protected Cmp={SearchProduct} />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
