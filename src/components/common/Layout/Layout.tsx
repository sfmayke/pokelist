import { ReactElement, ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import './Layout.scss';

interface LayoutProps {
  children: ReactElement | ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return(
    <div className="layout-root">
      <Header />
      <main className="layout-root__container">
        {children}
      </main>
      <Footer />
    </div>
  );
}