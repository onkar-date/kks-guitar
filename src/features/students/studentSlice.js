import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
import { UrlHelper } from "../../shared/helpers/urlHelper";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  status: ACTION_STATUS.idle,
  students: [],
  error: null,
  addStudentStatus: ACTION_STATUS.idle,
  addStudentError: null,
  editStudentStatus: ACTION_STATUS.idle,
  editStudentError: null,
  deleteStudentStatus: ACTION_STATUS.idle,
  deleteStudentError: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      UrlHelper.createUrl(BASE_URL, ["student"])
    );
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await axios.post(
      UrlHelper.createUrl(BASE_URL, ["student"]),
      student
    );
    return response.data;
  }
);

export const dispatchEditStudent = createAsyncThunk(
  "students/editStudent",
  async (student) => {
    const response = await axios.put(
      UrlHelper.createUrl(BASE_URL, ["student"]),
      student
    );
    return response.data;
  }
);

export const dispatchDeleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (student) => {
    const response = await axios.delete(
      `${BASE_URL}/student?id=${student.id}`,
      student
    );
    return response.data;
  }
);

export const studentSlice = createSlice({
  initialState,
  name: "students",
  reducers: {
    initState(state) {
      state = {
        ...state,
        addStudentStatus: ACTION_STATUS.idle,
        addStudentError: null,
        editStudentStatus: ACTION_STATUS.idle,
        editStudentError: null,
        deleteStudentStatus: ACTION_STATUS.idle,
        deleteStudentError: null,
      };
      return state;
    },
  },
  extraReducers(builder) {
    // Fetch Student
    builder
      .addCase(fetchStudents.pending, (state, action) => {
        state.status = ACTION_STATUS.loading;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.success;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = ACTION_STATUS.failed;
        state.error = action.error.message;
      });

    // Add Student
    builder
      .addCase(addStudent.pending, (state, action) => {
        state.addStudentStatus = ACTION_STATUS.loading;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.addStudentStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addStudentStatus = ACTION_STATUS.failed;
        state.addStudentError = action.error.message;
      });

    // Edit Student
    builder
      .addCase(dispatchEditStudent.pending, (state, action) => {
        state.editStudentStatus = ACTION_STATUS.loading;
      })
      .addCase(dispatchEditStudent.fulfilled, (state, action) => {
        state.editStudentStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(dispatchEditStudent.rejected, (state, action) => {
        state.editStudentStatus = ACTION_STATUS.failed;
        state.editStudentError = action.error.message;
      });

    // Delete Student
    builder
      .addCase(dispatchDeleteStudent.pending, (state, action) => {
        state.deleteStudentStatus = ACTION_STATUS.loading;
      })
      .addCase(dispatchDeleteStudent.fulfilled, (state, action) => {
        state.deleteStudentStatus = ACTION_STATUS.success;
        state.status = ACTION_STATUS.idle;
      })
      .addCase(dispatchDeleteStudent.rejected, (state, action) => {
        state.deleteStudentStatus = ACTION_STATUS.failed;
        state.deleteStudentError = action.error.message;
      });
  },
});

export const selectAllStudents = (state) => state.studentState.students;
export const getStudentsStatus = (state) => state.studentState.status;
export const getStudentsError = (state) => state.studentState.error;
export const getAddStudentStatus = (state) =>
  state.studentState.addStudentStatus;
export const getEditStudentStatus = (state) =>
  state.studentState.editStudentStatus;
export const getDeleteStudentStatus = (state) =>
  state.studentState.deleteStudentStatus;

export const { initState } = studentSlice.actions;
export default studentSlice.reducer;
