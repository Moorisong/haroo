import { kakaoLogin } from 'src/utils';
import { FONT } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';
import Ad_thin from 'src/components/Ads/Ad_thin';

export default function Login() {
  // const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_LOCAL_URL}/auth&response_type=code`;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_PROD_URL}/auth&response_type=code`;

  return (
    <div className="mt-40 flex flex-col items-center gap-8">
      <BrandHeader />
      <span className={`flex gap-1 ${FONT.SMALL_GRAY}`}>
        <span>2025</span>
        <span>·</span>
        <span>SH Kim</span>
      </span>
      <button
        className="cursor-pointer"
        onClick={() => {
          kakaoLogin(url);
        }}
      >
        <img src="/images/kakaoLogin.png" alt="Kakao Login Butoon" />
      </button>

      <Ad_thin />
    </div>
  );
}
