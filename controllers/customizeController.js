// controllers/customizeController.js
import Customize from "../models/Customize.js";
import transporter from "../config/email.js";

// POST /api/customize
export const createCustomizeRequest = async (req, res) => {
  try {
    const { name, email, template, hosting, budget, notes } = req.body;

    // حفظ الطلب في MongoDB
    const newRequest = new Customize({ name, email, template, hosting, budget, notes });
    await newRequest.save();

    // إرسال الإيميل
    await transporter.sendMail({
      from: `"${name}" <${email || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🎨 New Customize Request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
          <h2 style="color:#4a90e2;">🎨 New Customize Request</h2>
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> ${email || "N/A"}</p>
          <p><strong>📋 Template:</strong> ${template}</p>
          <p><strong>🌐 Hosting:</strong> ${hosting}</p>
          <p><strong>💵 Budget:</strong> $${budget}</p>
          <p><strong>📝 Notes:</strong><br/>${notes || "None"}</p>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
          <p style="font-size:12px; color:#999;">This email was sent from your website's customize form.</p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Request saved and email sent successfully!",
      data: newRequest,
    });
  } catch (error) {
    console.error("❌ Error in customize request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/customize
export const listCustomizeRequests = async (_req, res) => {
  try {
    const items = await Customize.find().sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
