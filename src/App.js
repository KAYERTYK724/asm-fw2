import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHome from './pages/client/home';
import Product from './pages/client/product';
import ProductDetails from './pages/client/detailProduct';
import Blog from './pages/client/blog';
import BlogDetails from './pages/client/detailBlog';
import Dashboard from './pages/admin/dashboard';
import BlogListAdmin from './pages/admin/blog';
import AddBlog from './pages/admin/blog/add';
import BlogDetail from './pages/admin/blog/view';
import ClientLayout from './layout/client/client-layout';
import AdminLayout from './layout/admin/admin-layout';
import CategoryListAdmin from './pages/admin/category';
import AddCategory from './pages/admin/category/add';
import UserListAdmin from './pages/admin/user';
import ViewUser from './pages/admin/user/viewUser';

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
          <Route path="category" element={<CategoryListAdmin />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path='blogAdmin' element={<BlogListAdmin/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='viewBlog' element={<BlogDetail/>}/>
          <Route path="user" element={<UserListAdmin />} />
          <Route path="viewUser" element={<ViewUser />} />
        </Route> 
      </Routes>
    </>
  );
};

export default App;