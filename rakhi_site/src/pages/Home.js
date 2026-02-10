import React from "react";
import ProjectCard from "../components/ProjectCard";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const projects = [
    {
      title: "Becoming Friends with Your Camera",
      image: "/images/proj0/p2_close.jpeg",
      link: "/project0",
    },
    {
      title: "Images of the Russian Empire",
      image: "/images/proj1/a_sboku.jpg",
      link: "/project1",
    },
    {
      title: "Fun with Filters and Frequencies",
      image: "/images/proj2/self.jpg",
      link: "/project2",
    },
    {
      title: "Stitching Photo Mosaics",
      image: "/images/proj3/finalKitchen.jpeg",
      link: "/project3",
    },
    {
      title: "Neural Radiance Field",
      image: "/images/proj4/renderLego1.png",
      link: "/project4",
    },
    {
      title: "Fun With Diffusion Models",
      image: "/images/proj5/man2.png",
      link: "/project5",
    },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-name">Rakhi Chadalavada</h1>
        <p className="hero-tagline">
          Selected works in software engineering, machine learning, and computer vision.
        </p>
        <div className="links-row">
          <a
            href="https://github.com/rakhichd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            aria-label="GitHub"
          >
            <FaGithub style={{ verticalAlign: "text-bottom" }} /> GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/rakhi-c/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin style={{ verticalAlign: "text-bottom" }} /> LinkedIn
          </a>
        </div>
      </section>

      {/* Selected Works */}
      <section className="works">
        <h2 className="section-heading">Selected Works ↘</h2>
        <div className="works-grid minimal-cards">
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
      </section>

      {/* Footer */}
      <footer className="site-footer">
        © {new Date().getFullYear()} Rakhi Chadalavada
      </footer>
    </div>
  );
}
