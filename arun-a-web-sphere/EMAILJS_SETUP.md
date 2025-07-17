# EmailJS Configuration Guide

## Current Setup (Working Solution)

The contact form now uses **ONE service and template** for both emails:

**Service:** `service_h1u7qh9`
**Template:** `template_1bstoy`

## How it works:

### Main Email (to you):
- Uses `emailjs.sendForm()` with the contact form data
- Sends to your email with the user's message
- You receive notification about new contact

### Auto-Reply Email (to the user):
- Uses `emailjs.send()` with custom data
- Sends professional auto-reply to user's email
- User receives confirmation that message was received
- Uses the same service and template but with different variables

## Template Variables:
Your `template_1bstoy` should support these variables:
- `{{from_name}}` - Sender name
- `{{user_name}}` - Your name  
- `{{user_email}}` - Email address (changes based on main/auto-reply)
- `{{subject}}` - Email subject
- `{{message}}` - Email content

## Current Credentials:
- Service ID: `service_h1u7qh9` (for both admin and auto-reply)
- Template ID: `template_1bstoy` (for both admin and auto-reply)  
- Public Key: `MXZ_zWBT8AEVEJIbr`

## What the user receives:
```
Subject: Auto-Reply: Thank you for contacting me, [User's Name]!

Hi [User's Name],

Thank you for reaching out! I've received your message about "[Original Subject]" and I really appreciate you taking the time to contact me.

I'll review your message and get back to you as soon as possible, usually within 24-48 hours.

In the meantime, feel free to:
🔗 Check out my projects on GitHub: https://github.com/Arunarivalagan743
💼 Connect with me on LinkedIn: https://linkedin.com/in/arunarivalagan743
🐦 Follow me on Twitter: https://twitter.com/arunarivalagan743

Looking forward to our conversation!

Best regards,
Arun A
Full Stack Developer
📧 arunarivalagan743@gmail.com
📱 +91 9944886743

---
Your Original Message:
Subject: [Original Subject]
Message: [Original Message]
```

## Features Working:
✅ Toast notifications with react-hot-toast
✅ Loading states with custom styling
✅ Success/error toast messages
✅ Auto-reply email to the user (using same template as admin)
✅ Dark theme toast styling
✅ Custom toast positioning and styling
✅ Professional auto-reply message
✅ Original message included in auto-reply

## Troubleshooting:
If auto-reply emails are not working:
1. Check your EmailJS service configuration
2. Ensure your email service allows sending to external emails
3. Check spam folder of the user's email
4. Verify the template variables in your EmailJS dashboard
5. Check browser console for any error messages

## Testing:
1. Fill out the contact form with your own email
2. Submit the form
3. Check if you receive both:
   - Notification email (as the site owner)
   - Auto-reply email (as the user who filled the form)
