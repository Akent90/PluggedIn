document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Redirect to homepage or profile page after successful signup
        document.location.replace('/profile');
      } else {
        alert('Failed to sign up.');
      }
    }
  });
  