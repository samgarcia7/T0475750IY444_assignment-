
AOS.init({
    duration: 900,
    once: false,
});

const programsLink = document.querySelector('a[href="#programs"]');
programsLink.addEventListener('click', function(event) {
    event.preventDefault();
    const targetElement = document.getElementById('program-cards');

        const topPosition = targetElement.offsetTop - 150;

        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    });