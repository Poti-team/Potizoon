document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search');
    const overlay = document.getElementById('overlay');
    const backButton = document.getElementById('backButton');
    const overlaySearch = document.getElementById('overlaySearch');
    const iconeBussola = document.querySelector('.icone-bussola-container');

    searchInput.addEventListener('focus', () => {
        iconeBussola.style.display = 'none';
        overlay.style.display = 'flex';
        overlaySearch.focus();
    });

    backButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        iconeBussola.style.display = 'flex';
    });
});