import React from "react";

const RightSidebar = () => {
  const suggestions = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    username: `suggested_user_${i}`,
    subtitle: "Followed by user_1 + 2 more",
    avatar: `https://ui-avatars.com/api/?name=Suggested+${i}&background=random&rounded=true`,
  }));

  return (
    <div className="hidden xl:flex flex-col w-[320px] pl-[64px] pt-10">
      {/* User Profile */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 cursor-pointer">
          <img
            src="https://ui-avatars.com/api/?name=My+User&background=random&rounded=true"
            alt="Profile"
            className="w-[44px] h-[44px] rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">my_username</span>
            <span className="text-gray-500 text-sm">My Name</span>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold hover:text-black dark:hover:text-white">
          Switch
        </button>
      </div>

      {/* Suggestions Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400 font-semibold text-sm">
          Suggested for you
        </span>
        <button className="text-black dark:text-white text-xs font-semibold hover:text-gray-500 dark:hover:text-gray-400">
          See All
        </button>
      </div>

      {/* Suggestions List */}
      <div className="flex flex-col space-y-4">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-[44px] h-[44px] rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm hover:opacity-80">
                  {user.username}
                </span>
                <span className="text-gray-500 text-xs w-40 truncate">
                  {user.subtitle}
                </span>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold hover:text-black dark:hover:text-white">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-wrap gap-x-1 gap-y-0 text-xs text-gray-500">
        {[
          "About",
          "Help",
          "Press",
          "API",
          "Jobs",
          "Privacy",
          "Terms",
          "Locations",
          "Language",
          "Meta Verified",
        ].map((item, i) => (
          <React.Fragment key={item}>
            <a href="#" className="hover:underline">
              {item}
            </a>
            {i !== 9 && <span>·</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500 uppercase">
        © 2024 Instagram from Meta
      </div>
    </div>
  );
};

export default RightSidebar;
