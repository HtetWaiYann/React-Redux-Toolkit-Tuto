import { useState } from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./features/components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postid" element={<SinglePostPage />} />
          <Route path="edit/:postid" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
