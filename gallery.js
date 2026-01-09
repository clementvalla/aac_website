/* Gallery Filtering for Art & Computation at RISD */

(function() {
    'use strict';

    const filterLinks = document.querySelectorAll('.filter-link');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterLinks.length === 0 || galleryItems.length === 0) {
        return; // No gallery to filter
    }

    // Set up click handlers for filter links
    filterLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const filter = link.getAttribute('data-filter');

            // Update active state on filter links
            filterLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            link.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(function(item) {
                const categories = item.getAttribute('data-category') || '';

                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (categories.indexOf(filter) !== -1) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

})();
