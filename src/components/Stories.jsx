import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Stories = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const stories = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://ui-avatars.com/api/?name=User+${i}&background=random&rounded=true`,
  }));

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
      checkScroll(); // Initial check
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const buttonClass =
    "absolute top-[61px] -translate-y-1/2 z-10 bg-white dark:bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out opacity-90 hover:opacity-100";

  return (
    <div className="relative w-full max-w-[630px] pt-4 pb-4 bg-white dark:bg-black dark:border-gray-900 group">
      {showLeft && (
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
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer w-[89px] transition-transform duration-200 hover:scale-105"
          >
            <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[3px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-black p-[3px]">
                <img
                  src={story.avatar}
                  alt={story.username}
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

      {showRight && (
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
