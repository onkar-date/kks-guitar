import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Batch from "../../shared/classes/Batch";
import { BATCH_TYPES } from "../../shared/constants/batchConstants";
export const AddEditBatch = ({
  title,
  batchToEdit,
  showModal,
  handleClose,
  addEditBatch,
}) => {
  const getInitialBatchData = () => {
    if (batchToEdit) {
      return new Batch(
        batchToEdit.id,
        batchToEdit.batchName,
        batchToEdit.batchType,
        batchToEdit.startTime,
        batchToEdit.endTime
      );
    } else {
      return new Batch();
    }
  };
  const [batchData, setBatchData] = useState(getInitialBatchData());
  const handleChange = (event) => {
    setBatchData({
      ...batchData,
      [event.target.name]: event.target.value,
    });
  };

  const emitBatchData = () => {
    if (formValid()) {
      addEditBatch(batchData);
    } else {
      toast.error("Please fill require fields");
    }
  };

  const formValid = () => {
    const invalidValue = Object.entries(batchData).find(([key, value]) => {
      if (key === "id") {
        return false;
      }
      return [null, undefined, ""].includes(value);
    });
    return invalidValue ? false : true;
  };

  return (
    <Modal
      animation={false}
      show={showModal}
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
            <label htmlFor="batchName" className="required">
              Batch Name
            </label>
            <input
              type="text"
              name="batchName"
              id="batchName"
              className="form-control"
              onChange={handleChange}
              value={batchData.batchName}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime" className="required">
              Start Time
            </label>
            <input
              type="text"
              name="startTime"
              id="startTime"
              className="form-control"
              onChange={handleChange}
              value={batchData.startTime}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime" className="required">
              End Time
            </label>
            <input
              type="text"
              name="endTime"
              id="endTime"
              className="form-control"
              onChange={handleChange}
              value={batchData.endTime}
            />
          </div>

          <div className="form-group">
            <label htmlFor="batchType" className="required">
              Batch Type
            </label>
            <select
              name="batchType"
              id="batchType"
              className="form-control"
              onChange={handleChange}
              defaultValue={batchData.batchType}
            >
              <option value={""}>-- Select Batch Type --</option>
              {BATCH_TYPES.map((batch) => {
                return (
                  <option value={batch} key={batch}>
                    {batch}
                  </option>
                );
              })}
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="joiningDate" className="required">
              Joining Date
            </label>
            <input
              className="form-control"
              type="date"
              name="joiningDate"
              id="joiningDate"
              onChange={handleChange}
              value={batchData.joiningDate}
            />
          </div> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={emitBatchData}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
