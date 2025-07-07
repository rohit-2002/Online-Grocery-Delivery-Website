import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    if (!process.env.MAIL_TO) {
      console.error("MAIL_TO is missing in .env");
      return res
        .status(500)
        .json({ success: false, message: "Recipient email not defined" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Contact Form Submission",
      html: `
        <h2>Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
};
