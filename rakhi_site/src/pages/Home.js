import React from "react";
import ProjectCard from "../components/ProjectCard";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const projects = [
    {
      title: "Project 0",
      image: "/images/proj0/p2_close.jpeg",
      description: "Becoming Friends with Your Camera",
      link: "/project0",
    },
    {
      title: "Project 1",
      image: "/images/proj1/a_sboku.jpg",
      description: "Images of the Russian Empire",
      link: "/project1",
    },
    {
      title: "Project 2",
      image: "/images/proj2/self.jpg",
      description: "Fun with Filters and Frequencies",
      link: "/project2",
    },
    {
      title: "Project 3",
      image: "/images/proj3/finalKitchen.jpeg",
      description: "Stitching Photo Mosaics",
      link: "/project3",
    },
    {
      title: "Project 4",
      image: "/images/proj4/renderLego1.png",
      description: "Neural Radiance Field",
      link: "/project4",
    },
  ];

  const skills = [
    "Python", "Java", "Machine Learning", "C", "React", "Computer Vision"
  ];

  return (
    <div style={{ backgroundColor: "#F7F7EF", minHeight: "100vh", padding: "2rem" }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>Rakhi Chadalavada</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
        </p>
      </div>

      {/* Projects Section */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
        {projects.map((p, index) => (
          <ProjectCard
            key={index}
            title={p.title}
            image={p.image}
            description={p.description}
            link={p.link}
          />
        ))}
      </div>

      {/* Skills Section */}
      <div style={{ marginTop: "4rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem" }}>Skills & Technologies</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
          {skills.map((skill, index) => (
            <span className="skill-pill"
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                fontWeight: "500"
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="social-links"
        style={{
          marginTop: "4rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          fontSize: "2rem"
        }}
      >
        <a
          href="https://github.com/rakhichd"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", transition: "transform 0.2s" }}
          className="social-icon"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/rakhi-c/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0A66C2", transition: "transform 0.2s" }}
          className="social-icon"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "3rem", color: "#555" }}>
        <p>Made with ❤️ by Rakhi</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
