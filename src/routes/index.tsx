import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import SignLayout from '../components/Layout/SignLayout/SignLayout';
import CreateDiary from '../pages/CreateDiary/CreateDiary';
import DetailDiary from '../pages/DetailDiary/DetailDiary';
import EditDiary from '../pages/EditDiary/EditDiary';
import Home from '../pages/Home/Home';
import MyPage from '../pages/MyPage/MyPage';
import Signin from '../pages/SignIn/Signin';
import Signup from '../pages/Signup/Signup';

const RootRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='create' element={<CreateDiary />} />
        <Route path='/detail/:id' element={<DetailDiary />} />
        <Route path='/edit/:id' element={<EditDiary />} />
        <Route path='my' element={<MyPage />} />
      </Route>

      <Route path='/' element={<SignLayout />}>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default RootRoute;
