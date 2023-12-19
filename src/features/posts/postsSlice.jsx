import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postid, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postid);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count+1
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userid);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("id not found. update error");
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();

        const posts = state.posts.filter((post) => post.id !== id);
        console.log(action.payload);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("id not found. update error");
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPosts",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);


export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`, initialPost);
      if (response.status === 200) {
        return initialPost;
      }
      return `${response.status}: ${response.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCounter = (state) => state.posts.count;

export const selectPostById = (state, postid) =>
  state.posts.posts.find((post) => post.id === postid);

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userid) => userid],
  (posts, userid) => posts.filter((post) => post.userId === userid)
)

export const { reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
