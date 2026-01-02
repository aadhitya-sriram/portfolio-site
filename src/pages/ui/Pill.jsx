export default function Pill({ label, href }) {
  const iconSrc = `/icons/${label.toLowerCase().replace(" ", "-")}.png`;

  return (
    <a
      href={href}
      className="pillIcon"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <img src={iconSrc} alt={label} />
    </a>
  );
}
