document.addEventListener('DOMContentLoaded', () => {

    // ================= HERO SECTION ANIMATION =================
    const heroImage = document.querySelector('.hero-image');
    const heroName = document.querySelector('.hero-name');
    const heroRole = document.querySelector('.hero-role');
    const moreButtonContainer = document.querySelector('.more-button-container');

    // Add 'show-item' class with delays for staggered reveal
    setTimeout(() => heroImage.classList.add('show-item'), 200);
    setTimeout(() => heroName.classList.add('show-item'), 600);
    setTimeout(() => heroRole.classList.add('show-item'), 1000);
    setTimeout(() => moreButtonContainer.classList.add('show-item'), 1400);


    // ================= "MORE" BUTTON & NAV OVERLAY =================
    const moreButton = document.getElementById('moreButton');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav-item');

    moreButton.addEventListener('click', (event) => {
        navOverlay.classList.toggle('active');
        event.stopPropagation(); // Prevent document click from closing immediately
    });

    // Close nav overlay if clicked outside
    document.addEventListener('click', (event) => {
        if (!navOverlay.contains(event.target) && !moreButton.contains(event.target)) {
            navOverlay.classList.remove('active');
        }
    });

    // Close nav overlay when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navOverlay.classList.remove('active');
        });
    });


    // ================= CERTIFICATES & RESUME OVERLAY (Click/Touch) =================
    // This allows the overlay to appear on click/touch for mobile devices,
    // in addition to hover for desktops.
    const certItems = document.querySelectorAll('.cert-item');
    const resumeWrapper = document.querySelector('.resume-wrapper');

    function toggleOverlayActive(element) {
        element.classList.toggle('active');
    }

    certItems.forEach(item => {
        item.addEventListener('click', () => toggleOverlayActive(item));
        // Optional: Close others when one is opened (can be removed if not desired)
        item.addEventListener('click', () => {
            certItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
        });
    });

    if (resumeWrapper) {
        resumeWrapper.addEventListener('click', () => toggleOverlayActive(resumeWrapper));
    }


    // ================= EXPERIENCE TABS =================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const jobPanels = document.querySelectorAll('.job-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            jobPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetSelector = btn.getAttribute('data-target');
            const targetPanel = document.querySelector(targetSelector);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


    // ================= SCROLL-IN ANIMATIONS (Intersection Observer) =================
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.section.hidden'); // Select sections with 'hidden'
    hiddenElements.forEach(el => observer.observe(el));
});