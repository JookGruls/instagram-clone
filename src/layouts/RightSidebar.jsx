import { useState, useEffect } from "react";
import { useUser } from "store/UserContext";
import api from "services/web-service";
import { useInteraction } from "store/InteractionContext";

const RightSidebar = () => {
  const { user, isLoading } = useUser();
  const { suggestions, setSuggestions } = useInteraction();
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [followedUsers, setFollowedUsers] = useState([]);

  const handleFollow = (userId) => {
    if (!userId) return;
    if (followedUsers.includes(userId)) {
      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      setFollowedUsers((prev) => [...prev, userId]);
    }
  };

  useEffect(() => {
    const getSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const fetchAll = [
          api.getSearchImageCat({
            mime_types: "jpg,png",
            limit: 5,
          }),
          api.getSearchImageCat({
            mime_types: "jpg,png",
            limit: 5,
          }),
        ];
        const [res, followers] = await Promise.all(fetchAll);
        const suggest = res.data.map((item, index) => ({
          id: item.id,
          username: `cat_lover_${Math.floor(Math.random() * 1000)}`,
          avatar: item.url,
          followerAvatar: followers.data[index].url,
          followedBy: `cat_${Math.floor(Math.random() * 50)}`,
        }));
        setSuggestions(suggest);
      } catch (error) {
        console.error("Failed to load suggestions", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    getSuggestions();
  }, [setSuggestions]);

  return (
    <div className="hidden lg:flex flex-col w-[320px] ps-[64px] pt-10">
      {/* User Profile */}
      {isLoading ? (
        <div className="flex items-center justify-between mb-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              src={user?.avatar}
              alt="Profile"
              loading="lazy"
              className="w-[44px] h-[44px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user?.username}</span>
              <span className="text-gray-500 text-sm">{user?.fullName}</span>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400 font-semibold text-sm">
          Suggested for you
        </span>
      </div>

      {/* Suggestions List */}
      <div className="flex flex-col space-y-4">
        {isLoadingSuggestions
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[44px] h-[44px] rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : suggestions.map((user) => {
              const isFollowed = followedUsers.includes(user.id);
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      loading="lazy"
                      className="w-[44px] h-[44px] rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm hover:opacity-80">
                        {user.username}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <img
                          src={user.followerAvatar}
                          alt=""
                          loading="lazy"
                          className="w-3 h-3 rounded-full object-cover"
                        />
                        <span className="truncate w-32">
                          Followed by {user.followedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={
                      isFollowed
                        ? "text-white border border-gray-500 rounded px-2.5 py-1 text-xs font-semibold hover:opacity-80 whitespace-nowrap"
                        : "text-[#85A1FF] text-xs font-semibold hover:text-white"
                    }
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default RightSidebar;
