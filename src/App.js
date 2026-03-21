import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/ui/Header';
import Footer from './component/ui/Footer';
// import PageHome from './pages/client/home';
import Product from './pages/client/product';

const App = () => {
  return (
    <>
      <Header />
        {/* <PageHome/> */}
        <Product/>
      <Footer/>
    </>
  );
};

export default App;
