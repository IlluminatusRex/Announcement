import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { loadAdsRequest } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import NavBar from './components/layout/NavBar/NavBar';
import Register from './components/features/Register/Register';
import Login from './components/features/Login/Login';
import Logout from './components/features/Logout/Logout';
import Homepage from './components/pages/Homepage/Homepage';
import Ad from './components/pages/Ad/Ad';
import AddAd from './components/pages/AddAd/AddAd';
import AddEdit from './components/pages/AddEdit/AddEdit';
import SearchPage from './components/pages/SearchPage/SearchPage';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Homepage />} />
          <Route path={'/ads/:id'} element={<Ad />} />
          <Route path={'/ads/add'} element={<AddAd />} />
          <Route path={'/ads/edit/:id'} element={<AddEdit />} />
          <Route path={'/search/:searchPhrase'} element={<SearchPage />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/logout'} element={<Logout />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Container>
    </BrowserRouter>
  );
}

export default App;
