import { Fragment, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHome from './pages/client/home';
import Product from './pages/client/product';
import ProductDetails from './pages/client/detailProduct';
import Blog from './pages/client/blog';
import BlogDetails from './pages/client/detailBlog';
import Dashboard from './pages/admin/dashboard';
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
        </Route>
        {/* Admin */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route> 
      </Routes>
    </>
  );
};

export default App;
