
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageSearch from "../ImageSearch"; // Import the component


import Navbar from '../components/Navbar';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Signup from '../pages/SignUp';
import Designers from '../pages/Designers';
import Designs from '../pages/Designs';
import Login from '../pages/Login';
import AddProducts from '../pages/addProducts';
import SellerHome from '../pages/sellerHome';

function App() {

  return (
    <>
    <Router>
      <div className='p-4'>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/products' element={<Products/>} ></Route>
        <Route path='/designers' element={<Designers/>} ></Route>
        <Route path='/designs' element={<Designs/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path="/image-search" element={<ImageSearch />} />  {/* Image Search Page */}
        <Route path="/submit_product" element={<AddProducts />} />
        <Route path="/seller_home" element={<SellerHome />} /> 
        <Route path="/add_product" element={<AddProducts />} />
``
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
