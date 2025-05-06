import BrandHeader from 'src/components/BrandHeader';
import Footer from 'src/components/Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <BrandHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
