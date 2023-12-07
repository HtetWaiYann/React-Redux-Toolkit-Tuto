import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

import React from "react";

const PostAuthor = ({ userid }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userid);

  return <span>by {author ? author.name : "Unknown Auther"}</span>;
};

export default PostAuthor;
