import MainLayout from "layouts/MainLayout";
import Profile from "components/Profile";

const ProfilePage = () => {
  return (
    <MainLayout isProfilePage>
      <Profile />
    </MainLayout>
  );
};

export default ProfilePage;
