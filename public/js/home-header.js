document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.home-header');
    if (!header) {
        return;
    }

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
});
