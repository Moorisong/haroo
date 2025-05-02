import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYoutubeId, validateYoutubeUrl, kakaoListShare, kakaoLogout } from 'src/utils';
import { TextBoxDefault } from 'src/components/TextBox';
import { ALERT_CONTENT, DATA_TYPE, TOKEN_NAME } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

const defaultData = [
  { title: DATA_TYPE.CONDITION, text: '' },
  { title: DATA_TYPE.YOUTUBE, text: '' },
];

export default function Main() {
  const [data, setData] = useState(defaultData);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem(TOKEN_NAME);
    if (!token) return navigate('/');
  }, []);

  const onClickShare = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    const youtubeId = getYoutubeId(data[1].text);
    const isValidYoutubeUrl = validateYoutubeUrl(youtubeId);
    const isTextEmpty = data[0].text.length === 0;

    if (!isValidYoutubeUrl || isTextEmpty) {
      if (isTextEmpty) return alert(ALERT_CONTENT.EMPTY_TEXT);
      if (!isValidYoutubeUrl) return alert(ALERT_CONTENT.INVALID_URL);
    }

    kakaoListShare(data, youtubeId);
    return setData(defaultData);
  };

  const onClickLogout = () => {
    kakaoLogout();
    return navigate('/');
  };

  const onChangeText = (event) => {
    const index = Number(event.target.id);

    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], text: event.target.value };
      return newData;
    });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center mt-20 mb-5 gap-4">
        <BrandHeader scale={'w-[5rem] h-[5rem]'} />
      </div>

      {data.map((e, i) => (
        <TextBoxDefault id={i} onChange={onChangeText} key={e.title + i} title={e.title} text={e.text} />
      ))}

      <div className="flex flex-row gap-3">
        <button className="cursor-pointer" onClick={onClickShare}>
          {DATA_TYPE.TEXT.BUTTON_SHARE}
        </button>
        <button className="cursor-pointer" onClick={onClickLogout}>
          {DATA_TYPE.TEXT.BUTTON_LOGOUT}
        </button>
      </div>
    </div>
  );
}
