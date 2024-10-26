(() => {
    document.addEventListener("DOMContentLoaded", () => {
        // DOM Elements
        const scrollContainer = document.querySelector('[data-scroll-container]');
        const burger = document.getElementById('burger');
        const navLinks = document.querySelector('.nav-links');
        const images = document.querySelectorAll('.grid-item img');

        // Initialize Locomotive Scroll with Error Handling
        if (scrollContainer) {
            try {
                const scroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true,
                });
            } catch (error) {
                console.error("LocomotiveScroll initialization failed:", error);
            }
        }

        // Mobile Burger Menu Logic with Accessibility
        if (burger && navLinks) {
            burger.addEventListener('click', () => {
                const isActive = navLinks.classList.toggle('active');
                burger.setAttribute('aria-expanded', isActive);
            });
        }

        // Lazy Loading Images with IntersectionObserver & requestIdleCallback Fallback
        const lazyLoad = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && !img.src) {
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(lazyLoad, { threshold: 0.1 });

        images.forEach(img => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => observer.observe(img));
            } else {
                observer.observe(img);
            }
        });
    });
})();
