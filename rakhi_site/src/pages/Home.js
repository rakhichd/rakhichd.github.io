import React from "react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    {
      title: "project 0",
      image: "/images/proj0/p2_close.jpeg",
      description: "Becoming Friends with Your Camera",
      link: "/project0",
    },
    {
      title: "project 1",
      image: "/images/proj1/a_sboku.jpg",
      description: "Images of the Russian Empire",
      link: "/project1",
    },
    {
      title: "project 2",
      image: "/images/proj2/self.jpg",
      description: "Fun with Filters and Frequencies",
      link: "/project2",
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
