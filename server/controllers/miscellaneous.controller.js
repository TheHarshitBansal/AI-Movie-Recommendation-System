import sendEmail from "../config/nodemailer.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

export const contact = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
        res.status(400).json({ message: "Please enter all fields" });
    }
    await sendEmail({
        email: process.env.SMTP_USER,
        subject: `Contact Form Submission from ${firstName} ${lastName}`,
        message: `You have a new message from ${firstName} ${lastName} with email ${email}. The message is: ${message}`,
    });
    res.status(200).json({ message: "Message sent successfully" });
})