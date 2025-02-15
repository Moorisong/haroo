import { useState } from 'react';
import { getYoutubeId, validateYoutubeUrl, kakaoListShare, validateTextLimit } from 'src/utils';
import { TextBoxDefault } from 'src/components/TextBox';
import { ALERT_CONTENT, DATA_TYPE } from 'src/constants';

export default function Main() {
  const defalutData = [
    { title: DATA_TYPE.CONDITION, text: '' },
    { title: DATA_TYPE.YOUTUBE, text: '' },
  ];
  const [data, setData] = useState(defalutData);

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
    return setData(defalutData);
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
    </div>
  );
}
