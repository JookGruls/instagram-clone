import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./store/UserContext";
import { InteractionProvider } from "./store/InteractionContext";
import HomePage from "./features/home";
import ProfilePage from "./features/profile";
import ExplorePage from "./features/explore";
import ReelsPage from "./features/reels";
import NotificationsPage from "./features/notifications";
import MessagesPage from "./features/messages";

function App() {
  return (
    <UserProvider>
      <InteractionProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </InteractionProvider>
    </UserProvider>
  );
}

export default App;
