document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar-custom');
    var header = document.querySelector('.home-header');

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle('is-fixed', window.scrollY > navbar.offsetHeight);
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);
    updateNavbar();

    if (header) {
        var expandedHeight = header.offsetHeight;
        var collapsedHeight = 180;
        var collapseDistance = 400;

        function updateHeaderHeight() {
            var progress = Math.min(window.scrollY / collapseDistance, 1);
            var height = expandedHeight - (expandedHeight - collapsedHeight) * progress;
            header.style.height = height + 'px';
        }

        window.addEventListener('scroll', updateHeaderHeight, { passive: true });
        window.addEventListener('resize', function () {
            header.style.height = '';
            expandedHeight = header.offsetHeight;
            updateHeaderHeight();
        });

        updateHeaderHeight();
    }
});
