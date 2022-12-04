import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  // Fetch Batches
  status: ACTION_STATUS.idle,
  batches: [],
  error: null,

  // Add Batch
  addBatchStatus: ACTION_STATUS.idle,
  addBatchError: null,

  // Delete Batch
  deleteBatchStatus: ACTION_STATUS.idle,
  deleteBatchError: null,

  // Edit Batch
  editBatchStatus: ACTION_STATUS.idle,
  editBatchError: null,
};

// Fetch Batch
export const fetchBatches = createAsyncThunk(
  "batches/fetchBatches",
  async () => {
    const batches = await axios.get(`${BASE_URL}/batch`);
    return batches.data;
  }
);

// Add Batch
export const addBatch = createAsyncThunk("batches/addBatch", async (batch) => {
  const response = await axios.post(`${BASE_URL}/batch`, batch);
  return response.data;
});

// Edit Batch
export const editBatch = createAsyncThunk(
  "batches/editBatch",
  async (batchData) => {
    const response = await axios.put(`${BASE_URL}/batch`, batchData);
    return response.data;
  }
);

// Delete Batch
export const deleteBatch = createAsyncThunk(
  "batches/deleteBatch",
  async (batchId) => {
    const response = await axios.delete(`${BASE_URL}/batch`, {
      params: {
        batchId,
      },
    });
    return response.body;
  }
);

export const batchSlice = createSlice({
  initialState,
  name: "Batches",
  reducers: {
    initStatus: (state) => {
      return {
        ...state,

        // Add Batch
        addBatchStatus: ACTION_STATUS.idle,
        addBatchError: null,

        // Delete Batch
        deleteBatchStatus: ACTION_STATUS.idle,
        deleteBatchError: null,

        // Edit Batch
        editBatchStatus: ACTION_STATUS.idle,
        editBatchError: null,
      };
    },
  },
  extraReducers(builder) {
    // Fetch Batches
    builder
      .addCase(fetchBatches.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.status = "success";
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Add Batch
    builder
      .addCase(addBatch.pending, (state) => {
        state.addBatchStatus = ACTION_STATUS.loading;
      })
      .addCase(addBatch.fulfilled, (state) => {
        state.addBatchStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(addBatch.rejected, (state, action) => {
        state.addBatchStatus = ACTION_STATUS.failed;
        state.addBatchError = action.error.message;
      });

    // Edit Batch
    builder
      .addCase(editBatch.pending, (state) => {
        state.editBatchStatus = ACTION_STATUS.loading;
      })
      .addCase(editBatch.fulfilled, (state) => {
        state.editBatchStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(editBatch.rejected, (state, action) => {
        state.editBatchStatus = ACTION_STATUS.failed;
        state.editBatchError = action.error.message;
      });

    // Delete Batch
    builder
      .addCase(deleteBatch.pending, (state) => {
        state.deleteBatchStatus = ACTION_STATUS.loading;
      })
      .addCase(deleteBatch.fulfilled, (state) => {
        state.deleteBatchStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(deleteBatch.rejected, (state, action) => {
        state.deleteBatchStatus = ACTION_STATUS.failed;
        state.deleteBatchError = action.error.message;
      });
  },
});

export const selectAllBatches = (state) => state.batchState.batches;
export const getFetchBatchesStatus = (state) => state.batchState.status;
export const getFetchBatchesError = (state) => state.batchState.error;
export const getAddBatchStatus = (state) => state.batchState.addBatchStatus;
export const getAddBatchError = (state) => state.batchState.editBatchError;
export const getEditBatchStatus = (state) => state.batchState.editBatchStatus;
export const getEditBatchError = (state) => state.batchState.addBatchError;
export const getDeleteBatchStatus = (state) =>
  state.batchState.deleteBatchStatus;
export const getDeleteBatchError = (state) => state.batchState.deleteBatchError;

export const { initStatus } = batchSlice.actions;
export default batchSlice.reducer;
