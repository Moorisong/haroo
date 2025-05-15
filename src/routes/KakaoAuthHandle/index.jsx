import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from 'src/AuthContext';
import { PATH } from 'src/constants';
import { sendKakaoCodeToBackend } from 'src/services/harooApis';
import { setGlobalAccessToken, setGlobalRefreshToken } from 'src/services';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAccessToken } = useAuth();

  const code = searchParams.get('code');

  useEffect(() => {
    sendKakaoCodeToBackend(code)
      .then((response) => {
        setAccessToken(response.accessToken);
        setGlobalAccessToken(response.accessToken);
        setGlobalRefreshToken(response.refreshToken);
        return navigate(PATH.MAIN);
      })
      .catch((err) => {
        throw new Error(`error in getting access token : ${err.message}`);
      });
  }, []);

  return;
}
