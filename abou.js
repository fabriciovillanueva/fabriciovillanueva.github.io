document.querySelectorAll('.brand-img').forEach(img => {
    img.addEventListener('click', (event) => {
        const link = event.target.parentElement.getAttribute('href');
        if (link) {
            window.open(link, '_blank');
        }
    });
});
