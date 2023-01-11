import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  // Fecth
  fetchTestimonialsStatus: ACTION_STATUS.idle,
  fetchTestimonialsError: null,
  testimonials: [],

  // Add
  addTestimonialStatus: ACTION_STATUS.idle,
  addTestimonialError: null,

  // Update
  updateTestimonialStatus: ACTION_STATUS.idle,
  updateTestimonialError: null,

  // Delete
  deleteTestimonialStatus: ACTION_STATUS.idle,
  deleteTestimonialError: null,
};

// Fetch Testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async () => {
    // Mock
    const url = "https://run.mocky.io/v3/35e90c4a-88cc-4c1c-a52b-8c60e2b7a788";
    // const url = `${BASE_URL}/testimonial`;
    const response = await axios.get(url);
    return response.data;
  }
);

// Add Testimonial
export const addTestimonial = createAsyncThunk(
  "testimonial/add",
  async (testimonial) => {
    const response = await axios.post(`${BASE_URL}/testimonial`, testimonial);
    return response.data;
  }
);

// Edit Testimonial
export const editTestimonial = createAsyncThunk(
  "testimonial/edit",
  async (testimonial) => {
    const response = await axios.put(`${BASE_URL}/testimonial`, testimonial);
    return response.data;
  }
);

// Delete Testimonial
export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/testimonial/${id}`);
    return response.data;
  }
);

export const testimonialSlice = createSlice({
  initialState,
  name: "testimonial",
  reducers: {
    resetStatus(state) {
      return {
        ...state,
        // Add
        addTestimonialStatus: ACTION_STATUS.idle,
        addTestimonialError: null,

        // Update
        updateTestimonialStatus: ACTION_STATUS.idle,
        updateTestimonialError: null,

        // Delete
        deleteTestimonialStatus: ACTION_STATUS.idle,
        deleteTestimonialError: null,
      };
    },
  },
  extraReducers(builder) {
    // Fetch
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.fetchTestimonialsStatus = ACTION_STATUS.loading;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.fetchTestimonialsStatus = ACTION_STATUS.success;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.fetchTestimonialsStatus = ACTION_STATUS.failed;
        state.fetchTestimonialsError = action.error.message;
      });

    // Add
    builder
      .addCase(addTestimonial.pending, (state) => {
        state.addTestimonialStatus = ACTION_STATUS.loading;
      })
      .addCase(addTestimonial.fulfilled, (state) => {
        state.addTestimonialStatus = ACTION_STATUS.success;
        state.fetchTestimonialsStatus = ACTION_STATUS.idle;
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.addTestimonialStatus = ACTION_STATUS.failed;
        state.addTestimonialError = action.error.message;
      });

    // Update
    builder
      .addCase(editTestimonial.pending, (state) => {
        state.editTestimonialStatus = ACTION_STATUS.loading;
      })
      .addCase(editTestimonial.fulfilled, (state) => {
        state.editTestimonialStatus = ACTION_STATUS.success;
        state.fetchTestimonialsStatus = ACTION_STATUS.idle;
      })
      .addCase(editTestimonial.rejected, (state, action) => {
        state.editTestimonialStatus = ACTION_STATUS.failed;
        state.editTestimonialError = action.error.message;
      });

    // Delete
    builder
      .addCase(deleteTestimonial.pending, (state) => {
        state.deleteTestimonialStatus = ACTION_STATUS.loading;
      })
      .addCase(deleteTestimonial.fulfilled, (state) => {
        state.deleteTestimonialStatus = ACTION_STATUS.success;
        state.fetchTestimonialsStatus = ACTION_STATUS.idle;
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.deleteTestimonialStatus = ACTION_STATUS.failed;
        state.deleteTestimonialError = action.error.message;
      });
  },
});

export const selectAllTestimonials = (state) =>
  state.testimonialState.testimonials;
export const selectFetchTestimonialsStatus = (state) =>
  state.testimonialState.fetchTestimonialsStatus;
export const selectFetchTestimonialsError = (state) =>
  state.testimonialState.fetchTestimonialError;
export const selectAddTestimonialsStatus = (state) =>
  state.testimonialState.addTestimonialStatus;
export const selectAddTestimonialsError = (state) =>
  state.testimonialState.addTestimonialError;
export const selectEditTestimonialsStatus = (state) =>
  state.testimonialState.editTestimonialStatus;
export const selectEditTestimonialsError = (state) =>
  state.testimonialState.editTestimonialError;
export const selectDeleteTestimonialsStatus = (state) =>
  state.testimonialState.deleteTestimonialStatus;
export const selectDeleteTestimonialsError = (state) =>
  state.testimonialState.deleteTestimonialError;

export const { resetStatus } = testimonialSlice.actions;

export default testimonialSlice.reducer;
