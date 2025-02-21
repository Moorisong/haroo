import { kakaoLogin } from 'src/utils';
export default function Login() {
  // const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_LOCAL_URL}/auth&response_type=code`;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_PROD_URL}/auth&response_type=code`;

  return (
    <div
      onClick={() => {
        kakaoLogin(url);
      }}
    >
      login
    </div>
  );
}
