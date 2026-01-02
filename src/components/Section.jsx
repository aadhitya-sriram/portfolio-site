import React from "react";

const Section = React.forwardRef(function Section(
  { id, title, children },
  ref
) {
  return (
    <section id={id} ref={ref} className="section">
      {id !== "home" && <h2 className="sectionTitle">{title}</h2>}
      <div className="sectionBody">{children}</div>
    </section>
  );
});

export default Section;