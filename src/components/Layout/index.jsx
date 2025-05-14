import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BrandHeader from 'src/components/BrandHeader';
import Footer from 'src/components/Footer';
import { COMPONENT_STYLE, PATH } from 'src/constants';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const publicPaths = [PATH.DEFAULT]; // 예외 페이지

    const isPublicPath = publicPaths.includes(location.pathname);

    if (!accessToken && !isPublicPath) {
      navigate(PATH.DEFAULT);
    }
  }, [location, navigate]);

  return (
    <div className={`${COMPONENT_STYLE.FLEX_COL_ITEM_CENTER} gap-5 mt-10 px-4`}>
      <BrandHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
