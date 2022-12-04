export default class Batch {
  constructor(id, batchName, batchType, startTime, endTime) {
    this.id = id || "";
    this.batchName = batchName || "";
    this.batchType = batchType || "";
    this.startTime = startTime || "";
    this.endTime = endTime || "";
  }
}
