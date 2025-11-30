// Frontend service to call backend contact API

const PRODUCTION_BACKEND = 'https://arun-backend-six.vercel.app';
const DEVELOPMENT_BACKEND = 'http://localhost:4000';

// Use production backend by default, fallback to development for local testing
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 
                    (window.location.hostname === 'localhost' ? DEVELOPMENT_BACKEND : PRODUCTION_BACKEND);

export async function submitContact(data) {
  try {
    console.log('Submitting to:', BACKEND_URL);
    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.message || 'Failed to submit contact');
    }

    return json; // { success, message, data, emailStatus }
  } catch (err) {
    throw err;
  }
}
