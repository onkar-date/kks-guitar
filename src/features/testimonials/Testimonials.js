import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
import {
  fetchTestimonials,
  resetStatus,
  selectAllTestimonials,
  selectFetchTestimonialsError,
  selectFetchTestimonialsStatus,
} from "./testimonialSlice";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectAllTestimonials);
  const fetchTestimonialStatus = useSelector(selectFetchTestimonialsStatus);
  const fetchTestimonialError = useSelector(selectFetchTestimonialsError);

  useEffect(() => {
    if (fetchTestimonialStatus === ACTION_STATUS.idle) {
      dispatch(fetchTestimonials());
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, fetchTestimonialStatus]);

  return (
    <>
      <TestimonialCarousel testimonials={testimonials} />
    </>
  );
};

export default Testimonials;
