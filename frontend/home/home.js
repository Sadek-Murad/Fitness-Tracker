function logout() {
    document.getElementById('logoutButton').addEventListener('click', function () {
        fetch('/logout', {
            method: 'GET',
        })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.error('Error:', error));
    });
}