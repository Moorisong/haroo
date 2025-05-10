import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA_TYPE, PATH, STYLE, TOKEN_NAME } from 'src/constants';
import { kakaoLogout } from 'src/utils';
import { fetchHarooResponseFromGpt } from 'src/services/harooApis';
import HarooIntro from 'src/components/HarooIntro';
import Layout from 'src/components/Layout';
import HarooStats from 'src/components/HarooStats';
import Vote from 'src/components/Vote';
import LogoutButton from 'src/components/LogoutButton';
import Ad_thin from 'src/components/Ads/Ad_thin';
import { getHarooData } from 'src/services/harooApis';

// import { promptMessage } from './prompt';

export default function Main() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem(TOKEN_NAME);
    if (!token) return navigate(PATH.DEFAULT);
  }, []);

  useEffect(() => {
    // const message = promptMessage;
    // const body = JSON.stringify({ message });

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

  const onClickLuckSimulaterButton = () => navigate(PATH.LUCK);
  const onClickLogout = () => {
    kakaoLogout();
    return navigate(PATH.DEFAULT);
  };

  return (
    <>
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-8">
          {data.harooContent && (
            <div className={`${STYLE.FLEX_COL_ITEM_CENTER} gap-8`}>
              <button
                onClick={onClickLuckSimulaterButton}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-full shadow-md transition-all mb-8"
              >
                {DATA_TYPE.MAIN_PAGE.LUCK_BUTTON_TEXT}
              </button>

              <div className="flex flex-col md:flex-row gap-8 w-full">
                <HarooIntro introString={data.harooContent.greeting} emoticon={data.harooContent.emoticon} />
                <HarooStats data={data.harooStat.currentStats} />
              </div>

              <Vote data={data.todayVote} />

              <div className="flex justify-end mb-4">
                <LogoutButton text={DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_LOGOUT} onClick={onClickLogout} />
              </div>
            </div>
          )}
        </div>
        <Ad_thin />
      </Layout>
      <Ad_thin />
    </>
  );
}
