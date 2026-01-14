import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "services/web-service";
import isEmpty from "lodash/isEmpty";
import { useInteraction } from "store/InteractionContext";

const SearchDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setSearchInfo } = useInteraction();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleChangeText = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsLoading(!!value);
  };

  const handleSearch = useCallback(async () => {
    if (!searchQuery) return;
    try {
      setIsLoading(true);
      const res = await api.getSearchImageCat({
        breed_ids: searchQuery,
        limit: 5,
      });
      const newResult = res.data.map((item) => ({
        id: item.id,
        name: `cat_lover_${Math.floor(Math.random() * 1000)}`,
        breed: item.breeds?.[0]?.name,
        url: item.url,
      }));
      setSearchResult(newResult);
    } catch (error) {
      console.error("Failed to save search history", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const fetchSearch = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      handleSearch();
    }, 2500);
  }, [handleSearch]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  }, []);

  const removeItem = useCallback(
    (itemToRemove) => {
      const newHistory = searchHistory.filter((item) => {
        if (typeof item === "object" && typeof itemToRemove === "object") {
          return item.id !== itemToRemove.id;
        }
        return item !== itemToRemove;
      });
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    },
    [searchHistory]
  );

  const handleProfilePage = (item) => {
    const exists = searchHistory.some((historyItem) => {
      if (typeof historyItem === "object") {
        return historyItem.id === item.id;
      }
      return historyItem === item.name;
    });

    if (!exists) {
      const newHistory = [...searchHistory, item];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
    setSearchQuery("");
    setSearchInfo(item);
    navigate(`/${item.id}`);
    onClose();
  };

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse search history", error);
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-0 top-0 h-full w-[469px] bg-white dark:bg-black border-r border-gray-300 dark:border-[#383838] z-40 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } rounded-r-2xl shadow-xl pl-[72px]`}
    >
      <div className="flex flex-col h-full pt-6 pb-4">
        {/* Header */}
        <div className="px-6 pb-8">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 font-['Segoe_UI',_system-ui,_-apple-system,_sans-serif]">
            Search
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChangeText}
              className="w-full bg-[#EFEFEF] dark:bg-[#262626] text-black dark:text-white rounded-2xl py-2 pl-10 pr-10 focus:outline-none focus:ring-0 placeholder-gray-500 font-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-black dark:hover:text-white"
              >
                <div className="bg-gray-300 dark:bg-gray-500 rounded-full p-0.5">
                  <X size={10} className="text-white dark:text-black" />
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-0">
          <div className="flex justify-between items-center px-6 mb-4">
            <span className="text-base font-semibold text-black dark:text-white">
              Recent
            </span>
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm font-semibold text-[#85a1ff] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {searchQuery ? (
            <div className="flex flex-col">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-2"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-[#121212] animate-pulse" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-[#121212] rounded w-32 animate-pulse" />
                        <div className="h-3 bg-gray-200 dark:bg-[#121212] rounded w-24 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              ) : isEmpty(searchResult) ? (
                <div className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-400 text-sm">
                  No recent search
                </div>
              ) : (
                searchResult?.map((item) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleProfilePage(item);
                      }}
                      className="flex items-center justify-between px-6 py-2 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 dark:bg-[#121212]">
                          <img
                            src={item.url}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-black dark:text-white">
                            {item.breed}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          ) : null}

          {!searchQuery ? (
            <ul className="flex flex-col">
              {searchHistory.length === 0 ? (
                <div className="flex justify-center items-center h-40 text-gray-500 dark:text-gray-400 text-sm">
                  No recent search
                </div>
              ) : (
                searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors group"
                  >
                    <div
                      className="flex items-center gap-3 w-full"
                      onClick={() =>
                        typeof item === "object"
                          ? handleProfilePage(item)
                          : null
                      }
                    >
                      {/* Avatar for search item */}
                      <div className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-[#121212]">
                        {typeof item === "object" && item.url ? (
                          <img
                            src={item.url}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <SearchIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-black dark:text-white">
                          {typeof item === "object" ? item.name : item}
                        </span>
                        {typeof item === "object" && item.breed && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.breed}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item);
                      }}
                      className="text-gray-500 hover:text-black dark:hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
