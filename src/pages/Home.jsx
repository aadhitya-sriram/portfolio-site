import Pill from './ui/Pill'
import './styles/home.css'

export default function Home() {
  return (
    <div className="hero">
      <div className="heroContent">
        <div className="hero-inner">
          <h1 className="heroName">
            Hi, I’m <span className="heroNameGrad">Aadhitya Sriram.</span>
          </h1>
          <h1 className="heroLine">
            I design and build computational systems for research, learning, and applied science.
          </h1>
        </div>

        <div className="heroActions">
          <div className="socialRow">
            <Pill label="GitHub" href="https://github.com/aadhitya-sriram" />
            <Pill label="LinkedIn" href="https://www.linkedin.com/in/aadhityasriram/" />
            <Pill label="Google Scholar" href="https://scholar.google.com/citations?user=zKFO_McAAAAJ&hl=en" />
            <Pill label="Gmail" href="mailto:aadhityasriram08@gmail.com" />
            <Pill label="LeetCode" href="https://leetcode.com/u/aadhitya08/" />
          </div>
          <a className="home-resumeBtn" href="/Aadhitya_Sriram_Resume.pdf" download>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}


// export default function Home() {
//   return (
//     <div className="hero">
//         <div className="hero-inner">
//           <h1 className="heroName">Hi, I’m <span className='heroNameGrad'>Aadhitya Sriram.</span></h1>
//           <h1 className="heroLine">I design and build computational systems for research, learning, and applied science.</h1>
//         </div>

//         <div className="heroActions">
//           <div className="socialRow">
//             <Pill label="GitHub" href="https://github.com/aadhitya-sriram" />
//             <Pill label="LinkedIn" href="https://www.linkedin.com/in/aadhityasriram/" />
//             <Pill label="Google Scholar" href="https://scholar.google.com/citations?user=zKFO_McAAAAJ&hl=en" />
//             <Pill label="Gmail" href="mailto:aadhityasriram08@gmail.com" />
//             <Pill label="LeetCode" href="https://leetcode.com/u/aadhitya08/" />
//           </div>
//           <a className="home-resumeBtn" href="/Aadhitya_Sriram_Resume.pdf" download>Download Resume</a>
//         </div>
//     </div>
//   );
// }
