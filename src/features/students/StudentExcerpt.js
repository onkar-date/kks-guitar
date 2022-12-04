import React from "react";

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
const StudentExcerpt = ({ student, editStudent, deleteStudent }) => {

  const emitStudentToDelete = (student) => {
    deleteStudent(student);
  }
  return (
    <tr>
      <td>{`${student.firstName} ${student.lastName}`}</td>
      <td>{student.batch.batchName}</td>
      <td>{new Date(student.joiningDate).toDateString()}</td>
      <td>{student.address}</td>
      <td>
        <div className="d-flex justify-content-between">
          <MdDelete className="cursorPointer text-danger" onClick={() => emitStudentToDelete(student)}/>
          <MdEdit
            className="cursorPointer text-primary"
            onClick={() => editStudent(student)}
          />
        </div>
      </td>
    </tr>
  );
};

export default StudentExcerpt;
