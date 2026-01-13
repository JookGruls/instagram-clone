import React, { useRef, useCallback, useState, useEffect } from "react";
import Stories from "./Stories";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { useInteraction } from "../context/InteractionContext";
import api from "../services/web-service";

const Feed = () => {
  const { posts, setPosts } = useInteraction();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const initialized = useRef(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const fetchAll = [
        api.getSearchImageCat({
          limit: 10,
          order: "RANDOM",
          has_breeds: 1,
        }),
        api.getSearchImageCat({
          limit: 10,
          mime_types: "jpg,png",
        }),
      ];
      const [ran, avatars] = await Promise.all(fetchAll);

      if (!ran.data || ran.data.length === 0) {
        setHasMore(false);
        return;
      }

      if (ran.data.length < 10) {
        setHasMore(false);
      }

      const newPosts = ran.data.map((item, idx) => {
        const hasMultipleImages = Math.random() < 0.3;
        const additionalImages = hasMultipleImages
          ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
              (_, i) => `https://cataas.com/cat?type=square&key=${item.id}-${i}`
            )
          : [];

        return {
          id: item.id || `cat_${Date.now()}_${idx}`,
          username: `cat_lover_${Math.floor(Math.random() * 1000)}`,
          avatar: avatars.data[idx]?.url,
          image: item.url,
          images: [item.url, ...additionalImages],
          likes: Math.floor(Math.random() * 1000) + 100,
          caption:
            item.breeds && item.breeds.length > 0
              ? item.breeds[0].description
              : "This is a beautiful cat! #cat #cute #love",
          comments: Math.floor(Math.random() * 50) + 5,
        };
      });

      setPosts((prev) => [...prev, ...newPosts]);
    } catch (err) {
      console.log("🚀 ~ Feed ~ err:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, setPosts]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadMore();
    }
  }, [loadMore]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div className="flex flex-col w-full max-w-[630px] items-center pt-3">
      <Stories />
      <div className="w-full mt-4 bg-white dark:bg-black">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostRef} key={post.id}>
                <Post {...post} />
              </div>
            );
          } else {
            return <Post key={post.id} {...post} />;
          }
        })}
        {loading && (
          <>
            {Array.from({ length: 2 }).map((_, i) => (
              <PostSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
