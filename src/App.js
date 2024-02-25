import React, { useEffect, useState } from "react";
import "./App.css";
import Videos from "./components/videos";
import ytVideo from "./components/video";

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    setVideos(ytVideo);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        const currentVideo = document.getElementById(`video-${currentVideoIndex}`);
        if (currentVideo) {
          currentVideo.pause();
        }
        setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === "ArrowDown") {
        // Pause the currently playing video
        const currentVideo = document.getElementById(`video-${currentVideoIndex}`);
        if (currentVideo) {
          currentVideo.pause();
        }
        setCurrentVideoIndex((prevIndex) => Math.min(prevIndex + 1, videos.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentVideoIndex, videos]);

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map((video, index) => (
          <Videos
            key={video._id}
            id={`video-${index}`}
            src={video.url}
            autoPlay={index === currentVideoIndex}
            loop = {index === currentVideoIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
