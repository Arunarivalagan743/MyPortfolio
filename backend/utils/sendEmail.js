import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or use host, port, secure for production SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to,
      subject,
    };

    // Add either text or html content depending on what's provided
    if (html) {
      mailOptions.html = html;
    } else {
      mailOptions.text = text || '';
    }

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

export default sendEmail;
