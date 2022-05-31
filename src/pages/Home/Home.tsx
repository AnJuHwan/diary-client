import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/user';

const Home = () => {
  const userData = useRecoilValue(userState);

  console.log(userData);
  return <div style={{ width: '100%' }}>Home</div>;
};

export default Home;
