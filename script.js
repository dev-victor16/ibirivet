/* ============================================
   IBIRIVET - CLÍNICA VETERINÁRIA
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Header scroll behavior ----
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  // ---- Mobile Navigation ----
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  mobileToggle.addEventListener('click', () => {
    const isActive = mobileToggle.classList.contains('active');
    
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    document.body.style.overflow = isActive ? '' : 'hidden';
  });

  window.closeMobileNav = function() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  };


  // ---- Hero visibility ----
  const hero = document.querySelector('.hero');
  if (hero) {
    // Small delay for entrance animation
    setTimeout(() => {
      hero.classList.add('visible');
    }, 200);
  }


  // ---- WhatsApp float visibility ----
  const whatsappFloat = document.getElementById('whatsapp-float');
  
  function handleWhatsAppVisibility() {
    if (window.scrollY > 400) {
      whatsappFloat.classList.add('visible');
    } else {
      whatsappFloat.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleWhatsAppVisibility, { passive: true });


  // ---- Scroll reveal animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ---- Appointment button interaction ----
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const typeSelect = document.getElementById('search-type');
      const petSelect = document.getElementById('search-property');
      const locationSelect = document.getElementById('search-location');
      
      const typeText = typeSelect.options[typeSelect.selectedIndex]?.text || '';
      const petText = petSelect.options[petSelect.selectedIndex]?.text || '';
      const locText = locationSelect.options[locationSelect.selectedIndex]?.text || '';
      
      let message = 'Olá, equipe Ibirivet! Gostaria de informações para agendamento.';
      const details = [];
      if (typeSelect.value) details.push(`*Serviço:* ${typeText}`);
      if (petSelect.value) details.push(`*Pet:* ${petText}`);
      if (locationSelect.value) details.push(`*Preferência:* ${locText}`);
      
      if (details.length > 0) {
        message += '\n\n' + details.join('\n');
      }
      
      const whatsappUrl = `https://wa.me/5531987444024?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }


  // ---- Parallax-like subtle effect on hero image ----
  const heroBg = document.querySelector('.hero-bg img');
  let ticking = false;

  function handleParallax() {
    if (!heroBg) return;
    
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
      const translate = scrollY * 0.3;
      heroBg.style.transform = `scale(1) translateY(${translate}px)`;
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleParallax);
      ticking = true;
    }
  }, { passive: true });


  // ---- Counter animation for stats ----
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 1800;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * numericValue);
      
      let displayValue = currentValue.toString();
      if (hasPlus) displayValue = currentValue + '+';
      if (hasPercent) displayValue = currentValue + '%';
      
      element.textContent = displayValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }


  // ---- Image lazy loading enhancement ----
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    // Set initial opacity for fade-in effect
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
    }
  });

});
