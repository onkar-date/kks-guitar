import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";
import useWindowDimensions from "../../shared/helpers/useWindowsDimensions";
import {
  fetchYoutubeVideos,
  resetStatus,
  selectAllYoutubeVideos,
  selectFetchYoutubeVideosStatus,
} from "./youtubeSlice";

function YoutubeVideo() {
  const dispatch = useDispatch();
  const videos = useSelector(selectAllYoutubeVideos);
  const fetchVideosStatus = useSelector(selectFetchYoutubeVideosStatus);
  const { width } = useWindowDimensions();
  const getNumberOfItemsPerGroup = () => {
    if (width > 1200) {
      return 3;
    } else if (width > 900) {
      return 2;
    } else {
      return 1;
    }
  };
  useEffect(() => {
    if (fetchVideosStatus === ACTION_STATUS.idle) {
      dispatch(fetchYoutubeVideos());
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, fetchVideosStatus]);

  const getVideosCarousel = () => {
    let data = [];
    let numberOfItemsPerGroup = getNumberOfItemsPerGroup();
    for (let i = 0; i < videos.length; i += numberOfItemsPerGroup) {
      data.push(
        <Carousel.Item
          key={`group-${i / numberOfItemsPerGroup}`}
          className="px-5 pb-5 pt-3"
          interval={1000000}
        >
          <div className="d-md-flex justify-content-around p-lg-5">
            {videos.slice(i, i + numberOfItemsPerGroup).map((video) => {
              return (
                <div className="mb-3" key={video.id}>
                  <iframe
                    width={"100%"}
                    height={"250px"}
                    src={video.sourceUrl}
                    title={video.title}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
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
            Our Recent Videos...
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Carousel>{getVideosCarousel()}</Carousel>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mb-3">
          <h1 className="d-flex justify-content-center text-muted">
            Our Recent Videos...
          </h1>
        </div>
      </div>
      <div className="row mt-5">
        {videos.map((video) => {
          return (
            <div className="col-md-6 mb-3" key={video.id}>
              <iframe
                width={"100%"}
                height={"250px"}
                src={video.sourceUrl}
                title={video.title}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YoutubeVideo;
