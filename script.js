// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add animation classes to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.classList.add('slide-in');
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.container').prepend(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Progress bar animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('data-progress');
                const circle = progress.querySelector('.progress-bar');
                const offset = 283 - (283 * value) / 100;
                
                // Add animation
                circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                circle.style.strokeDashoffset = offset;
                
                // Remove observer after animation
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(progress => {
        // Set initial state
        const circle = progress.querySelector('.progress-bar');
        circle.style.strokeDashoffset = '283';
        
        // Start observing
        observer.observe(progress);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProgressBars();
});

// Reinitialize on navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            initializeProgressBars();
        }
    });
});


// Minimal direct send (no form binding)
(() => {
  const form = document.getElementById("connectForm");
  const btn  = document.getElementById("sendBtn");
  const box  = document.getElementById("formResponse");

  if (!form || !btn || !window.emailjs) return;

  btn.addEventListener("click", async () => {
    // quick sanity logs (you can remove later)
    console.log("EmailJS loaded?", !!window.emailjs);

    const name    = form.elements["name"]?.value || "";
    const email   = form.elements["email"]?.value || "";
    const message = form.elements["message"]?.value || "";

    if (!name || !email || !message) {
      if (box) box.textContent = "Please fill all fields.";
      return;
    }

    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    try {
      // send() uses explicit params instead of parsing the form
      await emailjs.send("service_vjx4ewm", "template_wqrhest", { name, email, message });
      form.reset();
      if (box) box.textContent = "✅ Message sent. Thank you!";
    } catch (err) {
      console.error("EmailJS error:", err);
      if (box) box.textContent = "❌ Failed to send. Check IDs/keys in EmailJS.";
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  });
})();
