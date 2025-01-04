import { Route, Routes } from 'react-router-dom';
import Main from 'src/routes/Main';
import Login from 'src/routes/Login';
import KakaoAuthHandle from 'src/routes/KakaoAuthHandle';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/auth" element={<KakaoAuthHandle />} />
    </Routes>
  );
}

export default Router;
