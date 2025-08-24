/**
 * components.js - ไฟล์ JavaScript สำหรับโหลด components
 */

document.addEventListener('DOMContentLoaded', function() {
  // โหลด Navbar
  loadComponent('header', '/includes/navbar.html', function() {
    // หลังจากโหลด Navbar เสร็จ จะเรียกฟังก์ชัน
    highlightCurrentPage();
    initMobileMenu();
  });

  // โหลด Footer
  loadComponent('footer', '/includes/footer.html');
});

/**
 * โหลด component จาก URL แล้วแทรกลงใน element ที่ระบุ
 * @param {string} selector - CSS selector ของ element ที่จะแทรก component
 * @param {string} url - URL ของไฟล์ component
 * @param {function} callback - ฟังก์ชันที่จะเรียกหลังจากโหลดเสร็จ
 */
function loadComponent(selector, url, callback) {
  const element = document.querySelector(selector);
  if (!element) return;

  fetch(url)
    .then(response => response.text())
    .then(html => {
      element.innerHTML = html;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error(`Error loading component from ${url}:`, error);
    });
}

/**
 * ไฮไลท์เมนูปัจจุบันตาม URL
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // หน้าหลัก
    if (linkPath === '/' && currentPath === '/') {
      link.classList.add('text-blue-600');
      link.classList.remove('text-gray-600');
    }
    // หน้าอื่นๆ
    else if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
      link.classList.add('text-blue-600');
      link.classList.remove('text-gray-600');
    }
    
    // มือถือ
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(mLink => {
      const mLinkPath = mLink.getAttribute('href');
      if (mLinkPath === '/' && currentPath === '/') {
        mLink.classList.add('text-blue-600');
        mLink.classList.remove('text-gray-600');
      }
      else if (mLinkPath !== '/' && currentPath.startsWith(mLinkPath)) {
        mLink.classList.add('text-blue-600');
        mLink.classList.remove('text-gray-600');
      }
    });
  });
}

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