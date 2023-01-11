import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  // Fecth
  fetchYoutubeVideosStatus: ACTION_STATUS.idle,
  fetchYoutubeVideosError: null,
  youtubeVideos: [],

  // Add
  addYoutubeVideoStatus: ACTION_STATUS.idle,
  addYoutubeVideoError: null,

  // Update
  updateYoutubeVideoStatus: ACTION_STATUS.idle,
  updateYoutubeVideoError: null,

  // Delete
  deleteYoutubeVideoStatus: ACTION_STATUS.idle,
  deleteYoutubeVideoError: null,
};

// Fetch YoutubeVideos
export const fetchYoutubeVideos = createAsyncThunk(
  "youtubeVideo/fetchAll",
  async () => {
    // Mock
    const url = "https://run.mocky.io/v3/718b43c3-1bb5-468e-863f-6e0fd85798dd";
    // const url = `${BASE_URL}/youtube`;
    const response = await axios.get(url);
    return response.data;
  }
);

// Add YoutubeVideo
export const addYoutubeVideo = createAsyncThunk(
  "youtubeVideo/add",
  async (youtubeVideo) => {
    const response = await axios.post(`${BASE_URL}/youtube`, youtubeVideo);
    return response.data;
  }
);

// Edit YoutubeVideo
export const editYoutubeVideo = createAsyncThunk(
  "youtubeVideo/edit",
  async (youtubeVideo) => {
    const response = await axios.put(`${BASE_URL}/youtube`, youtubeVideo);
    return response.data;
  }
);

// Delete YoutubeVideo
export const deleteYoutubeVideo = createAsyncThunk(
  "youtubeVideo/delete",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/youtube/${id}`);
    return response.data;
  }
);

export const youtubeVideoSlice = createSlice({
  initialState,
  name: "youtubeVideo",
  reducers: {
    resetStatus(state) {
      return {
        ...state,
        // Add
        addYoutubeVideoStatus: ACTION_STATUS.idle,
        addYoutubeVideoError: null,

        // Update
        updateYoutubeVideoStatus: ACTION_STATUS.idle,
        updateYoutubeVideoError: null,

        // Delete
        deleteYoutubeVideoStatus: ACTION_STATUS.idle,
        deleteYoutubeVideoError: null,
      };
    },
  },
  extraReducers(builder) {
    // Fetch
    builder
      .addCase(fetchYoutubeVideos.pending, (state) => {
        state.fetchYoutubeVideosStatus = ACTION_STATUS.loading;
      })
      .addCase(fetchYoutubeVideos.fulfilled, (state, action) => {
        state.fetchYoutubeVideosStatus = ACTION_STATUS.success;
        state.youtubeVideos = action.payload;
      })
      .addCase(fetchYoutubeVideos.rejected, (state, action) => {
        state.fetchYoutubeVideosStatus = ACTION_STATUS.failed;
        state.fetchYoutubeVideosError = action.error.message;
      });

    // Add
    builder
      .addCase(addYoutubeVideo.pending, (state) => {
        state.addYoutubeVideoStatus = ACTION_STATUS.loading;
      })
      .addCase(addYoutubeVideo.fulfilled, (state) => {
        state.addYoutubeVideoStatus = ACTION_STATUS.success;
        state.fetchYoutubeVideosStatus = ACTION_STATUS.idle;
      })
      .addCase(addYoutubeVideo.rejected, (state, action) => {
        state.addYoutubeVideoStatus = ACTION_STATUS.failed;
        state.addYoutubeVideoError = action.error.message;
      });

    // Update
    builder
      .addCase(editYoutubeVideo.pending, (state) => {
        state.editYoutubeVideoStatus = ACTION_STATUS.loading;
      })
      .addCase(editYoutubeVideo.fulfilled, (state) => {
        state.editYoutubeVideoStatus = ACTION_STATUS.success;
        state.fetchYoutubeVideosStatus = ACTION_STATUS.idle;
      })
      .addCase(editYoutubeVideo.rejected, (state, action) => {
        state.editYoutubeVideoStatus = ACTION_STATUS.failed;
        state.editYoutubeVideoError = action.error.message;
      });

    // Delete
    builder
      .addCase(deleteYoutubeVideo.pending, (state) => {
        state.deleteYoutubeVideoStatus = ACTION_STATUS.loading;
      })
      .addCase(deleteYoutubeVideo.fulfilled, (state) => {
        state.deleteYoutubeVideoStatus = ACTION_STATUS.success;
        state.fetchYoutubeVideosStatus = ACTION_STATUS.idle;
      })
      .addCase(deleteYoutubeVideo.rejected, (state, action) => {
        state.deleteYoutubeVideoStatus = ACTION_STATUS.failed;
        state.deleteYoutubeVideoError = action.error.message;
      });
  },
});

export const selectAllYoutubeVideos = (state) =>
  state.youtubeVideoState.youtubeVideos;
export const selectFetchYoutubeVideosStatus = (state) =>
  state.youtubeVideoState.fetchYoutubeVideosStatus;
export const selectFetchYoutubeVideosError = (state) =>
  state.youtubeVideoState.fetchYoutubeVideoError;
export const selectAddYoutubeVideosStatus = (state) =>
  state.youtubeVideoState.addYoutubeVideoStatus;
export const selectAddYoutubeVideosError = (state) =>
  state.youtubeVideoState.addYoutubeVideoError;
export const selectEditYoutubeVideosStatus = (state) =>
  state.youtubeVideoState.editYoutubeVideoStatus;
export const selectEditYoutubeVideosError = (state) =>
  state.youtubeVideoState.editYoutubeVideoError;
export const selectDeleteYoutubeVideosStatus = (state) =>
  state.youtubeVideoState.deleteYoutubeVideoStatus;
export const selectDeleteYoutubeVideosError = (state) =>
  state.youtubeVideoState.deleteYoutubeVideoError;

export const { resetStatus } = youtubeVideoSlice.actions;

export default youtubeVideoSlice.reducer;
