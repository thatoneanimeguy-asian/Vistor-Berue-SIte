document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar-custom');

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle('is-fixed', window.scrollY > navbar.offsetHeight);
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);
    updateNavbar();
});
