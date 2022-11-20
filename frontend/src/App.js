import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Container } from 'react-bootstrap';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import ReviewEditPage from './pages/ReviewEditPage';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
       <Container>
       <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/shipping" element={<ShippingPage/>} />
         <Route path="/payment" element={<PaymentPage/>} />
         <Route path="/profile" element={<ProfilePage/>}/>
         <Route path="/placeorder" element={<PlaceOrderPage/>}/>
         <Route path="/order/:id" element={<OrderPage/>}/>
         <Route path="/product/:id" element={<ProductPage/>} />
         <Route path="/cart">
           <Route index element={<CartPage/>}/>
           <Route path=":id" element={<CartPage/>}/>
         </Route>
         <Route path="/admin/userList" element={<UserListPage/>}/>
         <Route path="/admin/userEdit/:id" element={<UserEditPage/>}/>
         <Route path="/admin/productList" element={<ProductListPage/>}/>
         <Route path="/admin/orderList" element={<OrderListPage/>}/>
         <Route path="/admin/productEdit/:id" element={<ProductEditPage/>}/>
         <Route path="/reviewEdit/:id" element={<ReviewEditPage/>}/>
       </Routes>
       </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
