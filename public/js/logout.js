document.getElementById('logout-button').addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage after logging out
    } else {
      alert('Failed to log out.');
    }
  });
  