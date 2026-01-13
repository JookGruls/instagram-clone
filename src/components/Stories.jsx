import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInteraction } from "../context/InteractionContext";
import api from "../services/web-service";

const Stories = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { stories, setStories } = useInteraction();

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.getSearchImageCat({
        limit: 15,
        mime_types: "jpg,png",
      });
      const newStories = res.data.map((item, index) => ({
        id: item.id,
        username: `cat_lover_${index + 1}`,
        avatar: item.url,
      }));
      setStories(newStories);
    } catch (error) {
      console.error("Failed to load stories", error);
    } finally {
      setIsLoading(false);
    }
  }, [setStories]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Item width (89px) + gap (16px) = 105px
      // 6 items = 105px * 6 = 630px
      const scrollAmount = 630;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      // Allow a small buffer (1px) for floating point calculations
      setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      checkScroll(); // Check after render/update
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, [stories, isLoading]);

  const buttonClass =
    "absolute top-[61px] -translate-y-1/2 z-10 bg-white dark:bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out opacity-90 hover:opacity-100";

  return (
    <div className="relative w-full max-w-[630px] pt-4 pb-4 bg-white dark:bg-black dark:border-gray-900 group">
      {!isLoading && showLeft && (
        <button
          onClick={() => scroll("left")}
          className={`${buttonClass} left-2`}
        >
          <ChevronLeft
            size={18}
            strokeWidth={2.5}
            className="text-black ml-[-1px]"
          />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-3"
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0 w-[89px] animate-pulse"
              >
                <div className="w-[84px] h-[84px] rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="mt-2 h-2.5 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))
          : stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer w-[89px] transition-transform duration-200 hover:scale-105"
              >
                <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[3px]">
                  <div className="w-full h-full rounded-full bg-white dark:bg-black p-[3px]">
                    <img
                      src={story.avatar}
                      alt={story.username}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-black dark:text-white mt-1 w-full truncate px-1">
                  {story.username}
                </span>
              </div>
            ))}
      </div>

      {!isLoading && showRight && (
        <button
          onClick={() => scroll("right")}
          className={`${buttonClass} right-4`}
        >
          <ChevronRight
            size={18}
            strokeWidth={2.5}
            className="text-black ml-[1px]"
          />
        </button>
      )}
    </div>
  );
};

export default Stories;
