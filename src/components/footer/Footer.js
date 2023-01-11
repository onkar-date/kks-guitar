import React from "react";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { ATTRIBUTIONS } from "../../shared/constants/attributionConstants";
import { SOCIAL_CONSTANTS } from "../../shared/constants/socialConstants";
function Footer() {
  const goTo = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="footer bg-dark">
      <h4 className="text-center">Contact Me</h4>
      <div className="d-flex justify-content-around mt-4">
        <BsInstagram
          className="socialIcon"
          onClick={() => goTo(SOCIAL_CONSTANTS.instagram)}
        />
        <BsFacebook
          className="socialIcon"
          onClick={() => goTo(SOCIAL_CONSTANTS.facebook)}
        />
        <BsYoutube
          className="socialIcon"
          onClick={() => goTo(SOCIAL_CONSTANTS.youtube)}
        />
      </div>

      <div className="mt-5 d-flex">
        {ATTRIBUTIONS.map((att, i) => {
          return <div key={i} dangerouslySetInnerHTML={{ __html: att }}></div>;
        })}
      </div>
    </div>
  );
}

export default Footer;
