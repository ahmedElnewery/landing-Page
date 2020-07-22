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
//  auto create section 4  
const createSection = (number) => {
  let section = document.createElement("section");
  section.id = `section${number}`;
  section.dataset.nav = `section${number}`;
  let div = document.createElement("div");
  div.classList.add("landing__container");
  let heading = document.createElement("h2");
  heading.textContent = `Section ${number}`;
  let firstParagraph = document.createElement("p");
  firstParagraph.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod";
  let secParagraph = document.createElement("p");
  secParagraph.textContent =
    "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
  div.appendChild(heading);
  div.appendChild(firstParagraph);
  div.appendChild(secParagraph);
  section.appendChild(div);

  let main = document.getElementsByTagName("main");
  main[0].appendChild(section);
};

createSection(4);
let navbarList = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
/**
 * End Global Variables
 *
 *
 *
 * Start Helper Functions*/

// get active section while scroll

function getActiveSection() {
  let activeSection = sections[0];
  for (let section of sections) {
    if (window.pageYOffset >= section.offsetTop) activeSection = section;
  }
  return activeSection;
}
//smooth scroll while clicking on anchor
function clickHandler(e) {
  e.preventDefault();
  const sectionId = this.getAttribute("data-nav");
  const clickedSection = document.querySelector(`#${sectionId}`);
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

  sections.forEach((section, index) => {
    let navbarItem = document.createElement("li");
    let navbarLink = document.createElement("a");
    navbarLink.dataset.nav = `section${index + 1}`;
    navbarLink.classList.add("menu__link");
    navbarLink.textContent = "Section " + (index + 1);
    navbarItem.appendChild(navbarLink);
    fragment.appendChild(navbarItem);
  });

  navbarList.appendChild(fragment);
}

// Build menu
createNavItems();
// Add class 'active' to section when near top of viewport
const addActiveClasses = () => {
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
};

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

// hide navbar while scroll
let prevScroll = window.pageYOffset;
window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-52px";
  }
  prevScroll = currentScroll;
});
