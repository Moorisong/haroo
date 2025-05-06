import { Route, Routes } from 'react-router-dom';
import Main from 'src/routes/Main';
import Login from 'src/routes/Login';
import KakaoAuthHandle from 'src/routes/KakaoAuthHandle';
import Policy from 'src/routes/Policy';
import Terms from 'src/routes/Terms';
import Luck from 'src/routes/Luck';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/luck" element={<Luck />} />
      <Route path="/auth" element={<KakaoAuthHandle />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default Router;
