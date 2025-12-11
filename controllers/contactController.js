import transporter from "../config/email.js";

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px; background:#fafafa;">
          <h2 style="color:#4a90e2; margin-bottom:10px;">📩 New Contact Form Submission</h2>
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>💬 Message:</strong><br/>${message}</p>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
          <p style="font-size:12px; color:#999;">This email was sent from your website's contact form.</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "✅ Contact email sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, error: "Failed to send contact email" });
  }
};
