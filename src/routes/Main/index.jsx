import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stats, greetString, vote, chatGptData } from 'src/data';
import { DATA_TYPE, SCALE, TOKEN_NAME } from 'src/constants';
import { kakaoLogout } from 'src/utils';
import { fetchHarooResponseFromGpt } from 'src/services/harooApis';
import HarooIntro from 'src/components/HarooIntro';
import Layout from 'src/components/Layout';
import HarooStats from 'src/components/HarooStats';
import Vote from 'src/components/Vote';
import LogoutButton from 'src/components/LogoutButton';
import Ad_thin from 'src/components/Ads/Ad_thin';
import { getHarooData } from 'src/services/harooApis';

import { promptMessage } from './prompt';

export default function Main() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem(TOKEN_NAME);
    if (!token) return navigate('/');
  }, []);

  useEffect(() => {
    const message = promptMessage;
    const body = JSON.stringify({ message });

    // fetchHarooResponseFromGpt(body)
    //   .then((response) => {
    //     setData(response);
    //   })
    //   .catch((error) => {
    //     console.error(DATA_TYPE.ERROR_MESSAGE, error);
    //   });

    getHarooData()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(DATA_TYPE.ERROR_MESSAGE, error);
      });
  }, []);

  useEffect(() => {
    console.log('data::: ', data);
  }, [data]);

  const onClickLuckSimulaterButton = () => navigate('/luck');
  const onClickLogout = () => {
    kakaoLogout();
    return navigate('/');
  };

  return (
    <>
      <Layout>
        {data.harooContent && (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onClickLuckSimulaterButton}
              className="bg-blue-500 hover:bg-blue-200 text-white font-semibold text-sm px-4 py-2 rounded shadow transition-all"
            >
              {DATA_TYPE.MAIN_PAGE.LUCK_BUTTON_TEXT}
            </button>

            <HarooIntro introString={data.harooContent.greeting} />
            <HarooStats data={data.harooStat.currentStats} />
            <Vote data={data.todayVote} />
            <div className={`flex flex-row gap-3 mt-5 ${SCALE.WEB_WIDTH}`}>
              <LogoutButton text={DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_LOGOUT} onClick={onClickLogout} />
            </div>
          </div>
        )}
      </Layout>
      <Ad_thin />
    </>
  );
}
