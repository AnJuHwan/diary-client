import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/user';

const Home = () => {
  const userData = useRecoilValue(userState);

  console.log(userData);
  return <div>Home</div>;
};

export default Home;
