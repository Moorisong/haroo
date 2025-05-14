import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PATH } from 'src/constants';
import { sendKakaoTokenToBackend } from 'src/services/harooApis';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    sendKakaoTokenToBackend(code).finally(() => {
      navigate(PATH.MAIN);
    });
  }, []);

  return;
}
