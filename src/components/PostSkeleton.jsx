import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col w-full max-w-[470px] mx-auto border-b border-gray-200 dark:border-gray-900 pb-6 mb-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-[4px] border border-gray-200 dark:border-gray-800" />

      {/* Actions */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      {/* Likes */}
      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-2" />

      {/* Caption */}
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
    </div>
  );
};

export default PostSkeleton;
