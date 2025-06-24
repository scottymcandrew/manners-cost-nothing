// Add smooth reveal animations as user scrolls
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Add a subtle parallax effect to the hero section
    const hero = document.querySelector('.hero');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add hover effect to approach cards
    const cards = document.querySelectorAll('.approach-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#ffffff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Optional: Add a copy-to-clipboard feature for the good example
    const goodExample = document.querySelector('.example.good p');
    if (goodExample) {
        goodExample.style.cursor = 'pointer';
        goodExample.title = 'Click to copy this example';
        
        goodExample.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied to clipboard!';
                this.style.color = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }
});