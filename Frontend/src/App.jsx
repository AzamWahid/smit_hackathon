import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import AuthForm from './pages/AuthForm.jsx'
import { CssBaseline } from '@mui/material';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import UploadReport from './pages/UploadReports.jsx';
import Report from './pages/Report.jsx';
import AddVitals from './pages/AddVitals.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

function App() {

  return (
    <>
      <NavBar />
      <CssBaseline />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<AuthForm />} />

        {/* Protected routes */}
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-report"
          element={
            <PrivateRoute>
              <UploadReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/addVitals"
          element={
            <PrivateRoute>
              <AddVitals />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
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
