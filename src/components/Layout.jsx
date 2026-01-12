import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 md:ml-[72px] xl:ml-[245px] w-full">
        <div className="max-w-[1000px] mx-auto flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
