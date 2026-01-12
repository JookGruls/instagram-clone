import React from "react";
import Stories from "./Stories";
import Post from "./Post";

const Feed = () => {
  const posts = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://ui-avatars.com/api/?name=User+${i}&background=random&rounded=true`,
    image: `https://picsum.photos/seed/${i + 10}/600/600`,
    likes: Math.floor(Math.random() * 1000) + 100,
    caption: "This is a beautiful day! #instagram #clone #react",
    comments: Math.floor(Math.random() * 50) + 5,
  }));

  return (
    <div className="flex flex-col w-full max-w-[630px] items-center pt-3">
      <Stories />
      <div className="w-full mt-4 bg-white dark:bg-black">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
