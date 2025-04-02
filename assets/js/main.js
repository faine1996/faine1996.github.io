(function () {
  "use strict";
  console.log("✅ main.js is loaded!");

  // ✅ Scroll toggle: Add "scrolled" class to body and header
  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector("#header");
    if (!header) return;

    if (window.scrollY > 50) {
      body.classList.add("scrolled");
      header.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  // ✅ DOM Ready
  document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOMContentLoaded fired");

    const body = document.body;
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelectorAll(".navmenu ul li a");
    const resumeLinks = document.querySelectorAll(".resume-link");

    // ✅ Highlight current nav link
    let currentPage = window.location.href.split("/").pop() || "index.html";
    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      if (linkHref.endsWith(currentPage)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // ✅ Mobile nav toggle
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", () => {
        body.classList.toggle("mobile-nav-active");
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
      });
    }

    // ✅ Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          mobileNavToggleBtn.classList.remove("bi-x");
          mobileNavToggleBtn.classList.add("bi-list");
        }
      });
    });

    // ✅ Resume link confirmation
    resumeLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("🟢 Resume link clicked.");

        const confirmed = confirm("This will download my CV. Do you want to continue?");
        if (confirmed) {
          window.location.href = link.href;
        } else {
          console.log("❌ User cancelled download.");
        }
      });
    });

    // ✅ AOS (Animate on Scroll)
    if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  // ✅ Scroll-to-top button
  const scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 100);
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  window.addEventListener("scroll", toggleScrollTop);
  window.addEventListener("load", toggleScrollTop);

  // ✅ Typed.js
  const selectTyped = document.querySelector(".typed");
  if (selectTyped && typeof Typed !== "undefined") {
    const typed_strings = selectTyped.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // ✅ PureCounter
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  // ✅ Preloader
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // ✅ Swiper
  function initSwiper() {
    if (typeof Swiper !== "undefined") {
      document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
        const config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        new Swiper(swiperElement, config);
      });
    }
  }
  window.addEventListener("load", initSwiper);

  // ✅ GLightbox
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  // ✅ Isotope
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    if (typeof imagesLoaded !== "undefined" && typeof Isotope !== "undefined") {
      imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
        const initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });

        isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filterBtn) {
          filterBtn.addEventListener("click", function () {
            isotopeItem.querySelector(".isotope-filters .filter-active")?.classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({ filter: this.getAttribute("data-filter") });
            if (typeof AOS !== "undefined") AOS.refresh();
          });
        });
      });
    }
  });

  // ✅ Contact Form Handling
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const action = form.action;

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerHTML = "<p class='text-success'>Thanks for your message!</p>";
        form.reset();
      } else {
        status.innerHTML = "<p class='text-danger'>Oops! Something went wrong.</p>";
      }
    } catch (error) {
      status.innerHTML = "<p class='text-danger'>There was an error submitting the form.</p>";
    }
  });
}
})();