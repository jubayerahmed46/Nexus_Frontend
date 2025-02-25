import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import PageLoader from "../components/spinners/PageLoader";
import ReapopToaster from "../components/reapopToaster";
import useAuth from "../hooks/useAuth";
import ThemeController from "../components/ThemeController";

function MainLayout() {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;
  return (
    <div className="dark:bg-black1">
      {/* navbar */}
      <div>
        <NavBar />
      </div>
      {/* dynamic page */}
      {/* max-w-7xl mx-auto lg:px-20 md:px-10 px-3 */}
      <div className="min-h-80 ">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />

      {/* toaster */}
      <ReapopToaster />
      {/* theme controller */}
      <ThemeController />
    </div>
  );
}
export default MainLayout;
