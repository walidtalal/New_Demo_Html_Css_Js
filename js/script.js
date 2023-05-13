// Check If There's Local Storage Color Option
const mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove active class from all colors list items
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    // Add active class on element with data-color === local storage item
    if (ele.dataset.color === mainColor) {
      // Add active class
      ele.classList.add("active");
    }
  });
}

// random backgroung option
let backgroundOption = true;

// Variable to control the background interval
let backgroundInterval;

// Check If There's Local Storage background item
const backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class on Icon
const settingsBox = document.querySelector(".settings-box");
const settingsIcon = document.querySelector(".toggle-settings i");

settingsIcon.addEventListener("click", () => {
  settingsIcon.classList.toggle("fa-spin");
  settingsBox.classList.toggle("active");
});

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on All List items

colorsLi.forEach((li) => {
  // Clcik on every List items

  li.addEventListener("click", (e) => {
    e.target.dataset.color;
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch random backgrounds option
const randomBackgroundsEl = document.querySelectorAll(
  ".random-backgrounds span"
);

// Loop on All spans
randomBackgroundsEl.forEach((backgroundSpan) => {
  // Clcik on every span
  backgroundSpan.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select landing page element
const landingPage = document.querySelector(".landing-page");

// Get array of Imgs
const imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to randmize imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change background img url
      landingPage.style.backgroundImage =
        'Url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();

// Select skills
const ourSkills = document.querySelector(".skills");
window.addEventListener("scroll", function () {
  // Skills offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Hieght
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Skills Outer Hieght
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = this.document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// Create popup with the image
const ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function (e) {
    // Create overlay element
    const overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Append Overlay to the body
    document.body.appendChild(overlay);

    // Create Popup Box
    const popupBox = document.createElement("div");

    // Add class to Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Creeae heading
      const imgHeading = document.createElement("h3");

      // Create text to heading
      const imgText = document.createTextNode(img.alt);

      // Append text to heading
      imgHeading.appendChild(imgText);

      // Append heading to popup
      popupBox.appendChild(imgHeading);
    }

    // Create the image
    const popupImage = document.createElement("img");

    // Set image src
    popupImage.src = img.src;

    // Add image to popup Box
    popupBox.appendChild(popupImage);

    // Append Popup Box to the body
    document.body.appendChild(popupBox);

    // Create close span
    const closeButton = document.createElement("span");

    // Create the close button text
    const closeButtonText = document.createTextNode("X");

    // Append Text to close button
    closeButton.appendChild(closeButtonText);

    // Add class to close button
    closeButton.className = "close-button";

    // Append close button to popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove current popup
    e.target.parentNode.remove();

    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

/* Bullets and tooltip */

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

/* Bullets and tooltip */

// Select all links
const allLinks = document.querySelectorAll(".links a");

/* links and tooltips smooth scroll */

// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

function scrollToSmooth(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSmooth(allBullets);
scrollToSmooth(allLinks);

// Handel active state
function handleActive(ev) {
  // Remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  // add active class on self
  ev.target.classList.add("active");
}

const bulletsSpan = document.querySelectorAll(".bullets-option span");
const navBullets = document.querySelector(".nav-bullets");

const bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    navBullets.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button

const resetBtn = document.querySelector(".reset-options");
resetBtn.addEventListener("click", () => {
  // localStorage.clear()

  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload window
  window.location.reload();
});

// Toggle menu
const toggleBtn = document.querySelector(".toggle-menu");
const tLinks = document.querySelector(".links");

toggleBtn.addEventListener("click", function (e) {
  // Stop propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tLinks.classList.toggle("open");
});

tLinks.addEventListener("click", function (e) {
  e.stopPropagation();
});
// Click anywhere outside menu and toggle button
document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check if menu is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");

      tLinks.classList.toggle("open");
    }
  }
});
