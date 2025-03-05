document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartCount = 3;
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
  
    function updateCart(count, total) {
      cartCountElement.textContent = count;
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  
    // Menu button functionality
    const menuButton = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
  
    menuButton.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  
    // Responsive navigation
    function handleResize() {
      if (window.innerWidth >= 768) {
        nav.style.display = 'flex';
      } else {
        nav.style.display = 'none';
      }
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
  
    // Hero image animation
    const heroImage = document.querySelector('.hero-image img');
    
    heroImage.addEventListener('mouseover', () => {
      heroImage.style.transform = 'rotate(0)';
    });
    
    heroImage.addEventListener('mouseout', () => {
      heroImage.style.transform = 'rotate(-12deg)';
    });
  
    // Category cards hover effect
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        img.style.transform = 'scale(1.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        img.style.transform = 'scale(1)';
      });
    });
  
    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-icons svg');
    
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.color = '#ff7a45';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.color = '';
      });
    });
  
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with: ${email}`);
      newsletterForm.reset();
    });
  
    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  
    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s, transform 0.5s';
      observer.observe(card);
    });
  
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });