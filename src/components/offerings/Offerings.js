import React from "react";
import { Card } from "react-bootstrap";
import guitarClipImg from "../../images/IMG2.jpg";
import { COURSES } from "../../shared/constants/offeringsConstants";
import "./offerings.scss";
import courseBg from "../../images/courseBg.jpg";
const Offerings = () => {
  const style = {
    backgroundImage: `url(${courseBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mt-3">
          <h2 className="text-muted">Offerings</h2>
          {COURSES.map((course, i) => {
            return (
              <Card key={i} className="mt-2 shadow" style={style}>
                <Card.Body>{course.name}</Card.Body>
              </Card>
            );
          })}
        </div>
        <div className="col-md-6 mt-3 d-flex justify-content-center">
          <img
            src={guitarClipImg}
            alt="guitar Clip Image"
            className="img-fluid guitarClipImg"
          />
        </div>
      </div>
    </div>
  );
};

export default Offerings;
