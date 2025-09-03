import React from "react";
import { Link } from "react-router-dom";


export default function ProjectCard({ title, image, description, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      {link && (
        <Link to={link} className="project-link">
          view project
        </Link>
      )}
    </div>
  );
}
