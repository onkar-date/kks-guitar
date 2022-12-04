import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  dispatchEditStudent,
  selectAllStudents,
  getStudentsStatus,
  fetchStudents,
  getStudentsError,
  dispatchDeleteStudent,
  getDeleteStudentStatus,
  getEditStudentStatus,
  getAddStudentStatus,
  initState,
} from "./studentSlice";
import Button from "react-bootstrap/Button";
import AddEditstudent from "./AddEditStudent";
import { StudentClass } from "../../shared/classes/StudentClass";
import StudentExcerpt from "./StudentExcerpt";
import { toast } from "react-toastify";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
function StudentList() {
  const students = useSelector(selectAllStudents);
  const status = useSelector(getStudentsStatus);
  const deleteStudentStatus = useSelector(getDeleteStudentStatus);
  const editStudentStatus = useSelector(getEditStudentStatus);
  const addStudentStatus = useSelector(getAddStudentStatus);
  const error = useSelector(getStudentsError);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(new StudentClass());

  useEffect(() => {
    if (status === ACTION_STATUS.idle) {
      dispatch(fetchStudents());
    }
    return () => {
      dispatch(initState());
    };
  }, [status, dispatch]);

  useEffect(() => {
    if (deleteStudentStatus === ACTION_STATUS.success) {
      toast.info("Student Deleted");
    }
  }, [deleteStudentStatus]);

  useEffect(() => {
    if (addStudentStatus === ACTION_STATUS.success) {
      toast.success("Student Added");
    }
  }, [addStudentStatus]);

  useEffect(() => {
    if (editStudentStatus === ACTION_STATUS.success) {
      toast.info("Student Updated");
    }
  }, [editStudentStatus]);

  const editStudent = (student) => {
    setEditMode(true);
    setStudentToEdit(student);
    setShow(true);
  };

  const deleteStudent = (student) => {
    dispatch(dispatchDeleteStudent(student));
  };

  const getStudentData = () => {
    if (status === ACTION_STATUS.loading) {
      return (
        <tr>
          <td colSpan={4}>Loading...</td>
        </tr>
      );
    } else if (status === ACTION_STATUS.success) {
      if (students.length === 0) {
        return (
          <tr>
            <td colSpan={5}>
              <h3 className="text-muted text-center">
                No Students Data Found!!
              </h3>
            </td>
          </tr>
        );
      }
      return students.map((student) => (
        <StudentExcerpt
          student={student}
          editStudent={editStudent}
          deleteStudent={deleteStudent}
          key={student.id}
        />
      ));
    } else if (status === ACTION_STATUS.failed) {
      return (
        <tr className="text-danger">
          <td colSpan={5}>{error}</td>
        </tr>
      );
    }
  };

  const handleClose = () => {
    setEditMode(false);
    setStudentToEdit(new StudentClass());
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addEditStudent = (studentData) => {
    if (isEditMode) {
      dispatch(dispatchEditStudent(studentData));
    } else {
      dispatch(addStudent(studentData));
    }
    setEditMode(false);
    setStudentToEdit(new StudentClass());
    setShow(false);
  };

  return (
    <div className="container p-3">
      {show && (
        <AddEditstudent
          show={show}
          title={isEditMode ? "Edit Student" : "Add Student"}
          handleClose={handleClose}
          studentToEdit={studentToEdit}
          addEditStudent={addEditStudent}
        />
      )}
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4>Students</h4>
          <Button variant="primary" onClick={handleShow}>
            Add Student
          </Button>
        </div>

        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Joining Date</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>{getStudentData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
