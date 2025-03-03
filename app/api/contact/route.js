import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Configure Nodemailer Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like SMTP, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER, // Set this in your .env.local file
        pass: process.env.EMAIL_PASS, // Set this in your .env.local file
      },
    });

    // Email Options
    let mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // Admin's email address
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return Response.json({ success: false, message: "Email sending failed." });
  }
}

