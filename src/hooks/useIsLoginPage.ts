import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useIsLoginPage = () => {
  const localStorageId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorageId) {
      return;
    }
    navigate('/signin');
  }, [localStorageId, navigate]);
};
