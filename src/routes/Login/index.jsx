export default function Login() {
  // const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_LOCAL_URL}/auth&response_type=code`;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_PROD_URL}/auth&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <div
      onClick={() => {
        kakaoLogin();
      }}
    >
      login
    </div>
  );
}
