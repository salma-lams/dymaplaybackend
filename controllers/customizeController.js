import Customize from "../models/Customize.js";
import { resend } from "../config/email.js";

export const createCustomizeRequest = async (req, res) => {
  try {
    const { name, email, template, hosting, budget, notes } = req.body;

    const newRequest = new Customize({
      name,
      email,
      template,
      hosting,
      budget,
      notes,
    });

    await newRequest.save();

    await resend.emails.send({
      from: "Dymaplay <onboarding@resend.dev>",
      to: ["salmalamsaaf26@gmail.com"],
      subject: "🎨 New Customize Request",
      html: `
        <h2>New Customize Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email || "N/A"}</p>
        <p><b>Template:</b> ${template}</p>
        <p><b>Hosting:</b> ${hosting}</p>
        <p><b>Budget:</b> $${budget}</p>
        <p><b>Notes:</b><br/>${notes || "None"}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Request saved and email sent",
    });
  } catch (error) {
    console.error("❌ Customize error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const listCustomizeRequests = async (_req, res) => {
  try {
    const items = await Customize.find().sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
