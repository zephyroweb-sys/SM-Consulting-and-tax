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
                
                // Number Counting Animation
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        const target = +counter.getAttribute('data-target');
                        const suffix = counter.getAttribute('data-suffix') || '';
                        const duration = 2000;
                        const frameRate = 16;
                        const increment = target / (duration / frameRate);
                        
                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current) + suffix;
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target + suffix;
                            }
                        };
                        updateCounter();
                    }
                });
                
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

        // Premium Scroll Progress
        const progressIndicator = document.querySelector('.scroll-progress-bar');
        if (progressIndicator) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledHeight = (winScroll / height) * 100;
            progressIndicator.style.width = scrolledHeight + "%";
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay && mobileMenuToggle && navLinks) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(navOverlay);
    }

    const setMenuOpen = (open) => {
        if (!navLinks || !mobileMenuToggle) return;
        const icon = mobileMenuToggle.querySelector('i');
        navLinks.classList.toggle('active', open);
        if (navOverlay) navOverlay.classList.toggle('is-active', open);
        if (header) header.classList.toggle('menu-open', open);
        document.body.classList.toggle('nav-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        mobileMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    };

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');

        navLinks.querySelectorAll('a').forEach((link, index) => {
            link.style.setProperty('--nav-idx', index);
        });

        mobileMenuToggle.addEventListener('click', () => {
            setMenuOpen(!navLinks.classList.contains('active'));
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => setMenuOpen(false));
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                setMenuOpen(false);
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
                setMenuOpen(false);
            }
        });
    }

    // Hero Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            // Move to next slide, loop back to 0 if at end
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }
    
    // Header Scroll Animation
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
