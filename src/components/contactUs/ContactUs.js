import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import GoogleMap from "../map/GoogleMap";
import { Card } from "react-bootstrap";
import "./contactUs.scss";
import { CONTACT_DETAILS } from "../../shared/constants/contactConstants";
function ContactUs() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-muted mb-3">Address</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-3">
          <Card className="h-100">
            <GoogleMap />
          </Card>
        </div>
        <div className="col-md-6 mt-3">
          <Card className="p-5 h-100">
            <div className="text-muted d-flex">
              <span className="d-flex align-items-center mr-3 pinIcon">
                <IoLocationSharp />
              </span>
              <span>{CONTACT_DETAILS.address}</span>
            </div>
            <div className="mt-4 text-muted d-flex">
              <span className="d-flex align-items-center mr-3 pinIcon">
                <IoCall />
              </span>
              <span>{CONTACT_DETAILS.mobile}</span>
            </div>
            <div className="mt-4 text-muted d-flex">
              <span className="d-flex align-items-center mr-3 pinIcon">
                <IoMail />
              </span>
              <span>{CONTACT_DETAILS.email}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
