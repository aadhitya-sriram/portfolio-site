import './../styles/contact.css'

export function ContactItem({ label, value, href }) {
  const isExternal = href?.startsWith("http");

  return (
    <div className="card">
      <div style={{ fontWeight: 750 }}>{label}</div>
      {href ? (
        <a
          className="linkBtn"
          style={{ marginTop: 10, display: "inline-flex" }}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {href.replace(/^mailto:/, "")}
        </a>
      ) : (
        <div style={{ opacity: 0.85, marginTop: 10 }}>{value}</div>
      )}
    </div>
  );
}
