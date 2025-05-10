import { isDevEnvironment, kakaoLogin } from 'src/utils';
import { FONT, STYLE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

export default function Login() {
  const isDevNow = isDevEnvironment();
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${isDevNow ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL}/auth&response_type=code`;

  return (
    <div className={`${STYLE.FLEX_COL_ITEM_CENTER} mt-40 gap-8`}>
      <BrandHeader />
      <span className={`flex gap-1 ${FONT.SMALL_GRAY}`}>
        <span>2025</span>
        <span>·</span>
        <span>SH Kim</span>
      </span>
      <button
        className="cursor-pointer w-20"
        onClick={() => {
          kakaoLogin(url);
        }}
      >
        <img src="/images/kakaoLogin.png" alt="Kakao Login Butoon" />
      </button>
    </div>
  );
}
