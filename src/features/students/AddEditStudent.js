import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllBatches,
  getFetchBatchesStatus,
  getFetchBatchesError,
  fetchBatches,
} from "../batches/batchSlice";
import { StudentClass } from "../../shared/classes/StudentClass";
import { toast } from "react-toastify";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
function AddEditStudent({
  show,
  title,
  handleClose,
  studentToEdit,
  addEditStudent,
}) {
  const getInitialStudentData = (studentData) => {
    if (!studentData) return new StudentClass();
    return new StudentClass(
      studentData.id,
      studentData.firstName,
      studentData.lastName,
      studentData.batch.id,
      studentData.joiningDate,
      studentData.address
    );
  };
  const [student, setstudent] = useState(getInitialStudentData(studentToEdit));
  const dispatch = useDispatch();
  const batches = useSelector(selectAllBatches);
  const fetchBatchStatus = useSelector(getFetchBatchesStatus);
  const fetchBatchError = useSelector(getFetchBatchesError);
  useEffect(() => {
    if (fetchBatchStatus === ACTION_STATUS.idle) {
      dispatch(fetchBatches());
    }
  }, [fetchBatchStatus, dispatch]);

  const emitStudentData = () => {
    if (studentDataValid()) {
      const updatedStudentData = JSON.parse(JSON.stringify(student));
      updatedStudentData.batch = batches.find((batch) => {
        return String(batch.id) === String(updatedStudentData.batch);
      });
      addEditStudent(updatedStudentData);
    } else {
      toast.error("Please fill require fields");
    }
  };

  const handleChange = (event) => {
    setstudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const studentDataValid = () => {
    const invalidValue = [
      "firstName",
      "lastName",
      "batch",
      "joiningDate",
      "address",
    ].some((prop) => {
      return [null, undefined, ""].includes(student[prop]);
    });
    return invalidValue ? false : true;
  };
  return (
    <>
      <Modal
        animation={false}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="firstName" className="required">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                onChange={handleChange}
                value={student.firstName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="required">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                onChange={handleChange}
                value={student.lastName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="required">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                id="address"
                className="form-control"
                onChange={handleChange}
                value={student.address}
              />
            </div>

            {batches.length ? (
              <div className="form-group">
                <label htmlFor="batch" className="required">
                  Batch
                </label>
                <select
                  name="batch"
                  id="batch"
                  className="form-control"
                  onChange={handleChange}
                  defaultValue={student.batch}
                >
                  <option value={""}>-- Select Batch --</option>
                  {batches.map((batch) => {
                    return (
                      <option value={batch.id} key={batch.id}>
                        {batch.batchName}
                      </option>
                    );
                  })}
                </select>
                <div className="text-danger">
                  {fetchBatchError && "Failed to load batches"}
                </div>
              </div>
            ) : null}

            <div className="form-group">
              <label htmlFor="joiningDate" className="required">
                Joining Date
              </label>
              <input
                className="form-control"
                type="date"
                name="joiningDate"
                id="joiningDate"
                onChange={handleChange}
                value={student.joiningDate}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={emitStudentData}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEditStudent;
