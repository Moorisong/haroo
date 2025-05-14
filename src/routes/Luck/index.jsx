import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYoutubeId, validateYoutubeUrl, kakaoListShare, kakaoLogout } from 'src/utils';
import { TextBox } from 'src/components/TextBox';
import { ALERT_CONTENT, DATA_TYPE, PATH, SCALE, STYLE } from 'src/constants';
import Layout from 'src/components/Layout';
import Ad_thin from 'src/components/Ads/Ad_thin';
import LogoutButton from 'src/components/LogoutButton';
import ShareButton from 'src/components/ShareButton';

const defaultData = [
  { title: DATA_TYPE.LUCK_SIMULATOR.CONDITION, subTitle: DATA_TYPE.LUCK_SIMULATOR.CONDITION_ADDITIONAL, text: '' },
  { title: DATA_TYPE.LUCK_SIMULATOR.YOUTUBE, subTitle: DATA_TYPE.LUCK_SIMULATOR.YOUTUBE_ADDITIONAL, text: '' },
];

export default function Luck() {
  const [data, setData] = useState(defaultData);
  const [withoutYoutube, setWithoutYoutube] = useState(false);
  const navigate = useNavigate();

  const onClickShare = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    const youtubeId = getYoutubeId(data[1].text);
    const isValidYoutubeUrl = validateYoutubeUrl(youtubeId);
    const isTextEmpty = data[0].text.length === 0;

    if (!isValidYoutubeUrl || isTextEmpty) {
      if (isTextEmpty) return alert(ALERT_CONTENT.EMPTY_TEXT);
      if (!withoutYoutube && !isValidYoutubeUrl) return alert(ALERT_CONTENT.INVALID_URL);
    }

    kakaoListShare(data, youtubeId, withoutYoutube);
    return setData(defaultData);
  };

  const onClickLogout = () => {
    kakaoLogout();
    return navigate(PATH.DEFAULT);
  };

  const onChangeText = (event) => {
    const index = Number(event.target.id);
    const value = event.target.value;

    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        text: index === 0 ? (value.length < 36 ? value : prevData[0].text) : value,
      };
      return newData;
    });
  };

  const handleToggleYoutube = () => {
    setWithoutYoutube((prev) => !prev);
  };

  return (
    <>
      <Layout>
        <div className={`${STYLE.FLEX_COL_ITEM_CENTER} gap-4`}>
          {data.map((e, i) => (
            <TextBox
              id={i}
              onChange={onChangeText}
              youtubeOption={{ withoutYoutube, onToggle: handleToggleYoutube }}
              key={e.title + i}
              title={e.title}
              subTitle={e.subTitle}
              text={e.text}
            />
          ))}

          <div className={`flex flex-row gap-3 mt-5 ${SCALE.WEB_WIDTH}`}>
            <ShareButton onClick={onClickShare} />
            <LogoutButton text={DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_LOGOUT} onClick={onClickLogout} />
          </div>
        </div>
      </Layout>

      <Ad_thin />
    </>
  );
}
