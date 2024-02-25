import React, { useRef, useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { MdArrowBack, MdMoreVert, MdNearMe, MdAccountCircle, MdComment } from 'react-icons/md';
import "./css/video.css"

function Videos({
  id,
  src,
  like,
  dislike,
  share,
  comment,
}) {
  // eslint-disable-next-line no-unused-vars
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          videoRef.current.play();
        } else {
          setPlaying(false);
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(videoRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(videoRef.current);
    };
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislikeClick = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const handleVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="video">
      <video
        id={id}
        className="video__player"
        autoPlay
        loop
        muted
        onClick={handleVideoPress}
        ref={videoRef}
        src={src}
      />

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            <MdArrowBack size={32} color="white" />
          </div>
          <div className="shortsVideoTopIcon">
            <MdMoreVert size={32} color="white" />
          </div>
        </div>
        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon" onClick={handleLikeClick}>
            <FaThumbsUp  size={22} color={liked ? "blue" : "white"} />
            <p>like</p>
          </div>
          <div className="shortsVideoSideIcon" onClick={handleDislikeClick}>
            <FaThumbsDown size={22} color={disliked ? "blue" : "white"} />
            <p>dislike</p>
          </div>
          <div className="shortsVideoSideIcon">
            <MdComment size={32} color="white" />
            <p>comment</p>
          </div>
          <div className="shortsVideoSideIcon">
            <MdNearMe size={32} color="white" />
            <p>share</p>
          </div>
        </div>
        <div className="shortsBottom">
          <div className="shortsDesc">
            <p>Video Discription or video Title Here</p>
          </div>
          <div className="shortDetails">
            <MdAccountCircle size={32} color="white"/>
            <p>channel Name</p>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
