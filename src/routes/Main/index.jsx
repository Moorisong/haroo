import { useNavigate } from 'react-router-dom';
import { stats, greetString, vote } from 'src/data';
import HarooIntro from 'src/components/HarooIntro';
import Layout from 'src/components/Layout';
import HarooStats from 'src/components/HarooStats';
import Vote from 'src/components/Vote';

export default function Main() {
  const navigate = useNavigate();

  const onClickLuckSimulaterButton = () => navigate('/luck');
  return (
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
      </div>
    </Layout>
  );
}
