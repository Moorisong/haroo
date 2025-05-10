import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ALERT_CONTENT, PATH, TOKEN_NAME } from 'src/constants';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      const token = code.slice(-3) + new Date().getTime();
      window.sessionStorage.setItem(TOKEN_NAME, token);
      return navigate(PATH.MAIN);
    }
    alert(ALERT_CONTENT.LOGIN_ERROR);
    return navigate(PATH.DEFAULT);
  }, []);

  return;
}
