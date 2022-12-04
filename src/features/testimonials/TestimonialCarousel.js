import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "./testimonial.scss";
import useWindowDimensions from "../../shared/helpers/useWindowsDimensions";
import testimonialBg from "../../images/testimonialBg.jpg";
import testimonialBg1 from "../../images/testimonialBg1.jpg";
import testimonialBg2 from "../../images/testimonialBg2.jpg";
import testimonialBg3 from "../../images/testimonialBg3.jpg";
import testimonialBg4 from "../../images/testimonialBg4.jpg";
import testimonialBg5 from "../../images/testimonialBg5.jpg";
const TestimonialCarousel = ({ testimonials }) => {
  const { width } = useWindowDimensions();
  const getNumberOfItemsPerGroup = () => {
    if (width > 1200) {
      return 3;
    } else if (width > 800) {
      return 2;
    } else {
      return 1;
    }
  };

  const testimonialStyle = {
    position: "absolute",
    backgroundImage: `url(${testimonialBg5})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    filter: "blur(1px)",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
  };

  const getTestimonialUI = () => {
    let data = [];
    let numberOfItemsPerGroup = getNumberOfItemsPerGroup();
    for (let i = 0; i < testimonials.length; i += numberOfItemsPerGroup) {
      data.push(
        <Carousel.Item
          key={`group-${i / numberOfItemsPerGroup}`}
          className="px-5 pb-5 pt-3"
          interval={1000000}
        >
          <div className="d-md-flex justify-content-around p-lg-5 pt-lg-0">
            {testimonials.slice(i, i + numberOfItemsPerGroup).map((_) => {
              return (
                <Card className="shadow testimonialCard" key={_.id}>
                  <Card.Body>
                    <div style={testimonialStyle}></div>
                    <Card.Text className="desc">{_.description}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Carousel.Item>
      );
    }
    return data;
  };

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="d-flex justify-content-center text-muted">
            From the students..
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Carousel>{getTestimonialUI()}</Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
