import { useEffect, useState } from "react";
import { ProjectCard } from "./ui/ProjectCard";
import './styles/projects.css'

function usePageSize() {
  const [pageSize, setPageSize] = useState(4);
  useEffect(() => {
    function calculate() {
      const rows = Math.floor(window.innerHeight / 258);
      setPageSize(Math.max(rows * 2, 3));
    }
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);
  return pageSize;
}
export const projects = [
  {
    title: "AutoMeta",
    oneLiner:
      "Agentic AI system enabling non-programmatic analysis and simulation of constraint-based metabolic models.",
    bullets: [
      "Designed an agent-driven interface allowing researchers to query, simulate, and analyze metabolic models using natural language.",
      "Integrated COBRA-based flux balance analysis workflows with a ReAct-style reasoning loop for tool selection and execution.",
      "Built a FastAPI backend orchestrating model loading, simulation, and result interpretation with minimal user intervention."
    ],
    tags: [
      "Agentic AI",
      "LlamaIndex",
      "FastAPI",
      "CobraPy",
      "Scientific Computing"
    ],
    github: "https://github.com/NiravBhattLab/Agenti_AI_for_COBRA"
  },
  {
    title: "AnaBot",
    oneLiner:
      "Multimodal RAG system for anatomy education enabling natural language interaction with structured medical resources.",
    bullets: [
      "Developed a retrieval-augmented generation pipeline to answer anatomy queries using curated institutional resources.",
      "Implemented long-term conversational memory using LangGraph to support iterative clinical and educational queries.",
      "Built a React-based frontend to support structured exploration of anatomical concepts across undergraduate and postgraduate levels."
    ],
    tags: [
      "RAG",
      "LangGraph",
      "FAISS",
      "React",
      "Medical AI"
    ]
  },
  {
    title: "ResMate",
    oneLiner:
      "Local, privacy-preserving AI research assistant for academic literature analysis and data exploration.",
    bullets: [
      "Built an on-device agentic assistant orchestrating document summarization, semantic search, and tabular analysis workflows.",
      "Integrated a ReAct-style agent via Ollama to coordinate PDF processing, FAISS-based retrieval, Pandas-driven data analysis,",
      "dictionary lookup and controlled web search to streamline literature review without cloud dependency."
    ],
    tags: [
      "On-device AI",
      "LlamaIndex",
      "FAISS",
      "Ollama",
      "Research Tools"
    ],
    github: "https://github.com/aadhitya-sriram/AI-Research-Assistant"
  },
  {
    title: "Employee Database Management System",
    oneLiner:
      "File-based employee record management system implemented in C to explore low-level data handling and control flow.",
    bullets: [
      "Used text files as persistent storage to simulate a lightweight database without external dependencies.",
      "Implemented core operations including search, insertion, update, deletion, sorting, and record counting.",
      "Focused on structured programming, memory discipline, and robustness in data manipulation."
    ],
    tags: [
      "C Programming",
      "File Systems",
      "Data Structures",
      "Systems Programming"
    ]
  },
  {
    title: "Credential Management System",
    oneLiner:
      "Desktop-based credential manager emphasizing secure storage, encryption, and controlled access.",
    bullets: [
      "Designed a guided GUI using Tkinter for secure storage and retrieval of credentials.",
      "Implemented key-based encryption and binary file storage to protect sensitive data.",
      "Enabled efficient interaction through keyboard bindings and structured workflows."
    ],
    tags: [
      "Python",
      "Tkinter",
      "Encryption",
      "Desktop Applications",
      "Security Basics"
    ]
  },
  {
    title: "Automated Invoicing and Billing Framework",
    oneLiner:
      "Object-oriented desktop billing system designed for extensibility and transaction traceability.",
    bullets: [
      "Built a generalized billing application using OOP principles to model transactions and billing logic.",
      "Developed a Tkinter-based GUI to support end-user interaction and invoice generation.",
      "Generated structured transaction logs and printable billing statements for record keeping."
    ],
    tags: [
      "Python",
      "OOP",
      "Tkinter",
      "Software Design"
    ]
  },
  {
    title: "Contact Management System",
    oneLiner:
      "Desktop contact management application combining GUI design with persistent database storage.",
    bullets: [
      "Implemented a Tkinter-based interface for managing personal contact information.",
      "Integrated SQLite for persistent storage and efficient search, add, and delete operations.",
      "Focused on clean separation between interface logic and data access."
    ],
    tags: [
      "Python",
      "SQLite",
      "Tkinter",
      "Database Applications"
    ]
  },
  {
    title: "Expense Tracking Application",
    oneLiner:
      "Secure desktop application for tracking personal expenses with authentication and persistent storage.",
    bullets: [
      "Developed a PyQt5-based GUI with user authentication, password hashing, and input validation.",
      "Used MySQL for structured storage of user and transaction data.",
      "Presented expense records in tabular form to support review and basic financial analysis."
    ],
    tags: [
      "Python",
      "PyQt5",
      "MySQL",
      "Authentication",
      "Desktop Systems"
    ]
  },
  {
    title: "8-Bit Computing Machine",
    oneLiner:
      "From-scratch implementation of an 8-bit computer to understand instruction-level computation and hardware control flow.",
    bullets: [
      "Designed and integrated core components including clock circuitry, ALU, registers, RAM, instruction register, and program counter.",
      "Implemented a CPU capable of executing arithmetic operations via a shared bus architecture and control logic.",
      "Displayed computation results using a digital segmented display to validate end-to-end instruction execution."
    ],
    tags: [
      "Digital Electronics",
      "Computer Architecture",
      "ALU",
      "CPU Design",
      "Hardware Systems"
    ]
  }
];

export default function Projects() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("right");
  const PAGE_SIZE = usePageSize();
  const pageCount = Math.ceil(projects.length / PAGE_SIZE);

  const start = page * PAGE_SIZE;
  const visibleProjects = projects.slice(start, start + PAGE_SIZE);

  function next() {
    if (page < pageCount - 1) {
      setDirection("right");
      setPage((p) => p + 1);
    }
  }

  function prev() {
    if (page > 0) {
      setDirection("left");
      setPage((p) => p - 1);
    }
  }

  return (
    <div className="projectsSection">
      <div className={`stack slide-${direction}`} key={page}>
        {visibleProjects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      <div className="projectsPager">
        <button onClick={prev} disabled={page === 0}>
          &lt;
        </button>

        <span className="pagerIndicator">
          {page + 1} / {pageCount}
        </span>

        <button onClick={next} disabled={page === pageCount - 1}>
          &gt;
        </button>
      </div>
    </div>
  );
}