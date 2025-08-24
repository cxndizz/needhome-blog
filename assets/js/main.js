/**
 * main.js - ไฟล์ JavaScript หลักสำหรับอสังหาบล็อก
 * ประกอบด้วยฟังก์ชันพื้นฐานที่ใช้ในทุกหน้าของเว็บไซต์
 */

// รอให้ DOM โหลดเสร็จก่อนทำงาน
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Dark Mode Toggle (ถ้ามี)
  initDarkMode();
  
  // Newsletter Subscription
  initNewsletterForm();
  
  // Lazy Loading Images
  initLazyLoading();
  
  // Scroll to Top Button
  initScrollToTop();
});

/**
 * เริ่มต้นการทำงานของเมนูมือถือ
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // ปิดเมนูเมื่อคลิกที่พื้นที่อื่นนอกเมนู
    document.addEventListener('click', function(event) {
      if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

/**
 * เริ่มต้นการทำงานของ Dark Mode (ถ้ามี)
 */
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle) {
    // ตรวจสอบการตั้งค่า Dark Mode จาก localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // ตั้งค่าเริ่มต้น
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      darkModeToggle.classList.add('active');
    }
    
    // เปลี่ยน Dark Mode เมื่อคลิก
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      darkModeToggle.classList.toggle('active');
      
      // บันทึกการตั้งค่า
      const newDarkMode = document.documentElement.classList.contains('dark');
      localStorage.setItem('darkMode', newDarkMode);
    });
  }
}

/**
 * เริ่มต้นการทำงานของฟอร์มสมัครรับข่าวสาร
 */
function initNewsletterForm() {
  const newsletterForm = document.querySelector('form.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (validateEmail(email)) {
        // ในกรณีจริง ควรส่งข้อมูลไปยัง API
        showNotification('ขอบคุณสำหรับการสมัครรับข่าวสาร!', 'success');
        emailInput.value = '';
      } else {
        showNotification('กรุณาใส่อีเมลที่ถูกต้อง', 'error');
      }
    });
  }
}

/**
 * ตรวจสอบความถูกต้องของอีเมล
 * @param {string} email - อีเมลที่ต้องการตรวจสอบ
 * @return {boolean} ผลการตรวจสอบ
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * แสดงการแจ้งเตือน (notification)
 * @param {string} message - ข้อความที่ต้องการแสดง
 * @param {string} type - ประเภทของการแจ้งเตือน (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  // ตรวจสอบว่ามีการแจ้งเตือนอยู่แล้วหรือไม่
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // สร้าง element สำหรับการแจ้งเตือน
  const notification = document.createElement('div');
  notification.className = `notification notification-${type} fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50`;
  notification.textContent = message;
  
  // กำหนดสีตามประเภท
  switch(type) {
    case 'success':
      notification.style.backgroundColor = '#10B981';
      notification.style.color = '#FFFFFF';
      break;
    case 'error':
      notification.style.backgroundColor = '#EF4444';
      notification.style.color = '#FFFFFF';
      break;
    case 'warning':
      notification.style.backgroundColor = '#F59E0B';
      notification.style.color = '#FFFFFF';
      break;
    default:
      notification.style.backgroundColor = '#3B82F6';
      notification.style.color = '#FFFFFF';
  }
  
  // เพิ่มลงในหน้าเว็บ
  document.body.appendChild(notification);
  
  // ซ่อนหลังจาก 3 วินาที
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    
    // ลบออกจาก DOM หลังจากเฟดเอาท์
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

/**
 * เริ่มต้นการทำงานของ Lazy Loading สำหรับรูปภาพ
 */
function initLazyLoading() {
  // ตรวจสอบว่าเบราว์เซอร์รองรับ IntersectionObserver หรือไม่
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('lazy-load');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback สำหรับเบราว์เซอร์ที่ไม่รองรับ IntersectionObserver
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    lazyImages.forEach(img => {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.classList.remove('lazy-load');
      }
    });
  }
}

/**
 * เริ่มต้นการทำงานของปุ่มเลื่อนขึ้นด้านบน
 */
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // แสดงปุ่มเมื่อเลื่อนลงมา 300px
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('hidden');
        scrollToTopBtn.classList.add('flex');
      } else {
        scrollToTopBtn.classList.add('hidden');
        scrollToTopBtn.classList.remove('flex');
      }
    });
    
    // เลื่อนขึ้นด้านบนเมื่อคลิกปุ่ม
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * สลับการแสดงผลของ FAQ (Accordion)
 * @param {HTMLElement} element - ปุ่มที่ถูกคลิก
 */
function toggleFAQ(element) {
  // หากมีการใช้ FAQ ในหน้า
  if (element) {
    // รับ element เนื้อหา (div หลังปุ่ม)
    const content = element.nextElementSibling;
    
    // สลับการแสดงผล
    content.classList.toggle('hidden');
    
    // สลับทิศทางลูกศร
    const arrow = element.querySelector('svg');
    if (arrow) {
      arrow.classList.toggle('rotate-180');
    }
  }
}

/**
 * ฟิลเตอร์บทความตามแท็ก
 * @param {string} tag - แท็กที่ต้องการกรอง
 * @param {string} containerId - ID ของ container ที่เก็บบทความ
 */
function filterPostsByTag(tag, containerId = 'postsContainer') {
  const container = document.getElementById(containerId);
  
  if (container) {
    const posts = container.querySelectorAll('.post-item');
    
    posts.forEach(post => {
      if (tag === 'all') {
        post.classList.remove('hidden');
      } else {
        const postTags = post.dataset.tags ? post.dataset.tags.split(',') : [];
        
        if (postTags.includes(tag)) {
          post.classList.remove('hidden');
        } else {
          post.classList.add('hidden');
        }
      }
    });
    
    // อัปเดตสถานะปุ่มกรอง
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      if (btn.dataset.tag === tag) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300', 'hover:bg-gray-50');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300', 'hover:bg-gray-50');
      }
    });
  }
}