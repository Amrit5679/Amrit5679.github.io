import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Actions/auth';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(logout()).then(() => {
      navigate('/');
    }).catch((err) => {
        setError('Failed to log out.');
        console.error(err);
    });
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Logging out...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default Logout;
