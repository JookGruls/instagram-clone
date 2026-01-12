import React from "react";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";

const Post = ({ username, image, avatar, likes, caption, comments }) => {
  return (
    <div className="flex flex-col w-full max-w-[470px] mx-auto border-b border-gray-200 dark:border-gray-900 pb-6 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm hover:opacity-80 cursor-pointer">
            {username}
          </span>
          <span className="text-gray-500 text-sm">• 1h</span>
        </div>
        <MoreHorizontal size={20} className="hover:opacity-60 cursor-pointer" />
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-[4px] overflow-hidden border border-gray-200 dark:border-gray-800">
        <img src={image} alt="Post" className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Heart
            size={24}
            className="hover:opacity-60 cursor-pointer hover:text-gray-400"
          />
          <MessageCircle
            size={24}
            className="hover:opacity-60 cursor-pointer -rotate-90"
          />
          <Send size={24} className="hover:opacity-60 cursor-pointer" />
        </div>
        <Bookmark size={24} className="hover:opacity-60 cursor-pointer" />
      </div>

      {/* Likes */}
      <div className="font-semibold text-sm mb-1">
        {likes.toLocaleString()} likes
      </div>

      {/* Caption */}
      <div className="text-sm mb-1">
        <span className="font-semibold mr-2">{username}</span>
        <span>{caption}</span>
      </div>

      {/* View Comments */}
      <div className="text-gray-500 text-sm cursor-pointer mb-2">
        View all {comments} comments
      </div>

      {/* Add Comment */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          className="bg-transparent text-sm w-full focus:outline-none placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default Post;
