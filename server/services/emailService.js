const nodemailer = require('nodemailer');

// Normalize and validate credentials from env
const EMAIL_USER = (process.env.EMAIL_USER || '').trim();
// Gmail App Password should be 16 chars, no spaces; strip spaces just in case
const EMAIL_PASS_RAW = (process.env.EMAIL_PASS || '').trim();
const EMAIL_PASS = EMAIL_PASS_RAW.replace(/\s+/g, '');

function validateEmailConfig() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS. Set valid Gmail App Password (16 chars, no spaces).');
  }
  if (EMAIL_PASS.length !== 16) {
    throw new Error(`Invalid EMAIL_PASS length ${EMAIL_PASS.length}. Gmail App Password must be 16 characters.`);
  }
}

validateEmailConfig();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Email configuration error:', error);
    console.log('📧 EMAIL_USER:', EMAIL_USER);
    console.log('📧 EMAIL_PASS length (sanitized):', EMAIL_PASS.length);
  } else {
    console.log('✅ Email service is ready to send messages');
  }
});

/**
 * Send email notification to admin when someone contacts
 */
const sendAdminNotification = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin:0; padding:0; color:#e5e7eb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Noto Sans',sans-serif; line-height:1.6; }
          .wrap { width:100%;  padding:24px 0; }
          .container { width:100%; max-width:600px; margin:0 auto; background:#0b1220; border:1px solid #1f2937; }
          .header { padding:16px 20px; border-bottom:1px solid #1f2937; background:#0b1220; display:flex; align-items:center; gap:12px; }
          .logo { width:32px; height:32px; }
          .title { margin:0; font-size:16px; letter-spacing:0.02em; color:#e5e7eb; font-weight:600; text-transform:uppercase; }
          .content { padding:20px; }
          .meta { display:block; font-size:12px; color:#9ca3af; margin-bottom:8px; }
          .row { margin:0 0 14px 0; }
          .label { font-size:12px; color:#9ca3af; margin:0 0 4px 0; }
          .value { font-size:14px; color:#e5e7eb; padding:10px 12px; border:1px solid #1f2937; }
          .message { font-size:14px; color:#e5e7eb; padding:12px; border:1px solid #1f2937; white-space:pre-wrap; }
          a { color:#60a5fa; text-decoration:none; }
          .footer { padding:14px 20px; border-top:1px solid #1f2937; font-size:12px; color:#9ca3af; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="container">
            <div class="header">
              <svg class="logo" width="32" height="32" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 150L60 30H120L145 150H120L110 110H70L60 150H35Z M80 85H100L90 50L80 85Z" stroke="#60a5fa" stroke-width="8" fill="none"/></svg>
              <h1 class="title">New Contact Message</h1>
            </div>
            <div class="content">
              <div class="row">
                <p class="label">From</p>
                <div class="value">${name}</div>
              </div>
              <div class="row">
                <p class="label">Email</p>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="row">
                <p class="label">Subject</p>
                <div class="value">${subject}</div>
              </div>
              <div class="row">
                <p class="label">Message</p>
                <div class="message">${message}</div>
              </div>
            </div>
            <div class="footer">
              <span class="meta">${process.env.APP_NAME}</span>
              <span class="meta">Received: ${new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Message

From: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}

${process.env.APP_NAME}
Received: ${new Date().toLocaleString()}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    throw error;
  }
};

/**
 * Send confirmation email to the person who contacted
 */
const sendUserConfirmation = async (contactData) => {
  const { name, email, subject } = contactData;

  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${EMAIL_USER}>`,
    to: email,
    subject: `We received your message - ${process.env.APP_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin:0; padding:0; color:#e5e7eb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Noto Sans',sans-serif; line-height:1.6; }
          .wrap { width:100%; padding:24px 0; }
          .container { width:100%; max-width:600px; margin:0 auto; background:#0b1220; border:1px solid #1f2937; }
          .header { padding:16px 20px; border-bottom:1px solid #1f2937; background:#0b1220; display:flex; align-items:center; gap:12px; }
          .logo { width:32px; height:32px; }
          .title { margin:0; font-size:16px; letter-spacing:0.02em; color:#e5e7eb; font-weight:600; text-transform:uppercase; }
          .content { padding:20px; }
          .lead { font-size:14px; color:#e5e7eb; margin:0 0 12px 0; }
          .note { font-size:12px; color:#9ca3af; margin:12px 0 0 0; }
          .subject { font-size:14px; color:#e5e7eb; padding:10px 12px; border:1px solid #1f2937; }
          a { color:#60a5fa; text-decoration:none; }
          .footer { padding:14px 20px; border-top:1px solid #1f2937; font-size:12px; color:#9ca3af; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="container">
            <div class="header">
              <svg class="logo" width="32" height="32" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 150L60 30H120L145 150H120L110 110H70L60 150H35Z M80 85H100L90 50L80 85Z" stroke="#60a5fa" stroke-width="8" fill="none"/></svg>
              <h1 class="title">We received your message</h1>
            </div>
            <div class="content">
              <p class="lead">Hello ${name},</p>
              <p class="lead">Thank you for contacting me. I have received your message about:</p>
              <div class="subject">${subject}</div>
              <p class="lead">I will review your note and reply as soon as possible, typically within 24–48 hours.</p>
              <p class="note">If this is time‑sensitive, you can also reach me at <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a>.</p>
            </div>
            <div class="footer">
              <span class="meta">${process.env.APP_NAME}</span>
              <span class="meta">Sent: ${new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${name},

Thank you for contacting me. I have received your message about: ${subject}
I will review your note and reply as soon as possible (usually within 24–48 hours).

For urgent matters: ${process.env.ADMIN_EMAIL}

${process.env.APP_NAME}
Sent: ${new Date().toLocaleString()}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ User confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending user confirmation:', error);
    throw error;
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  transporter
};
