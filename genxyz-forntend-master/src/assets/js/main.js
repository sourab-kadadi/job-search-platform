/*! main.js | Bulkit | CSS Ninja */

/* ==========================================================================
Core JS file
========================================================================== */

"use strict";

$(document).ready(function ($) {

	//2. Lazy loading
	const el = document.querySelectorAll('[data-lazy-load]');
    const observer = lozad(el, {
        loaded: function(el) {
            // Custom implementation on a loaded element
            el.parentNode.classList.add('loaded');
        }
	});
	
  observer.observe();

	//3. Change to demo content (if env)
	// if (env === 'development') {
	// 	changeDemoImages();
	// }

	//4. Init Feather icons
	// feather.replace();

	//5. Init Layout
	initNavbar();
	initLandingNavbar();
	initMobileMenu();
	initLandingMobileMenu();
	initEcommerceNavbar();
	initNavbarDropdown();
	initSidebar();
	initTiltCards();
})