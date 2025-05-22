import { useNavigate } from 'react-router-dom';
import Layout from 'src/components/Layout';
import LogoutButton from 'src/components/LogoutButton';
import LuckButton from 'src/components/LuckButton';
import { COMPONENT_STYLE, DATA_TYPE, PATH, TEXT } from 'src/constants';
import { clearTokens } from 'src/utils';

export default function Exception() {
  const navigate = useNavigate();
  const onClickLuckSimulaterButton = () => navigate(PATH.LUCK);
  const onClickLogout = () => {
    clearTokens();
    return navigate(PATH.DEFAULT);
  };
  return (
    <Layout>
      <div className={COMPONENT_STYLE.MAIN.WRAPPER}>
        <div className="mt-5">
          <LuckButton onClick={onClickLuckSimulaterButton} />
        </div>
        <div className={COMPONENT_STYLE.EXCEPTION.CONTAINER}>
          <pre className={COMPONENT_STYLE.EXCEPTION.BOX}>{TEXT.EXCEPTION}</pre>
        </div>
        <div className={COMPONENT_STYLE.MAIN.LOGOUT_WRAPPER}>
          <LogoutButton text={DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_LOGOUT} onClick={onClickLogout} />
        </div>
      </div>
    </Layout>
  );
}
