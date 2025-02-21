import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ALERT_CONTENT } from 'src/constants';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      const token = code.slice(-3) + new Date().getTime();
      window.sessionStorage.setItem('harooToken', token);
      return navigate('/main');
    }
    alert(ALERT_CONTENT.LOGIN_ERROR);
    return navigate('/');
  }, []);

  return;
}
