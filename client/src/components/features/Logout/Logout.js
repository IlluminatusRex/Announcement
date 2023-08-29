import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };
    fetch(`${API_URL}/auth/logout`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logOut());
          setTimeout(() => {
            return navigate('/');
          }, 2000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  }, [dispatch]);
  return null;
};

export default Logout;
