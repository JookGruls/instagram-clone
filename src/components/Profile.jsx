import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Settings,
  MoreHorizontal,
  Link as LinkIcon,
  Grid,
  Film,
  UserSquare2,
  CheckBadge,
  UserPlus,
  ChevronDown,
  Pin,
  Play,
  Heart,
  MessageCircle,
} from "lucide-react";
import api from "../services/web-service";

const Profile = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const resInfo = await api.getImagesCat(id);
      const info = resInfo.data;
      const res = await api.getSearchImageCat({
        limit: 12,
        has_breeds: 1,
      });
      // Mock Data to match reference image structure
      setUserInfo({
        username: id,
        fullName: info.breeds[0].name,
        category: "Cat",
        bio: info.breeds[0].description,
        link: "",
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 100),
        postsCount: res.data.length,
        avatar: info.url,
        followedBy: [res.data[1]?.url, res.data[2]?.url, res.data[3]?.url],
        followedByText: "",
        highlights: [
          { id: 1, title: "Add yours", image: res.data[4]?.url },
          { id: 2, title: "Thairath Poll", image: res.data[5]?.url },
          { id: 3, title: "Thairath Plus", image: res.data[6]?.url },
          { id: 4, title: "Thairath Talk", image: res.data[7]?.url },
        ],
      });

      const posts = res.data.map((item, index) => ({
        id: item.id,
        image: item.url,
        likes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 200),
        isPinned: index < 3, // Mock first 3 as pinned
        isVideo: index % 4 === 0, // Mock some as video
      }));
      setUserPosts(posts);
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="flex justify-center pt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1457px] px-5 py-8 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row mb-10 w-[68%] max-w-[680px]">
        {/* Profile Image (Left) */}
        <div className="flex-shrink-0 md:w-[290px] flex justify-center items-center">
          <div className="w-[150px] h-[150px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <div className="w-full h-full rounded-full border-[2px] border-white dark:border-black overflow-hidden bg-white">
              <img
                src={userInfo?.avatar}
                alt={userInfo?.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Details (Right) */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Row 1: Username & Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-[26px] font-bold text-black dark:text-white">
                  {userInfo?.username}
                </h2>
                <div>{userInfo?.fullName}</div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button className="text-black dark:text-white ml-2">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Row 2: Stats */}
          <div className="flex gap-10 text-base text-black dark:text-white mb-2">
            <span>
              <span className="font-semibold">{userInfo?.postsCount}</span>{" "}
              โพสต์
            </span>
            <span>
              <span className="font-semibold">{userInfo?.followers}</span>{" "}
              ผู้ติดตาม
            </span>
            <span>
              กำลังติดตาม{" "}
              <span className="font-semibold">{userInfo?.following}</span> คน
            </span>
          </div>

          {/* Row 3: Bio */}
          <div className="text-sm text-black dark:text-white">
            <div className="text-gray-500 dark:text-gray-400 mb-1">
              {userInfo?.category}
            </div>
            <div className="whitespace-pre-wrap mb-2 leading-tight">
              {userInfo?.bio}
            </div>
            {userInfo?.link && (
              <a
                href={`https://${userInfo.link}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-semibold text-[#00376B] dark:text-[#E0F1FF]"
              >
                <LinkIcon size={14} className="rotate-45" />
                {userInfo.link}
              </a>
            )}
          </div>

          {/* Row 4: Followed By */}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex -space-x-2">
              {userInfo?.followedBy?.map((url, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-black overflow-hidden relative z-10"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              ติดตามโดย{" "}
              <span className="font-semibold text-black dark:text-white">
                {userInfo?.followedByText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="flex gap-10 mb-10 px-4 overflow-x-auto pb-4 scrollbar-hide">
        {userInfo?.highlights?.map((hl) => (
          <div
            key={hl.id}
            className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 group"
          >
            <div className="w-[77px] h-[77px] rounded-full p-[2px] bg-gray-200 dark:bg-[#262626] group-hover:bg-gray-300 dark:group-hover:bg-[#363636] transition-colors">
              <div className="w-full h-full rounded-full border-[2px] border-white dark:border-black overflow-hidden">
                <img
                  src={hl.image}
                  alt={hl.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs font-semibold text-black dark:text-white text-center truncate w-[80px]">
              {hl.title}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 dark:border-[#262626] flex justify-center gap-14 text-xs font-semibold tracking-widest uppercase mb-4">
        <button
          className={`flex items-center gap-2 pt-4 border-t border-transparent ${
            activeTab === "posts"
              ? "!border-black dark:!border-white text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          } -mt-[1px] transition-colors`}
          onClick={() => setActiveTab("posts")}
        >
          <Grid size={12} />
          <span>โพสต์</span>
        </button>
        <button
          className={`flex items-center gap-2 pt-4 border-t border-transparent ${
            activeTab === "reels"
              ? "!border-black dark:!border-white text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          } -mt-[1px] transition-colors`}
          onClick={() => setActiveTab("reels")}
        >
          <Film size={12} />
          <span>reels</span>
        </button>
        <button
          className={`flex items-center gap-2 pt-4 border-t border-transparent ${
            activeTab === "tagged"
              ? "!border-black dark:!border-white text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          } -mt-[1px] transition-colors`}
          onClick={() => setActiveTab("tagged")}
        >
          <UserSquare2 size={12} />
          <span>แท็กแล้ว</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {userPosts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer overflow-hidden bg-gray-100 dark:bg-[#121212]"
          >
            <img
              src={post.image}
              alt="post"
              className="w-full h-full object-cover"
            />
            {/* Type Indicator */}
            <div className="absolute top-2 right-2 text-white drop-shadow-md">
              {post.isPinned && (
                <Pin size={16} className="fill-white rotate-45" />
              )}
              {post.isVideo && !post.isPinned && (
                <Play size={16} className="fill-white" />
              )}
              {/* { !post.isVideo && !post.isPinned && <div className="p-1"><div className="w-full h-full bg-transparent" /></div>} */}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center gap-6 text-white text-base font-bold transition-opacity">
              <div className="flex items-center gap-2">
                <Heart className="fill-white w-5 h-5" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="fill-white w-5 h-5" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
