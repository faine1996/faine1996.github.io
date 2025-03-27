(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
  
    if (!selectHeader) return;
  
    if (window.scrollY > 50) {
      selectBody.classList.add('scrolled');
      selectHeader.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
      selectHeader.classList.remove('scrolled');
    }
  }
  
  // Apply function on page load and scroll
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);
  

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const header = document.querySelector('#header');
  
  if (mobileNavToggleBtn && header) {
    function mobileNavToggle() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
      header.classList.toggle('visible'); // Ensure header stays visible
    }
  
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }
  


  /**
   * Hide mobile nav on same-page/hash links
   */
  const navmenuLinks = document.querySelectorAll('#navmenu a');
  if (navmenuLinks.length > 0) {
    navmenuLinks.forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');
  if (navDropdownToggles.length > 0) {
    navDropdownToggles.forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        if (this.parentNode.nextElementSibling) {
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        }
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll to Top Button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } else {
    console.warn("Warning: .scroll-top button not found in the DOM.");
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== "undefined") {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  const skillsAnimation = document.querySelectorAll('.skills-animation');
  if (skillsAnimation.length > 0 && typeof Waypoint !== "undefined") {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Init Swiper Sliders
   */
  function initSwiper() {
    if (typeof Swiper !== "undefined") {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        new Swiper(swiperElement, config);
      });
    }
  }
  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    if (typeof imagesLoaded !== "undefined" && typeof Isotope !== "undefined") {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          });
        });
      });
    }
  });
  if (typeof document.addEventListener === "function") {
    document.addEventListener("DOMContentLoaded", function () {
        if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
            AOS.init({
                duration: 1000,  // Animation duration (ms)
                easing: "ease-in-out",  // Smooth animation
                once: true,  // Animation only happens once
                mirror: false  // No animation on scroll-up
            });
        }
    });
}
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') && 
        !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const header = document.querySelector('#header');
  const navMenu = document.querySelector('.navmenu');
  
  if (mobileNavToggleBtn && navMenu) {
      function mobileNavToggle() {
          document.body.classList.toggle('mobile-nav-active');
          mobileNavToggleBtn.classList.toggle('bi-list');
          mobileNavToggleBtn.classList.toggle('bi-x');
      }
  
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  
      // Close menu when clicking a link
      document.querySelectorAll('.navmenu a').forEach(link => {
          link.addEventListener('click', () => {
              if (document.body.classList.contains('mobile-nav-active')) {
                  mobileNavToggle();
              }
          });
      });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  const navmenuLinks = document.querySelectorAll('#navmenu a');
  if (navmenuLinks.length > 0) {
    navmenuLinks.forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');
  if (navDropdownToggles.length > 0) {
    navDropdownToggles.forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        if (this.parentNode.nextElementSibling) {
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        }
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll to Top Button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } else {
    console.warn("Warning: .scroll-top button not found in the DOM.");
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== "undefined") {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  const skillsAnimation = document.querySelectorAll('.skills-animation');
  if (skillsAnimation.length > 0 && typeof Waypoint !== "undefined") {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Init Swiper Sliders
   */
  function initSwiper() {
    if (typeof Swiper !== "undefined") {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        new Swiper(swiperElement, config);
      });
    }
  }
  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    if (typeof imagesLoaded !== "undefined" && typeof Isotope !== "undefined") {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          });
        });
      });
    }
  });
  if (typeof document.addEventListener === "function") {
    document.addEventListener("DOMContentLoaded", function () {
        if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
            AOS.init({
                duration: 1000,  // Animation duration (ms)
                easing: "ease-in-out",  // Smooth animation
                once: true,  // Animation only happens once
                mirror: false  // No animation on scroll-up
            });
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
  let resumeLink = document.getElementById("resume-link");

  if (resumeLink) {
    resumeLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior

      let confirmDownload = confirm("This will download my CV. Do you want to continue?");
      if (confirmDownload) {
        window.location.href = "Faine_Angel_Resume.pdf"; // Replace with actual CV path
      }
      // No removal of resume link
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Highlight the current nav link
  let fullUrl = window.location.href;
  let currentPage = fullUrl.substring(fullUrl.lastIndexOf("/") + 1);

  if (!currentPage || currentPage === "/" || currentPage.includes("localhost:3000")) {
    currentPage = "index.html";
  }

  let navLinks = document.querySelectorAll(".navmenu ul li a");

  navLinks.forEach(link => {
    let linkHref = link.getAttribute("href");
    console.log(`Checking: ${linkHref} === ${currentPage}`);
    if (linkHref.endsWith(currentPage)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Handle mobile nav toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const body = document.body;

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function () {
      body.classList.toggle('mobile-nav-active');
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToggleBtn.classList.remove('bi-list');
        mobileNavToggleBtn.classList.add('bi-x');
      } else {
        mobileNavToggleBtn.classList.remove('bi-x');
        mobileNavToggleBtn.classList.add('bi-list');
      }
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active');
          mobileNavToggleBtn.classList.remove('bi-x');
          mobileNavToggleBtn.classList.add('bi-list');
        }
      });
    });
  }
});


  let navLinks = document.querySelectorAll(".navmenu ul li a");

  navLinks.forEach(link => {
    let linkHref = link.getAttribute("href");

    // Debugging - Check values in console
    console.log(`Checking: ${linkHref} === ${currentPage}`);

    // Ensure exact match and apply active class
    if (linkHref.endsWith(currentPage)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

})();


