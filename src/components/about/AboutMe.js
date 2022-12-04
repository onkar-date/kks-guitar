import React from "react";
import { ABOUT_ME } from "../../shared/constants/aboutMeConstants";
import "./about.scss";
import img1 from "../../images/IMG1.jpg";
const AboutMe = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={img1} alt="guitar_clip" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-12 mb-3">
              <h2 className="d-flex justify-content-center text-muted">
                About Me...
              </h2>
            </div>
            <div className="col-12">
              <p className="text-muted text-center">{ABOUT_ME.description}</p>
            </div>

            <div className="col-12 mt-3">
              <ul className="stats">
                <li className="statInfo">
                  <div className="font-weight-bold">
                    {ABOUT_ME.totalStudent}
                  </div>
                  <div className="text-muted">Students</div>
                </li>
                <li className="statInfo">
                  <div className="font-weight-bold">{ABOUT_ME.performance}</div>
                  <div className="text-muted">Performances</div>
                </li>
                <li className="statInfo">
                  <div className="font-weight-bold">
                    {ABOUT_ME.teachingYears} Years
                  </div>
                  <div className="text-muted">Teaching</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
