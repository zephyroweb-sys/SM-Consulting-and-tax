document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.obs-fade-up, .obs-fade-in, .obs-scale-in');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Staggered Children delay calculation
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.obs-fade-up');
        children.forEach((child, index) => {
            child.style.setProperty('--stagger-idx', index);
        });
    });

    // Optional: Parallax for subtle bg effects on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Auto-close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
             link.addEventListener('click', () => {
                  navLinks.classList.remove('active');
                  const icon = mobileMenuToggle.querySelector('i');
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
             });
        });
    }

});
