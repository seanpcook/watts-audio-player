import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText } from "@fortawesome/free-regular-svg-icons";
import "./TopicPage.css";

function TopicPage({ topic }) {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [overlayContent, setOverlayContent] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
//    console.log(`useEffect triggered for topic: ${topic}`);
    const fetchTopicData = async () => {
      try {
//        console.log(`Fetching data for topic: ${topic}`);
        const response = await fetch(`data/${topic.toLowerCase().replace(/\s+/g, "-").replace(/-&/g, "")}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
          throw new Error(`Invalid or missing data for topic: ${topic}`);
        }
        setTracks(data);
        setError(null);
      } catch (err) {
        setTracks([]);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    setTracks([]);
    setError(null);
    setOverlayContent(null);
    setCurrentlyPlaying(null);

    fetchTopicData();
  }, [topic]);

  function openOverlay(title, notes) {
    setOverlayContent({title, notes});
  };

  function closeOverlay() {
    setOverlayContent(null);
  };

  function handlePlay(audioElement) {
    if (currentlyPlaying && currentlyPlaying !== audioElement) {
      currentlyPlaying.pause(); 
    }
    setCurrentlyPlaying(audioElement); 
  };


  return (
    <div className="topic-page">
      <h1 className="header">{topic}</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : tracks.length === 0 ? (
        <p>No tracks available for this topic.</p>
      ) : (
        <div className="player-grid">
          {tracks.map((track, index) => (
            <div key={index} className="player-container">
              <img src={track.artwork} alt={`${track.title} artwork`} className="artwork" />
              <div className="metadata">
                <div className="metadata-content">
                <div className="text-container">
                    <h3 className="title">{track.title}</h3>
                    <p className="artist">{track.artist}</p>
                  </div>
                  {track.notes && (
                    <div>
                      <button
                        className="notes-icon"
                        onClick={() => openOverlay(track.title, track.notes)}
                        title="View Notes"
                      >
                        <FontAwesomeIcon icon={faFileText} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {track.notes?.quotes?.length > 0 && (
                <div className="marquee-container">
                  <div className="marquee">
                    <span className="quote">{track.notes.oneLineEncapsulation}</span>
                  </div>
                </div>
              )}
              <audio controls className="audio" onPlay={(e) => handlePlay(e.target)}>
                <source src={track.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}

      {overlayContent && (
        <div className="overlay">
          <button className="close-overlay" onClick={closeOverlay}>
              ×
          </button>
          <div className="overlay-content">
            <div className="overlay-header">
              <h2>Notes - {overlayContent.title}</h2>
            </div>
            <p><strong className="highlight">One-Line Encapsulation:</strong><br /><br /> {overlayContent.notes.oneLineEncapsulation}</p>
            <p><strong className="highlight">Background:</strong></p>
            <ul>
              {overlayContent.notes.background.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <p><strong className="highlight">School:</strong><br /><br /> {overlayContent.notes.school}</p>
            <p><strong className="highlight">Most Impactful Ideas:</strong></p>
            <ul>
              {overlayContent.notes.impactfulIdeas.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>
            <p><strong className="highlight">Primary Advice:</strong></p>
            <ul>
              {overlayContent.notes.primaryAdvice.map((advice, idx) => (
                <li key={idx}>{advice}</li>
              ))}
            </ul>
            <p><strong className="highlight">Works:</strong></p>
            <ul>
              {overlayContent.notes.works.map((work, idx) => (
                <li key={idx}>{work}</li>
              ))}
            </ul>
            <p><strong className="highlight">Quotes:</strong></p>
            <ul>
              {overlayContent.notes.quotes.map((quote, idx) => (
                <li key={idx}>"{quote}"</li>
              ))}
            </ul>
            <p><strong className="highlight">Application:</strong><br /><br /> {overlayContent.notes.application}</p>
            <p><strong className="highlight">Advice:</strong></p>
            <ul>
              {overlayContent.notes.advices.map((advice, idx) => (
                <li key={idx}>{advice}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicPage;