/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let navbarList = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// get active section while scroll

function getActiveSection (){
  let activeSection = sections[0]
  for (let section of sections) {
    if (window.pageYOffset >= section.offsetTop)
     activeSection =  section
  }
  return activeSection
}
//smooth scroll while clicking on anchor 
function clickHandler(e) {
  e.preventDefault();
  const sectionId = this.getAttribute("href");
  const clickedSection = document.querySelector(sectionId);
  const offset = clickedSection.offsetTop;
  scrollTo({
    top: offset,
    behavior: "smooth",
  });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavItems() {
  let fragment = document.createDocumentFragment();
  for (let i = 1; i <= sections.length; i++) {
    let navbarItem = document.createElement("li");
    let navbarLink = document.createElement("a");
    navbarLink.href = `#section${i}`;
    navbarLink.dataset.nav = `section${i}`;
    navbarLink.classList.add("menu__link");
    navbarLink.textContent = "Section " + i;
    navbarItem.appendChild(navbarLink);
    fragment.appendChild(navbarItem);
  }

  navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function addActiveClasses() {
  let activeSection = getActiveSection();
  activeSection.classList.add("your-active-class");

  for (item of sections) {
    if (
      item.id !== activeSection.id &&
      item.classList.contains("your-active-class")
    ) {
      item.classList.remove("your-active-class");
    }
  }

  // add class active to menu links
  let activeNavLink = document.querySelector(
    `li a[data-nav= ${activeSection.id} ]`
  );
  activeNavLink.classList.add("active");
  let navLinks = document.querySelectorAll(".menu__link");
  for (const item of navLinks) {
    if (
      item.dataset.nav !== activeNavLink.dataset.nav &&
      item.classList.contains("active")
    ) {
      item.classList.remove("active");
    }
  }
}

// Scroll to anchor ID using scrollTO event
let navLinks = document.querySelectorAll(".menu__link");
for (const item of navLinks) {
  item.addEventListener("click", clickHandler);
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Set sections as active
window.addEventListener("scroll", addActiveClasses);
// Build menu
createNavItems();

// hide navbar while scroll
let prevScroll = window.pageYOffset;
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll ) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-52px";
  }
  prevScroll = currentScroll;
});
