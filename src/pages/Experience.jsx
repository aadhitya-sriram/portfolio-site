import { useState } from "react";
import { ExperienceCard } from "./ui/ExperienceCard";
import "./styles/experience.css";

export const experiences = [
  {
    org: "Apple India Private Limited",
    title: "Incoming SDE Intern",
    location: "India",
    period: "Jan 2026 – Jun 2026",
    oneLiner:
      "Selected for a highly competitive software and machine learning internship within Apple’s IS&T organization.",
    bullets: [
      "Chosen from a pool of 585 applicants through a selective multi-stage evaluation process.",
      "Will work within the IS&T department on software engineering and machine learning initiatives.",
      "Expected to contribute to production-grade systems with strong emphasis on scalability, reliability, and engineering rigor."
    ],
    tags: [
      "Software Engineering",
      "Machine Learning",
      "Systems",
      "Industry Internship"
    ],
    imageDir: "apple",
    imageCount: 1
  },
  {
    org: "Indian Institute of Technology Madras",
    title: "Research Intern",
    location: "Chennai, India",
    period: "May 2025 – Jul 2025",
    oneLiner:
      "Research internship focused on training domain-specific large language models and building agentic AI systems for scientific applications.",
    bullets: [
      "Worked on end-to-end development of large language models for mathematical domains, including dataset curation, hyperparameter tuning, model training, and benchmarking.",
      "Contributed to the design and implementation of an agentic AI system enabling natural language interaction with constraint-based metabolic models.",
      "Enabled biological researchers without programming expertise to run simulations and analyses through a conversational interface."
    ],
    tags: [
      "Large Language Models",
      "Agentic AI",
      "Scientific Computing",
      "Research"
    ],
    imageDir: "iitm",
    imageCount: 5
  },
  {
    org: "Sarvam AI",
    title: "AI Intern",
    location: "Chennai, India",
    period: "Jul 2024 – Nov 2024",
    oneLiner:
      "AI internship focused on speech systems, data pipelines, and tooling for large-scale model development.",
    bullets: [
      "Worked on Speech-to-Text and Text-to-Speech pipelines, including backend components for speech recognition and audio preprocessing.",
      "Developed a React-based application with a Flask backend to visualize and manage large training datasets, improving internal team workflows.",
      "Contributed to data collection and preprocessing pipelines, including text normalization, audio enhancement, database sanity checks, and corpus preparation for model training."
    ],
    tags: [
      "Speech AI",
      "STT / TTS",
      "Data Pipelines",
      "React",
      "Flask"
    ],
    imageDir: "sarvam",
    imageCount: 2
  },
  {
    org: "CloverBridge Technologies",
    title: "Full Stack Developer Intern",
    location: "India",
    period: "Apr 2024 – May 2024",
    oneLiner:
      "Full-stack development internship focused on feature implementation for a sports venue booking platform.",
    bullets: [
      "Worked on feature development for a full-stack web application enabling booking and management of sporting venues.",
      "Implemented admin features, venue customization, pop-up components, and full CRUD workflows.",
      "Collaborated closely with the development team using React.js, Django, and PostgreSQL to deliver production-ready features."
    ],
    tags: [
      "Full Stack Development",
      "React",
      "Django",
      "PostgreSQL",
      "Web Applications"
    ],
    imageDir: "cbridge",
    imageCount: 2
  }
];

export default function Experience() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const max = experiences.length - 1;

  function next() {
    if (index < max) {
      setDirection("right");
      setIndex((i) => i + 1);
    }
  }

  function prev() {
    if (index > 0) {
      setDirection("left");
      setIndex((i) => i - 1);
    }
  }

  return (
    <div className="experienceSection">
      <div className={`experienceStage slide-${direction}`} key={index}>
        <ExperienceCard {...experiences[index]} />
      </div>

      <div className="projectsPager">
        <button className="experienceNav left" onClick={prev} disabled={index === 0}>
          &lt;
        </button>
        <button className="experienceNav right" onClick={next} disabled={index === max}>
          &gt;
        </button>
      </div>

    </div>
  );
}
