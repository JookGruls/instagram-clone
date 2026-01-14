import React, { useState } from "react";
import { useInteraction } from "store/InteractionContext";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Post = ({
  id,
  username,
  image,
  images,
  avatar,
  likes,
  caption,
  comments,
}) => {
  const { toggleLike, toggleSave, isLiked, isSaved } = useInteraction();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const liked = isLiked(id);
  const saved = isSaved(id);

  // Use images array if available, otherwise fallback to single image
  const postImages = images && images.length > 0 ? images : [image];
  const hasMultipleImages = postImages.length > 1;

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      setImageLoaded(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex < postImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      setImageLoaded(false);
    }
  };

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

      {/* Image Carousel */}
      <div className="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded-[4px] overflow-hidden border border-gray-200 dark:border-gray-800 relative group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )}
        <img
          key={postImages[currentImageIndex]} // Force re-render for animation/loading state
          src={postImages[currentImageIndex]}
          alt={`Post ${currentImageIndex + 1}`}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {currentImageIndex < postImages.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
              {postImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${
                    idx === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Heart
            size={24}
            className={`cursor-pointer hover:opacity-60 ${
              liked ? "fill-red-500 text-red-500" : "hover:text-gray-400"
            }`}
            onClick={() => toggleLike(id)}
          />
          <MessageCircle
            size={24}
            className="hover:opacity-60 cursor-pointer -rotate-90"
          />
          <Send size={24} className="hover:opacity-60 cursor-pointer" />
        </div>
        <Bookmark
          size={24}
          className={`cursor-pointer hover:opacity-60 ${
            saved ? "fill-black text-black dark:fill-white dark:text-white" : ""
          }`}
          onClick={() => toggleSave(id)}
        />
      </div>

      {/* Likes */}
      <div className="font-semibold text-sm mb-1">
        {(likes + (liked ? 1 : 0)).toLocaleString()} likes
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
