import { createContext, useContext, useState } from "react";

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const toggleLike = (postId = "") => {
    if (!postId) return;
    const postIndex = likedPosts.findIndex((lp) => lp === postId);
    if (postIndex === -1) {
      return setLikedPosts([...likedPosts, postId]);
    }
    const newLike = likedPosts.filter((lp) => lp !== postId);
    return setLikedPosts(newLike);
  };

  const toggleSave = (postId) => {
    if (!postId) return;
    const postIndex = savedPosts.findIndex((sp) => sp === postId);
    if (postIndex === -1) {
      return setSavedPosts([...savedPosts, postId]);
    }
    const newSave = savedPosts.filter((sp) => sp !== postId);
    return setSavedPosts(newSave);
  };

  const isLiked = (postId) => likedPosts.includes(postId);
  const isSaved = (postId) => savedPosts.includes(postId);

  return (
    <InteractionContext.Provider
      value={{
        toggleLike,
        toggleSave,
        isLiked,
        isSaved,
        posts,
        setPosts,
        stories,
        setStories,
        suggestions,
        setSuggestions,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => {
  const context = useContext(InteractionContext);
  if (context === undefined) {
    throw new Error(
      "useInteraction must be used within an InteractionProvider"
    );
  }
  return context;
};
