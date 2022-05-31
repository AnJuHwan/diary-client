import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import SignLayout from '../components/Layout/SignLayout/SignLayout';
import Home from '../pages/Home/Home';
import Signin from '../pages/SignIn/Signin';
import Signup from '../pages/Signup/Signup';

const RootRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
      </Route>
      <Route path='/' element={<SignLayout />}>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default RootRoute;
