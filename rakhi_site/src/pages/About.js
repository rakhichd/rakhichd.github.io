import React from "react";

export default function About() {
  return (
    <main className="about">
      <header className="about-hero">
        <h1 className="about-title">About</h1>
        {/* <p className="about-subtitle">Rakhi Chadalavada: Engineer</p> */}
      </header>

      <section className="about-content prose">
        <h2>Who I am</h2>
        <p>
          I am a senior at the University of California, Berkeley, studying Computer Science and Economics. I've had a variety of experiences in different domians, and I've learned I really enjoying developing new projects. 
        </p>

        <h2>What I do</h2>
        <p>
          I have worked on many backend projects, full-stack, and machine learning project through each of my experiences. I have previously worked at DoorDash, Bentley Systems, and USPS, along with a handful of startups. I also have particpated in many hackathons, in which I have won awards for my projects, one favorite was xAI's hackathon. 
        </p>

        <h2>Currently</h2>
        <ul>
          <li>Learning about designing algorithmic media</li>
          <li>Building Computer Vision Projects</li>
          <li>Exploring the intersection of software engineering and media</li>
          <li> Writing a research paper on the economics of Buy Now Pay Later</li>
        </ul>

        <h2>Beyond work</h2>
        <p>
          I love running, hiking, and playing basketball. I also enjoy reading and painting!
        </p>
      </section>

      <section className="about-links">
        <h3 className="section-heading">Links ↘</h3>
        <div className="links-list">
          <a className="text-link" href="https://github.com/rakhichd" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a className="text-link" href="https://www.linkedin.com/in/rakhi-c/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}