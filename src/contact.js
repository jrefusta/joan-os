import * as emailjs from "@emailjs/browser";
class Contact {
  constructor() {
    this.formContact = document.getElementById("form-contact");

    this.msg_success = document.getElementById("message_contact_success");
    this.msg_error = document.getElementById("message_contact_error");
  }

  submitEventListener = (event) => {
    event.preventDefault();
    const name = document.getElementById("form-name").value;
    const mail = document.getElementById("form-mail").value;
    const msg = document.getElementById("form-message").value;
    emailjs.init({
      publicKey: "N5dc30IL19RoqJaN6",
    });
    emailjs
      .send("Joan's Portfolio", "template_f0h9q7f", {
        from_name: name,
        email_id: mail,
        message: msg,
      })
      .then(
        (response) => {
          console.log("Mail sent successfully!", response);
          this.msg_success.style.display = "block";
        },
        (error) => {
          console.error("Error while sending mail:", error);
          this.msg_error.style.display = "block";
        }
      );
    this.formContact.reset();
  };
  activateEvents() {
    this.formContact.addEventListener("submit", this.submitEventListener);
  }

  deactivateEvents() {
    this.formContact.removeEventListener("submit", this.submitEventListener);
  }
}
export default Contact;
