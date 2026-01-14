import Sidebar from "layouts/Sidebar";

const MainLayout = ({ children, isProfilePage = false }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex transition-colors duration-300">
      <Sidebar isProfilePage={isProfilePage} />
      <main className="flex-1 md:ml-[72px] xl:ml-[245px] w-full pt-[60px] pb-[60px] md:pt-0 md:pb-0">
        <div className="max-w-[1000px] mx-auto flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
