// Load sidebar HTML and set current page link
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');

    if (sidebarContainer) {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(html => {
                sidebarContainer.innerHTML = html;

                // Set the current page link
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const navLinks = sidebarContainer.querySelectorAll('.nav-desktop a');

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                        link.classList.add('current');
                    }
                });

                // Dispatch event to notify that sidebar is loaded
                window.dispatchEvent(new Event('sidebarLoaded'));
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
});
