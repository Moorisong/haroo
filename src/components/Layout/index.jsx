import BrandHeader from 'src/components/BrandHeader';
import Footer from 'src/components/Footer';
import { COMPONENT_STYLE } from 'src/constants';

export default function Layout({ children }) {
  return (
    <div className={`${COMPONENT_STYLE.FLEX_COL_ITEM_CENTER} gap-5 mt-10 px-4`}>
      <BrandHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
