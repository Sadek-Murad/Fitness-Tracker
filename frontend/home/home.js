
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: 'GET',
    });

    if (response.ok) {
      window.location.href = '/'
    } else {
      console.error('Logout fehlgeschlagen.');
    
    }
  } catch (error) {
    console.error('Fehler beim Logout:', error);
    
  }
});


