import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";
import Profile from "./components/Profile";
import { UserProvider } from "./context/UserContext";
import { InteractionProvider } from "./context/InteractionContext";

function App() {
  return (
    <UserProvider>
      <InteractionProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex w-full justify-center">
                  <Feed />
                  <RightSidebar />
                </div>
              }
            />
            <Route path="/:id" element={<Profile />} />
          </Routes>
        </Layout>
      </InteractionProvider>
    </UserProvider>
  );
}

export default App;
