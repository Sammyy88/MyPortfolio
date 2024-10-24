// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
    
});

// Mobile Burger Menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".grid-item img");

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Load the image
                observer.unobserve(img);
                
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoad, {
        threshold: 0.1
    });

    images.forEach(img => {
        observer.observe(img);
    });
});


