import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
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
    <Router>
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
          {topics.map((topic) => (
            <Route
              key={topic}
              path={`/${topic.toLowerCase().replace(/\s+/g, "-")}`}
              element={<TopicPage topic={topic} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;