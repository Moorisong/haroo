import { useNavigate } from 'react-router-dom';
import Layout from 'src/components/Layout';

export default function Main() {
  const navigate = useNavigate();

  const onClickLuckSimulaterButton = () => navigate('/luck');
  return (
    <Layout>
      <button onClick={onClickLuckSimulaterButton}>확률 시뮬레이터 바로가기</button>
    </Layout>
  );
}
