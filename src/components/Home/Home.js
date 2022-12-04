import React from "react";
import homeImgLg from "../../images/home4.jpg";
import homeImgSm from "../../images/homeSm.jpg";
import Testimonials from "../../features/testimonials/Testimonials";
import "./home.scss";
import AboutMe from "../about/AboutMe";
import YoutubeVideo from "../../features/youtube/YoutubeVideo";
import ContactUs from "../contactUs/ContactUs";
import Offerings from "../offerings/Offerings";
export const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="jumbotronWrapper">
              <h1 className="infoText">kk's Guitar Classes</h1>
              <picture>
                <source media="(max-width:998px)" srcSet={homeImgSm} />
                <img src={homeImgLg} className="homeImg" alt="home" />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <AboutMe />
      <Offerings />
      <Testimonials />
      <YoutubeVideo />
      <ContactUs />
    </>
  );
};
