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
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
