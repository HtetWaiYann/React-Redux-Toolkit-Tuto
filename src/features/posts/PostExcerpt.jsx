import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";


const PostExcerpt = ({ postId  }) => {

  const post = useSelector(state => selectPostById(state, postId));
  return (
    <article>
      <h3>{post.title}</h3>
      <p className="postExcerpt">{post.body.substring(0, 75)}</p>
      <p className="postCredit">
        <Link to={`post/edit/${post.id}`}>Edit Post</Link>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userid={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
