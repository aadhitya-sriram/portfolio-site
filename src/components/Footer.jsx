export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <span>© {new Date().getFullYear()} [Your Name]</span>
        <span style={styles.footerDot}>•</span>
        <span>Built with React</span>
      </div>
    </footer>
  );
}