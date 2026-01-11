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
            I'm a final year student currently pursuing my Bachelor's in Computer Science 
            at Anna University (College of Engineering, Guindy Campus). My interests lie
            in research-driven problem solving and in designing and building systems with
            real-world application. I enjoy research as well as designing and building 
            applications, and I am particularly interested in working at the intersection 
            of academia, design, and real-world application. I am currently seeking 
            opportunities that allow me to deepen my technical foundations and continue 
            growing as a computer science practitioner.
          </p>
        </div>
      </div>
    </div>
  );
}