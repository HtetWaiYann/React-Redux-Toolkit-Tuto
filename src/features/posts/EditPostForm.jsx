import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";

const EditPostForm = () => {
  const { postid } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postid)));

  console.log(post);

  const dispatch = useDispatch();
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userid, setUserid] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [title, content, userid].every(Boolean) && addRequestStatus === "idle";

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserid(e.target.value);

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId: Number(userid),
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserid("");

        navigate(`/post/${post.id}`);
      } catch (err) {
        console.error("Failed to save post.", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title : </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author : </label>
        <select
          id="postAuthor"
          defaultValue={userid}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content : </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
