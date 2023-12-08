import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postid } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postid)));

  if (!post) {
    return <div> Post Not Found.</div>;
  } else {
    return (
      <article>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor userid={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    );
  }
};

export default SinglePostPage;
