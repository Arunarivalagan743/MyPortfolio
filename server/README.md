# Portfolio Backend API

Backend server for portfolio contact form with email notifications using Node.js, Express, MongoDB, and Nodemailer.

## Features

- ✅ Contact form submission with validation
- 📧 Dual email notifications (admin + user confirmation)
- 💾 MongoDB database storage
- 🔒 CORS security
- 📊 Contact message management API
- 🎨 Beautiful HTML email templates

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer
- dotenv

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the `.env` file is configured with your credentials (already set up)

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on **http://localhost:4000**

## API Endpoints

### Public Endpoints

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

### Admin Endpoints

#### Get All Contacts
```
GET /api/contact?status=new&limit=50&page=1
```

#### Get Contact by ID
```
GET /api/contact/:id
```

#### Update Contact Status
```
PATCH /api/contact/:id
Content-Type: application/json

{
  "status": "replied"
}
```

#### Delete Contact
```
DELETE /api/contact/:id
```

#### Get Statistics
```
GET /api/contact/stats
```

## Email Notifications

When a contact form is submitted:

1. **Admin Email** - You receive a notification with:
   - Contact person's name
   - Email address
   - Subject
   - Full message
   - Timestamp

2. **User Confirmation** - The person contacting receives:
   - Confirmation their message was received
   - Subject of their inquiry
   - Expected response time
   - Your contact information

## Environment Variables

```env
PORT=4000
ADMIN_EMAIL=arunarivalagan774@gmail.com
FRONTEND_ORIGIN=http://localhost:5173,http://localhost:8080,https://arunoff774.vercel.app/
APP_NAME=My Portfolio

EMAIL_USER=arunarivalagan774@gmail.com
EMAIL_PASS=xodh sxqq dzkg tkfy

MONGODB_URI=mongodb+srv://arunarivalagan774:arun_774@cluster0.szrfjd5.mongodb.net/
MONGODB_DB=portfolio

NODE_ENV=production
```

## Deployment to Vercel

1. Create a `vercel.json` file (already included)

2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel --prod
```

5. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all variables from `.env` file

## Database Schema

### Contact Model

```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  subject: String (required, max 200 chars),
  message: String (required, max 2000 chars),
  status: String (enum: 'new', 'read', 'replied'),
  ipAddress: String,
  userAgent: String,
  timestamps: true
}
```

## Security Features

- Input validation
- Email format validation
- CORS protection
- Request rate limiting (recommended to add)
- Sanitized error messages in production

## Testing

Test the API using curl:

```bash
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Email not sending
- Verify Gmail App Password is correct
- Check if "Less secure app access" is enabled (if using regular password)
- Use App Password instead of regular password

### MongoDB connection failed
- Check MongoDB URI and credentials
- Verify network access in MongoDB Atlas
- Ensure database name is correct

### CORS errors
- Add your frontend URL to FRONTEND_ORIGIN in .env
- Check if URL includes trailing slash

## Support

For issues or questions, contact: arunarivalagan774@gmail.com

## License

ISC
