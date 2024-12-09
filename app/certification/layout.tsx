import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sections from '../components/sections/Sections';
import Settings from '../components/settings/Settings';

const CertificationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <div className="flex-2 flex">
          <Sections />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-4xl">{children}</div>
        </div>
        <div className="flex-none">
          <Settings />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificationLayout;
