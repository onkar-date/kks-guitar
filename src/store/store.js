import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice";
import batchReducer from "../features/batches/batchSlice";
import testimonialReducer from "../features/testimonials/testimonialSlice";
import youtubeVideosReducer from "../features/youtube/youtubeSlice";
import adminReducer from "../features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    studentState: studentReducer,
    batchState: batchReducer,
    testimonialState: testimonialReducer,
    youtubeVideoState: youtubeVideosReducer,
    adminState: adminReducer,
  },
});
