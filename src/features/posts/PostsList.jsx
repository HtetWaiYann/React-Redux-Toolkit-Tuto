import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";

import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const orderedPostsId = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postsStatus === "succeeded") {

    content = orderedPostsId.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <div>{postsError}</div>;
  }

  // useEffect(() => {
  //   if (postsStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postsStatus]);

  return (
    <section>
      {content}
    </section>
  );
};

export default PostsList;
