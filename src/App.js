import React from "react";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <Layout>
      <Feed />
      <RightSidebar />
    </Layout>
  );
}

export default App;
