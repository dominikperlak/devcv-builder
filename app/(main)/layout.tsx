import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sections from '../components/sections/Sections';
import Settings from '../components/settings/Settings';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <div className="flex-1">
          <Sections />
          {children}
        </div>
        <div className="flex-none">
          <Settings />
        </div>
      </main>
      <Footer />
    </div>
  );
}
