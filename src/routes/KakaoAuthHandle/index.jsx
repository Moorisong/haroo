import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ALERT_CONTENT, PATH, TOKEN_NAME } from 'src/constants';
import { sendKakaoTokenToBackend } from 'src/services/harooApis';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    sendKakaoTokenToBackend(code)
      .then((response) => {
        console.log('response:::111 ', response);
        // token은 로그인 여부 식별용
        const token = code.slice(-3) + new Date().getTime();
        window.sessionStorage.setItem(TOKEN_NAME, token);
        return navigate(PATH.MAIN);
      })
      .catch(() => {
        alert(ALERT_CONTENT.LOGIN_ERROR);
        return navigate(PATH.MAIN);
      });
  }, []);

  return;
}
