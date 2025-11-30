// Frontend service to call backend contact API

const DEFAULT_BACKEND = 'http://localhost:4000';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND;

export async function submitContact(data) {
  try {
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
