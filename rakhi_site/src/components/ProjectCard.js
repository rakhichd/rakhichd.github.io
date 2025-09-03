import React from "react";

export default function ProjectCard({ title, image, description, link }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      )}
    </div>
  );
}
