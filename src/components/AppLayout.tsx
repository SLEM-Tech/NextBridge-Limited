import { ReactNode } from "react";
import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <main className={`relative`}>
      <Header />
      <div className={`min-h-screen ${className}`}>{children}</div>
      <Footer />
      {/* Spacer div removed — was for AppMenu bottom bar */}
    </main>
  );
};

export default AppLayout;
