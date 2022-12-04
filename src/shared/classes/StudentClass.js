export class StudentClass {
  constructor(id, firstName, lastName, batch, joiningDate, address) {
    this.id = id;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.batch = batch ? String(batch) : "";
    this.joiningDate = joiningDate || "";
    this.address = address || "";
  }
}
