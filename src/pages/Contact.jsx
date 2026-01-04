import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ContactItem } from "./ui/ContactItem";
import "./styles/contact.css";

export default function Contact() {
  const [state, handleSubmit] = useForm("xykyadpw");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) setShowSuccess(true);
  }, [state.succeeded]);

  const goBack = () => {
    setShowSuccess(false);
    formRef.current?.reset();
  };

  if (showSuccess) {
    return (
      <div className="contact-successWrapper">
        <div className="contact-success">
          <h3>Message sent.</h3>
          <p>I’ll get back to you shortly.</p>
          <button className="primaryBtn" style={{fontSize: '20px', marginTop: '2vh'}} onClick={goBack} type="button">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-grid">
      <div className="contact-card">
        <div className="contact-cardHeader">Get in touch</div>
        <div className="contactRow">
          <ContactItem label="Email" href="mailto:aadhityasriram08@gmail.com" />
          <ContactItem label="LinkedIn" href="https://linkedin.com/in/aadhityasriram" />
          <ContactItem label="GitHub" href="https://github.com/aadhitya-sriram" />
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-cardHeader">Message</div>

        <form ref={formRef} onSubmit={handleSubmit} className="form">
          <input name="name" className="input" placeholder="Name" required />
          <input name="email" type="email" className="input" placeholder="Email" required />
          <textarea name="message" className="textarea" placeholder="Message" rows={5} required />

          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button className="primaryBtn" type="submit" disabled={state.submitting}>
            {state.submitting ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}



// import { useForm, ValidationError } from "@formspree/react";
// import { ContactItem } from "./ui/ContactItem";
// import './styles/contact.css'

// export default function Contact() {
//   const [state, handleSubmit] = useForm("xykyadpw");
//   if (state.succeeded) {
//     return (
//       <div className="contact-successWrapper">
//         <div className="contact-success">
//           <h3>Message sent.</h3>
//           <p>I’ll get back to you shortly.</p>
//           <button onClick={() => {state.succeeded = false;}}>Go Back</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="contact-grid">
//       <div className="contact-card">
//         <div className="contact-cardHeader">Get in touch</div>
//         <div className="contactRow">
//           <ContactItem label="Email" href="mailto:aadhityasriram08@gmail.com" />
//           <ContactItem label="LinkedIn" href="https://linkedin.com/in/aadhityasriram" />
//           <ContactItem label="GitHub" href="https://github.com/aadhitya-sriram" />
//         </div>
//       </div>

//       <div className="contact-card">
//         <div className="contact-cardHeader">Message</div>
//         <form onSubmit={handleSubmit} className="form">
//           <input name="name" className="input" placeholder="Name" required />
//           <input name="email" type="email" className="input" placeholder="Email" required />
//           <textarea name="message" className="textarea" placeholder="Message" rows={5} required />
//           <ValidationError prefix="Email" field="email" errors={state.errors} />
//           <ValidationError prefix="Message" field="message" errors={state.errors} />
//           <button className="primaryBtn" type="submit" disabled={state.submitting}>
//             {state.submitting ? "Sending…" : "Send"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }