import { Route, Routes } from 'react-router-dom';
import Main from 'src/routes/Main';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default Router;
