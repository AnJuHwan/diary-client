import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

let timer: NodeJS.Timeout;

const useIsLogin = () => {
  const localStorageId = localStorage.getItem('id');
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorageId) {
      setVisibleModal(true);
      setMessage('로그인 후 이용해주세요.');
      timer = setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
    return () => {
      setVisibleModal(false);
      clearTimeout(timer);
    };
  }, [localStorageId, navigate]);

  return { message, visibleModal, setVisibleModal, setMessage };
};

export default useIsLogin;
