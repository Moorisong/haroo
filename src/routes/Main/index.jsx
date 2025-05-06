import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stats, greetString, vote } from 'src/data';
import { DATA_TYPE, SCALE, TOKEN_NAME } from 'src/constants';
import { kakaoLogout } from 'src/utils';
import HarooIntro from 'src/components/HarooIntro';
import Layout from 'src/components/Layout';
import HarooStats from 'src/components/HarooStats';
import Vote from 'src/components/Vote';
import LogoutButton from 'src/components/LogoutButton';
import Ad_thin from 'src/components/Ads/Ad_thin';

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem(TOKEN_NAME);
    if (!token) return navigate('/');
  }, []);

  const onClickLuckSimulaterButton = () => navigate('/luck');
  const onClickLogout = () => {
    kakaoLogout();
    return navigate('/');
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onClickLuckSimulaterButton}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold text-sm px-4 py-2 rounded shadow transition-all"
          >
            🎲 오늘의 운세, 당신의 운명은?!
          </button>

          <HarooIntro introString={greetString} />
          <HarooStats data={stats} />
          <Vote data={vote} />
          <div className={`flex flex-row gap-3 mt-5 ${SCALE.WEB_WIDTH}`}>
            <LogoutButton text={DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_LOGOUT} onClick={onClickLogout} />
          </div>
        </div>
      </Layout>
      <Ad_thin />
    </>
  );
}
