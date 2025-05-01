import { kakaoLogin } from 'src/utils';
import { FONT, TITLE_TEXT } from 'src/constants';

export default function Login() {
  // const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_LOCAL_URL}/auth&response_type=code`;
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_PROD_URL}/auth&response_type=code`;

  return (
    <div className="mt-40 flex flex-col items-center gap-8">
      <img src="/logo.svg" alt="Haroo logo" />
      <div className="flex flex-col items-center">
        <span className={FONT.BIG_BLACK}>{TITLE_TEXT.KOREAN}</span>
        <span className={FONT.MEDIUM_BLUE}>{TITLE_TEXT.ENGLISH}</span>
      </div>
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
    </div>
  );
}
