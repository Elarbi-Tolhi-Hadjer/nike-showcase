 // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ===== COLOR MAPPING BASED ON IMAGE =====
    const colorConfig = {
      'red': {
        primary: '#d30000',
        primaryDark: '#a80000',
        secondary: '#000',
        accent: '#ffffff'
      },
      'yellow': {
        primary: '#ffcc00',
        primaryDark: '#e6b800',
        secondary: '#000',
        accent: '#ffffff'
      },
      'blue': {
        primary: '#0066cc',
        primaryDark: '#0052a3',
         secondary: '#000',
        accent: '#ffffff'
      }
    };

    // Function to update colors based on selected thumbnail
    function updateColors(colorKey) {
      const config = colorConfig[colorKey] || colorConfig.red;
      
      // Update CSS variables
      document.documentElement.style.setProperty('--primary', config.primary);
      document.documentElement.style.setProperty('--primary-dark', config.primaryDark);
      document.documentElement.style.setProperty('--secondary', config.secondary);
      
      // Update product info elements
      const productSubtitle = document.getElementById('productSubtitle');
      const saleBadge = document.getElementById('saleBadge');
      const addToCart = document.getElementById('addToCart');
      const wishlistBtn = document.getElementById('wishlistBtn');
      
      // Update text colors based on contrast
      if (config.secondary === '#ffffff') {
        productSubtitle.style.color = config.accent;
        saleBadge.style.backgroundColor = config.primary;
        saleBadge.style.color = config.accent;
        addToCart.style.backgroundColor = config.primary;
        addToCart.style.color = config.accent;
        wishlistBtn.style.color = config.accent;
      } else {
        productSubtitle.style.color = config.primary;
        saleBadge.style.backgroundColor = config.primary;
        saleBadge.style.color = config.accent;
        addToCart.style.backgroundColor = config.primary;
        addToCart.style.color = config.accent;
        wishlistBtn.style.color = config.secondary;
      }
      
      // Update gradient for product title
      const productTitle = document.querySelector('.product-title');
      productTitle.style.background = `linear-gradient(45deg, ${config.secondary}, ${config.primary})`;
      
      // Update hover effects
      const addtoCartHover = getComputedStyle(addToCart).getPropertyValue('--primary-dark');
      addToCart.style.setProperty('--primary-dark', config.primaryDark);
      
      // Update wishlist icon color
      const wishlistIcon = wishlistBtn.querySelector('i');
      if (wishlistIcon.classList.contains('fas')) {
        wishlistIcon.style.color = config.primary;
      } else {
        wishlistIcon.style.color = config.secondary;
      }
    }

    // ===== THUMBNAIL CLICK HANDLER =====
    document.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.getAttribute('data-src');
        document.getElementById('mainImage').src = src;
        // ===== UPDATE SIDE THUMBNAILS BASED ON MAIN THUMBNAIL =====
const sidesData = thumb.getAttribute('data-sides');
if (sidesData) {
  const sides = JSON.parse(sidesData);
  const sideThumbnails = document.querySelectorAll('.side-thumbnail img');
  
  sideThumbnails.forEach((img, index) => {
    if (sides[index]) {
      img.src = sides[index];
    }
  });

  // reset active state
  document.querySelectorAll('.side-thumbnail').forEach(t => t.classList.remove('active'));
  document.querySelector('.side-thumbnail').classList.add('active');
}

        // Get color configuration from data attributes
        const colorKey = thumb.getAttribute('data-color');
        const title = thumb.getAttribute('data-title');
        const description = thumb.getAttribute('data-description');
        const badgeText = thumb.getAttribute('data-badge');
        
        // Update product information
        document.getElementById('productSubtitle').textContent = title;
        document.getElementById('saleBadge').textContent = badgeText;
        
        // Update color scheme
        updateColors(colorKey);
        
        // Reset side thumbnails
        document.querySelectorAll('.side-thumbnail').forEach(t => t.classList.remove('active'));
        document.querySelector('.side-thumbnail').classList.add('active');
      });
    });

    // ===== SIDE THUMBNAIL CLICK HANDLER =====
   

    // ===== SIZE SELECTOR =====
    document.querySelectorAll('.size-option').forEach(size => {
      size.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(s => s.classList.remove('selected'));
        size.classList.add('selected');
      });
    });

    // ===== ADD TO CART =====
    document.querySelector('.add-to-cart').addEventListener('click', () => {
      const badge = document.querySelector('.cart-badge');
      let count = parseInt(badge.textContent) || 0;
      badge.textContent = count + 1;
      
      // Show toast notification
      showToast('Added to cart! 🎉');
    });

    // ===== WISHLIST BUTTON =====
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
      const icon = wishlistBtn.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        wishlistBtn.style.color = 'var(--primary)';
        showToast('Added to wishlist! ❤️');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        wishlistBtn.style.color = 'var(--gray)';
        showToast('Removed from wishlist!');
      }
    });

    // ===== TOAST NOTIFICATION =====
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // ===== ARROW NAVIGATION =====
    document.querySelector('.nav-btn:first-child').addEventListener('click', () => {
      const current = document.querySelector('.thumbnail.active');
      const prev = current.previousElementSibling || document.querySelector('.thumbnail:last-child');
      prev.click();
    });

    document.querySelector('.nav-btn:last-child').addEventListener('click', () => {
      const current = document.querySelector('.thumbnail.active');
      const next = current.nextElementSibling || document.querySelector('.thumbnail:first-child');
      next.click();
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        document.querySelector('.nav-btn:first-child').click();
      } else if (e.key === 'ArrowRight') {
        document.querySelector('.nav-btn:last-child').click();
      }
    });

    // ===== ACCORDION FUNCTIONALITY =====
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
      });
    });

    // ===== SCROLL ANIMATION REVEAL =====
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.product-info, .main-image, .thumbnails, .navigation-buttons, .details-accordion, .related-products').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });

    // Initialize with default colors
    document.addEventListener('DOMContentLoaded', () => {
      updateColors('red'); // Default color for first image
    });
  
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Récupérer le mode stocké
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️ Light Mode";
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      toggle.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      toggle.textContent = "🌙 Dark Mode";
    }
  });
  




const toast = document.getElementById('toast');
const addToCartBtn = document.getElementById('addToCart');

addToCartBtn.addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
});
// Sidebar Toggle
const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".fa-bars");
const closeBtn = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Optional: Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});
