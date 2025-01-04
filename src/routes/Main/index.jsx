import { useState } from 'react';
import { kakaoTextShare } from 'src/utils';

export default function Main() {
  const [data, setData] = useState({
    user: '발신자',
    text: `안녕하세요.\n테스트입니다. \n줄바꿈 테스트입니다.`,
  });

  const onClickShare = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    kakaoTextShare(data);
  };

  return <div onClick={onClickShare}>공유하기</div>;
}
