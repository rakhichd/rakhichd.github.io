import React from "react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    {
      title: "Project 0",
      image: "/images/proj0/p1_close.jpeg",
      description: "Becoming Friends with Your Camera",
      link: "/project0",
    },
  ];

  return (
    
    <div 
    style={{ 
        padding: "2rem", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", backgroundColor: "#F7F7EF", minHeight: "100vh" 
        }}>
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
  );
}
