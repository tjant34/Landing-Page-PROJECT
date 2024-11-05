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

/* Selects the ul element, this is where the navigation links will be added */
const navList = document.querySelector('#navbar__list');

/* Selects all the section elements to build out the nav menu */
const allSections = document.querySelectorAll('section');

/* Loops through each section to create the navigation items */
allSections.forEach(section => {
    const sectionName = section.getAttribute('data-nav'); /* Gets the section name from data-nav */
    const sectionId = section.getAttribute('id');         /* Gets the section's id */
    
    /* Creates an li element */
    const list = document.createElement('li');
    
    /* Creates an a element for the links */
    const a = document.createElement('a');
    a.textContent = sectionName;                          /* Sets the link text */
    a.href = `#${sectionId}`;                             /* Sets the href to the appropriate section id */
    a.classList.add('menu__link');                        /* Adds the styling class */

    list.appendChild(a);                                  /* Appends a to li */
    navList.appendChild(list);                            /* Appends li to ul */
});

function makeActive() {
    for (const section of allSections) {
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            /* Apply the active state on the current section */
            section.classList.add('your-active-class');
            /* Apply active state on corresponding nav link */
            document.querySelector(`a[href="#${section.id}"]`).classList.add('active');
        } else {
            /* Remove the active state from other sections */
            section.classList.remove('your-active-class');
            /* Remove active state from corresponding nav link */
            document.querySelector(`a[href="#${section.id}"]`).classList.remove('active');
        }
    }
}

/* Adds an event listener for the scroll funtion */
window.addEventListener('scroll', function () {
    makeActive();                                          /* Calls the make active function */
});

/* Smooth scrolls to the section when the link is clicked */
navList.addEventListener('click', function(event){
    if (event.target.tagName === 'A') {
        event.preventDefault();                            /* Prevents the default anchor behavior */
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
});