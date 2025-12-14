import { resend } from "../config/email.js";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Dymaplay <onboarding@resend.dev>",
      to: ["salmalamsaaf26@gmail.com"],
      subject: "📩 New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Contact email sent successfully",
    });
  } catch (error) {
    console.error("❌ Resend error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send contact email",
    });
  }
};
