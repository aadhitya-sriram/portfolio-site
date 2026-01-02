import React from "react";
import Tag from "./Tag";

export function ProjectCard({
  title,
  oneLiner,
  bullets = [],
  tags = [],
  github,
  demo,
}) {
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 750, fontSize: 20, textShadow: '' }}>{title}</div>
          {/* <div style={{ opacity: 0.8, marginTop: 6, fontSize: 13 }}>{oneLiner}</div> */}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {github && (
            <a className="projects-linkBtn" href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {/* {demo && (<a className="linkBtn" href={demo} target="_blank" rel="noreferrer"> Demo </a> )} */}
        </div>
      </div>

      {bullets.length > 0 && (
        <p style={{marginTop: 10, opacity: 0.9, lineHeight: 1.6, fontSize: 15}}>
          {oneLiner + " " + bullets.join(" ")}
        </p>
      )}

      {tags.length > 0 && (
        <div style={{marginTop: 12 }}>
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      )}
    </div>
  );
}
