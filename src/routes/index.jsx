import { Route, Routes } from 'react-router-dom';
import Main from 'src/routes/Main';
import Login from 'src/routes/Login';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Router;
