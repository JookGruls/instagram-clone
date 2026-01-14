import React from "react";
import MainLayout from "layouts/MainLayout";
import Feed from "components/Feed";
import RightSidebar from "layouts/RightSidebar";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex w-full justify-center">
        <Feed />
        <RightSidebar />
      </div>
    </MainLayout>
  );
};

export default HomePage;
