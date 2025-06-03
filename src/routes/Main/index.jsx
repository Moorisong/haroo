import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPONENT_STYLE, DATA_TYPE, PATH } from 'src/constants';
import { clearTokens } from 'src/utils';
import HarooIntro from 'src/components/HarooIntro';
import Layout from 'src/components/Layout';
import HarooStats from 'src/components/HarooStats';
import Vote from 'src/components/Vote';
import LogoutButton from 'src/components/LogoutButton';
import Ad_thin from 'src/components/Ads/Ad_thin';
import { getHarooData } from 'src/services/harooApis';
import VoteResult from 'src/components/VoteResult';
import LuckButton from 'src/components/LuckButton';
import Exception from 'src/routes/Execption';

export default function Main() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getHarooData()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(DATA_TYPE.ERROR_MESSAGE, error);
        setData(false);
      });
  }, []);

  useEffect(() => {
    console.log('data::: ', data);
  }, [data]);

  const onClickLuckSimulaterButton = () => navigate(PATH.LUCK);
  const onClickLogout = () => {
    clearTokens();
    return navigate(PATH.DEFAULT);
  };

  if (!data) return <Exception />;
  return (
    <>
      <Layout>
        <div className={COMPONENT_STYLE.MAIN.CONTAINER}>
          {data.harooContent && (
            <div className={COMPONENT_STYLE.MAIN.WRAPPER}>
              <LuckButton onClick={onClickLuckSimulaterButton} />

              <div className={COMPONENT_STYLE.MAIN.FLEX_ROW}>
                <HarooIntro introString={data.harooContent.greeting} emoticon={data.harooContent.emoticon} />
                <HarooStats data={data.harooStat.currentStats} />
              </div>

              <VoteResult
                statData={data.harooStat.statsHistory[data.harooStat.statsHistory.length - 1]}
                voteData={data.yesterdayVote}
              />
              <Vote voteData={data.todayVote} userVoteData={data.todayUserVoteState} />

              <div className={COMPONENT_STYLE.MAIN.LOGOUT_WRAPPER}>
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
