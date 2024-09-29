import { Outlet } from "react-router-dom";

import Header from "./header/header";

function Layout() {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
}

export default Layout;
