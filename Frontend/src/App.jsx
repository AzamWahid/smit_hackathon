import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import AuthForm from './pages/AuthForm.jsx'
import { CssBaseline } from '@mui/material';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import { Bounce, ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <NavBar />
      <CssBaseline />

      <Routes>
        <Route index element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/login' element={<AuthForm />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />


    </>
  )
}

export default App
