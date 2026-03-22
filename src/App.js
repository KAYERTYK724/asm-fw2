import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/ui/Header';
import Footer from './component/ui/Footer';
// import PageHome from './pages/client/home';
// import Product from './pages/client/product';
// import ProductDetails from './pages/client/detailProduct';
// import Blog from './pages/client/blog';
import BlogDetails from './pages/client/detailBlog';

const App = () => {
  return (
    <>
      <Header />
        {/* <PageHome/> */}
        {/* <Product/> */}
        {/* <ProductDetails/> */}
        {/* <Blog/> */}
        <BlogDetails/>
      <Footer/>
    </>
  );
};

export default App;
