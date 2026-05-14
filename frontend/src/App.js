import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';
import NotFound from './components/layout/NotFound';
import { userApi } from './redux/api/userApi';

function App() {
  const dispatch = useDispatch();
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  useEffect(() => {
    // Check if user is logged in on app load
    dispatch(userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }));
  }, [dispatch]);
  return (
    <Router>
      <div className='App'>
        <Toaster position='top-center' />
        <Header />

        <div className='container'>
          <Routes>
            {userRoutes}
            {adminRoutes}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
