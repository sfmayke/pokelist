import { Outlet } from "react-router-dom";
import NavBar from "./../NavBar";
import "./Layout.scss";

export default function Layout() {
  return (
    <div className="layout-root">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
