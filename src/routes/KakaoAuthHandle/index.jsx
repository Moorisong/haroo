import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function KakaoAuthHandle() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    if (code) navigate('/');
  }, []);

  return;
}
