import { useState } from 'react';
import { kakaoTextShare } from 'src/utils';
import { TextBoxDefault } from 'src/components/TextBox';
import { DATA_TYPE } from 'src/constants';

export default function Main() {
  const defalutData = [
    { title: '보내는 사람', text: '' },
    { title: '내용', text: '' },
    { title: '유튜브', text: '' },
  ];
  const [data, setData] = useState(defalutData);

  const onClickShare = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    kakaoTextShare(data);
    // setData(defalutData);
  };

  const onChangeText = (event) => {
    const dataType =
      event.target.id === '0' ? DATA_TYPE.SENDER : event.target.id === '1' ? DATA_TYPE.CONTENT : DATA_TYPE.YOUTUBE;

    setData((prevData) => {
      let newData = [...prevData];

      switch (dataType) {
        case DATA_TYPE.SENDER:
          newData[0] = { ...newData[0], text: event.target.value };
          break;

        case DATA_TYPE.CONTENT:
          newData[1] = { ...newData[1], text: event.target.value };
          break;

        case DATA_TYPE.YOUTUBE:
          newData[2] = { ...newData[2], text: event.target.value };
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
        <TextBoxDefault id={i} onChange={onChangeText} key={e.title + i} title={e.title} message={e.text} />
      ))}

      <div onClick={onClickShare}>공유하기</div>
    </div>
  );
}
