import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBatch,
  deleteBatch,
  fetchBatches,
  getFetchBatchesError,
  getFetchBatchesStatus,
  selectAllBatches,
  getAddBatchStatus,
  getAddBatchError,
  getDeleteBatchStatus,
  getDeleteBatchError,
  initStatus,
  getEditBatchStatus,
  getEditBatchError,
  editBatch,
} from "./batchSlice";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AddEditBatch } from "./AddEditBatch";
function BatchList() {
  const dispatch = useDispatch();
  const batches = useSelector(selectAllBatches);
  const fetchBatchStatus = useSelector(getFetchBatchesStatus);
  const fetchBatchesError = useSelector(getFetchBatchesError);
  const addBatchStatus = useSelector(getAddBatchStatus);
  const addBatchError = useSelector(getAddBatchError);
  const editBatchStatus = useSelector(getEditBatchStatus);
  const editBatchError = useSelector(getEditBatchError);
  const deleteBatchError = useSelector(getDeleteBatchError);
  const deleteBatchStatus = useSelector(getDeleteBatchStatus);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [batchToEdit, setBatchToEdit] = useState(null);

  useEffect(() => {
    if (fetchBatchStatus === ACTION_STATUS.idle) {
      dispatch(fetchBatches());
    }
    return () => {
      dispatch(initStatus());
    };
  }, [fetchBatchStatus, dispatch]);

  useEffect(() => {
    if (addBatchStatus === ACTION_STATUS.success) {
      toast.success("Batch Added Succesfully!");
    } else if (addBatchStatus === ACTION_STATUS.failed) {
      toast.error(addBatchError);
    }
  }, [dispatch, addBatchStatus, addBatchError]);

  useEffect(() => {
    if (editBatchStatus === ACTION_STATUS.success) {
      toast.success("Batch Edited Succesfully!");
    } else if (editBatchStatus === ACTION_STATUS.failed) {
      toast.error(editBatchError);
    }
  }, [dispatch, editBatchStatus, editBatchError]);

  useEffect(() => {
    if (deleteBatchStatus === ACTION_STATUS.success) {
      toast.success("Batch Deleted Succesfully!");
    } else if (deleteBatchStatus === ACTION_STATUS.failed) {
      toast.error(deleteBatchError);
    }
  }, [dispatch, deleteBatchStatus, deleteBatchError]);

  const handleShow = (batch) => {
    setEditMode(batch ? true : false);
    setBatchToEdit(batch || null);
    setShowModal(true);
  };

  const handleClose = () => {
    setEditMode(false);
    setBatchToEdit(null);
    setShowModal(false);
  };

  const addEditBatch = (batchData) => {
    if (isEditMode) {
      dispatch(editBatch(batchData));
    } else {
      dispatch(addBatch(batchData));
    }
    setEditMode(false);
    setBatchToEdit(null);
    setShowModal(false);
  };

  const deleteBatchClicked = (batch) => {
    dispatch(deleteBatch(batch.id));
  };

  const getBatchesData = () => {
    if (fetchBatchStatus === ACTION_STATUS.loading) {
      return (
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      );
    } else if (fetchBatchStatus === ACTION_STATUS.failed) {
      return (
        <tr>
          <td colSpan={5} className="text-danger">
            {fetchBatchesError}
          </td>
        </tr>
      );
    } else if (fetchBatchStatus === ACTION_STATUS.success) {
      if (batches.length === 0) {
        return (
          <tr>
            <td colSpan={5}>
              <h3 className="text-muted text-center">No Batches Found!</h3>
            </td>
          </tr>
        );
      }
      return batches.map((batch) => {
        return (
          <tr key={batch.id}>
            <td>{batch.batchName}</td>
            <td>{batch.batchType}</td>
            <td>{batch.startTime}</td>
            <td>{batch.endTime}</td>
            <td>
              <div className="d-flex justify-content-around">
                <MdDelete
                  className="cursorPointer text-danger"
                  onClick={() => deleteBatchClicked(batch)}
                />
                <MdEdit
                  className="cursorPointer text-primary"
                  onClick={() => handleShow(batch)}
                />
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <div className="container p-3">
      {showModal && (
        <AddEditBatch
          showModal={showModal}
          title={isEditMode ? "Edit Batch" : "Add Batch"}
          handleClose={handleClose}
          batchToEdit={batchToEdit}
          addEditBatch={addEditBatch}
        />
      )}
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4>Batches</h4>
          <Button variant="primary" onClick={() => handleShow(null)}>
            Add Batch
          </Button>
        </div>

        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch Type</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>{getBatchesData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BatchList;
