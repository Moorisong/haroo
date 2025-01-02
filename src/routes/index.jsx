import { Route, Routes } from 'react-router-dom';
import Main from 'src/routes/Main';
import Login from 'src/routes/Login';
import KakaoAuthHandle from 'src/routes/KakaoAuthHandle';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<KakaoAuthHandle />} />
    </Routes>
  );
}

export default Router;
