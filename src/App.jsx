import { useState } from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./features/components/Layout";
import { Routes, Route } from "react-router-dom";
import EditPostForm from "./features/posts/EditPostForm";

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
      </Route>
    </Routes>
  );
}

export default App;
