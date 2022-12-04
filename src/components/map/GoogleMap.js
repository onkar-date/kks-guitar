import React from "react";
import ContactUs from "../contactUs/ContactUs";

const GoogleMap = () => {
  return (
    <div className="mapouter shadow-lg border h-100">
      <div className="gmap_canvas">
        <iframe
          className="h-100 gmap_iframe"
          width="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?&amp;hl=en&amp;q=kks guitar classes&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
      <style>
        {
          ".mapouter{position:relative;text-align:right;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:100%;}.gmap_iframe {height:100%!important;}"
        }
      </style>
    </div>
  );
};

export default GoogleMap;
