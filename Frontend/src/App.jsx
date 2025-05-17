
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageSearch from "../ImageSearch"; // Import the component


import Navbar from '../components/Navbar';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Signup from '../pages/SignUp';
import DesignHome from '../pages/DesignHome';
import Designs from '../pages/Designs';
import Login from '../pages/Login';
import AddProducts from '../pages/addProducts';
import SellerHome from '../pages/sellerHome';
import Generate_Design from '../pages/Generate_Designs';

function App() {

  return (
    <>
    <Router>
      <div className='p-4'>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/products' element={<Products/>} ></Route>
        <Route path='/designer_home' element={<DesignHome/>} ></Route>
        <Route path='/designs' element={<Designs/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path="/image-search" element={<ImageSearch />} />  {/* Image Search Page */}
        <Route path="/submit_product" element={<AddProducts />} />
        <Route path="/seller_home" element={<SellerHome />} /> 
        <Route path="/add_product" element={<AddProducts />} />
        <Route path="/generate_design" element={<Generate_Design />} />
``
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
