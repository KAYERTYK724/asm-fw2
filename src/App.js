import { Fragment } from 'react';
import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHome from './pages/client/home';
import Product from './pages/client/product';
import ProductDetails from './pages/client/detailProduct';
import Blog from './pages/client/blog';
import BlogDetails from './pages/client/detailBlog';
import Contact from './pages/client/contact/Contact';
import Checkout from './pages/client/checkout/Checkout';
import Cart from './pages/client/cart/Cart';
import About from './pages/client/about/about';
import Login  from './pages/client/auth/Login';
import Register from './pages/client/auth/Register';
import Dashboard from './pages/admin/dashboard';
import BlogListAdmin from './pages/admin/blog';
import AddBlog from './pages/admin/blog/add';
import OrderList from './pages/admin/orders/OrderList';
import OrderDetail from './pages/admin/orders/OrderDetail';
import BlogDetail from './pages/admin/blog/view';
import ClientLayout from './layout/client/client-layout';
import AdminLayout from './layout/admin/admin-layout';

const App = () => {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path='/' element={<ClientLayout/>}>
          <Route index element={<PageHome/>}/>
          <Route path='shop' element={<Product/>}/>
          <Route path='detailShop' element={<ProductDetails/>}/>
          <Route path='blog' element={<Blog/>}/>
          <Route path='detailBlog' element={<BlogDetails/>}/>
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> 
          <Route path="/about" element={<About />} />
        </Route>
        {/* Admin */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='blogAdmin' element={<BlogListAdmin/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='viewBlog' element={<BlogDetail/>}/>
         
          <Route path='orders' element={<OrderList/>}/>
          <Route path='orders/:id' element={<OrderDetail/>}/>
        </Route> 
      </Routes>
    </>
  );
};

export default App;
