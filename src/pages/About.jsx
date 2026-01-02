import './styles/about.css'

export default function About() {
  return (
    <div className="aboutPage">
      <div className="aboutCard">
        <div className="aboutImage">
          <img src="/myself.png" alt="Portrait placeholder"/>
        </div>
        <div className="aboutText">
          <h2>About Me</h2>
          <p>
            I work at the intersection of computation, research, and applied
            systems design. My interests span artificial intelligence, scientific
            tooling, and building interfaces that make complex systems accessible.
            This space will eventually describe my academic background, research
            focus, and the kinds of problems I enjoy working on. For now, this
            serves as a structural placeholder for layout exploration.
            I value clarity, rigor, and systems thinking, and I approach both
            software and research with an emphasis on long-term usefulness rather
            than surface-level polish.
          </p>
        </div>
      </div>
    </div>
  );
}