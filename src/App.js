import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import TopicPage from "./TopicPage";
import "./App.css"; // Import external styles

function App() {
  const topics = [
    "Buddhism",
    "Comparative Philosophy",
    "Comparative Religion",
    "Early Radio Talks",
    "Eastern & Western Zen",
  ];

  return (
    <Router basename="/watts-audio-player">
      <div className="app">
        <nav className="navbar">
          {topics.map((topic) => (
            <NavLink
              key={topic}
              to={`/${topic.toLowerCase().replace(/\s+/g, "-")}`}
              className="nav-link"
              activeClassName="active-nav-link"
            >
              {topic}
            </NavLink>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/buddhism" />} />
          {topics.map((topic) => (
            <Route
              key={topic}
              path={`/${topic.toLowerCase().replace(/\s+/g, "-")}`}
              element={<TopicPage topic={topic} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;