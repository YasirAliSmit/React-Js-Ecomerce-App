import './App.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import Home from './Components/Home';
import PgFof from './Components/PgFof';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Userprofile from './Components/Userprofile';
import Cart from './Components/Cart';
import {FaBeer} from 'react-icons/fa';
import Test from './Components/Test'
import Addproduct from './Components/Addporduct'
import Allproduct from './Components/Some-product-components/Allproduct';
import SpacificProductPage from './Components/Some-product-components/Spacificproductpage';
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/navbar' element={<Navbar/>}/>
  <Route path='/userprofile' element={<Userprofile/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/addporduct' element={<Addproduct/>}/>
  <Route path="/product-types/mobiles" element={<Allproduct type={'Mobile'}/>}/>
  <Route path="/product-types/cameras" element={<Allproduct type={'Camera'}/>}/>
  <Route path="/product-types/tablets" element={<Allproduct type={'Tablet'}/>}/>
  <Route path="/product-types/leds" element={<Allproduct type={'Led'}/>}/>
  <Route path="/product/:type/:id" element={<SpacificProductPage/>}/>
  <Route path='*' element={<PgFof/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
