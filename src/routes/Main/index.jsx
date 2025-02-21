import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYoutubeId, validateYoutubeUrl, kakaoListShare, validateTextLimit, kakaoLogout } from 'src/utils';
import { TextBoxDefault } from 'src/components/TextBox';
import { ALERT_CONTENT, DATA_TYPE, TOKEN_NAME } from 'src/constants';

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
    const isValidTextLength = validateTextLimit(data[0].text, 35);

    if (!isValidYoutubeUrl || !isValidTextLength) {
      if (!isValidTextLength) return alert(ALERT_CONTENT.TEXT_LIMIT);
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
    const dataType = event.target.id === '0' ? DATA_TYPE.CONDITION : DATA_TYPE.YOUTUBE;

    setData((prevData) => {
      let newData = [...prevData];

      switch (dataType) {
        case DATA_TYPE.CONDITION:
          newData[0] = { ...newData[0], text: event.target.value };
          break;

        case DATA_TYPE.YOUTUBE:
          newData[1] = { ...newData[1], text: event.target.value };
          break;

        default:
          return prevData;
      }
      return newData;
    });
  };

  return (
    <div>
      {data.map((e, i) => (
        <TextBoxDefault id={i} onChange={onChangeText} key={e.title + i} title={e.title} text={e.text} />
      ))}

      <div onClick={onClickShare}>{DATA_TYPE.TEXT.BUTTON_SHARE}</div>
      <div onClick={onClickLogout}>{DATA_TYPE.TEXT.BUTTON_LOGOUT}</div>
    </div>
  );
}
