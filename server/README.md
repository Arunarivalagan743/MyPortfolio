# Portfolio Backend Service

Backend API service for portfolio contact form with Nodemailer integration.

## Features

- ✉️ Contact form handling with Nodemailer
- 🎨 Beautiful HTML email templates
- 📧 Admin notification emails
- ✅ User confirmation emails
- 🔒 CORS protection with whitelisted origins
- 🚀 Vercel-ready deployment

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
NODE_ENV=production
ADMIN_EMAIL=arunarivalagan774@gmail.com
FRONTEND_ORIGIN=http://localhost:5173,http://localhost:8080,https://arunoff774.vercel.app
EMAIL_USER=arunarivalagan774@gmail.com
EMAIL_PASS=your_app_password_here
APP_NAME=Arun's Portfolio
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## API Endpoints

### Health Check
- `GET /` - Server status
- `GET /api` - API information

### Contact Form
- `POST /api/contact` - Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We will get back to you soon."
}
```

## Deployment on Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all variables from `.env`

## Project Structure

```
server/
├── controllers/
│   └── contactController.js
├── routes/
│   └── contact.js
├── services/
│   └── emailService.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── vercel.json
```

## Gmail App Password Setup

For Gmail to work with Nodemailer:

1. Enable 2-Step Verification on your Google account
2. Go to Google Account → Security → App passwords
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

## Frontend Integration

Update your frontend `.env`:

```env
VITE_BACKEND_URL=https://arun-backend-six.vercel.app
```

Example frontend fetch:

```javascript
const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Inquiry',
    message: 'Hello!'
  }),
});

const data = await response.json();
console.log(data);
```

## License

MIT
