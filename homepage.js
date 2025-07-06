document.addEventListener('DOMContentLoaded', function() {

    // Initialize the AOS library
    AOS.init({
        duration: 900,
        once: false,
    });
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNav.classList.add('navbar-scrolled');
            } else {
                mainNav.classList.remove('navbar-scrolled');
            }
        });
    }

    // Programs link only for home page//
    const programsLink = document.querySelector('a[href="#programs"]');
    if (programsLink) {
        programsLink.addEventListener('click', function(event) {
            event.preventDefault();
            const targetElement = document.getElementById('program-cards');
            if (targetElement) {
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const topPosition = targetElement.offsetTop - navbarHeight - 20; // Added 20px of padding

                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

});