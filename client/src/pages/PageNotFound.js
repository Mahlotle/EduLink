import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  };

  const headingStyle = {
    fontSize: "3rem",
    color: "#343a40",
  };

  const subheadingStyle = {
    fontSize: "1.5rem",
    color: "#6c757d",
  };

  const linkStyle = {
    fontSize: "1.25rem",
    color: "#007bff",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Page Not Found</h1>
      <h3 style={subheadingStyle}>
        Oops! The page you're looking for doesn't exist.
      </h3>
      <h3 style={subheadingStyle}>
        Go back to the <Link to="/" style={linkStyle}>Home Page</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
