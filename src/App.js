import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/ui/Header';
import Footer from './component/ui/Footer';
// import PageHome from './pages/client/home';
// import Product from './pages/client/product';
import Blog from './pages/client/blog';

const App = () => {
  return (
    <>
      <Header />
        {/* <PageHome/> */}
        {/* <Product/> */}
        <Blog/>
      <Footer/>
    </>
  );
};

export default App;
