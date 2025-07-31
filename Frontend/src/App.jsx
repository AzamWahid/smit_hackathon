import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import AuthForm from './pages/AuthForm.jsx'
import { CssBaseline } from '@mui/material';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';

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

    </>
  )
}

export default App
