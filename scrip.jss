// ==========================================
// Personal Portfolio Website - script.js
// Name: Kunusothu Srija
// Technology: Vanilla JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. Smooth Scrolling for Navigation Links
    // ==========================================

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            // Only handle links that point to a section
            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    // Close mobile menu after clicking a link
                    const nav = document.querySelector("nav");
                    if (nav) {
                        nav.classList.remove("active");
                    }
                }
            }
        });
    });


    // ==========================================
    // 2. "View My Projects" Button
    // ==========================================

    // Try to find the button using its text
    const buttons = document.querySelectorAll("button, a");

    buttons.forEach(function (button) {
        const buttonText = button.textContent.trim().toLowerCase();

        if (buttonText.includes("view my projects")) {
            button.addEventListener("click", function (event) {
                const projectsSection = document.querySelector("#projects");

                if (projectsSection) {
                    event.preventDefault();

                    projectsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
    });


    // ==========================================
    // 3. Mobile Navigation Menu
    // ==========================================

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");

    if (header && nav) {

        // Create menu button only if one does not already exist
        let menuButton = document.querySelector(".menu-toggle");

        if (!menuButton) {
            menuButton = document.createElement("button");

            menuButton.className = "menu-toggle";
            menuButton.innerHTML = "☰";
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.setAttribute("aria-expanded", "false");

            // Add basic styling through JavaScript
            menuButton.style.display = "none";
            menuButton.style.cursor = "pointer";
            menuButton.style.fontSize = "24px";
            menuButton.style.background = "none";
            menuButton.style.border = "none";

            header.appendChild(menuButton);
        }

        // Show menu button on smaller screens
        function updateMenuButton() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = "block";
            } else {
                menuButton.style.display = "none";
                nav.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }
        }

        updateMenuButton();

        window.addEventListener("resize", updateMenuButton);

        // Open and close mobile menu
        menuButton.addEventListener("click", function () {
            nav.classList.toggle("active");

            const isOpen = nav.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.innerHTML = isOpen ? "✕" : "☰";
        });
    }


    // ==========================================
    // 4. Scroll Reveal Animation
    // ==========================================

    const animatedElements = document.querySelectorAll(
        "#about, #education, #skills, #projects, #contact, " +
        ".education-card, .skill, .project-card"
    );

    // Add animation styles dynamically
    const animationStyle = document.createElement("style");

    animationStyle.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .scroll-reveal.show {
            opacity: 1;
            transform: translateY(0);
        }

        .menu-toggle {
            color: inherit;
        }

        @media (max-width: 768px) {
            nav {
                display: none;
            }

            nav.active {
                display: block;
            }

            nav.active ul {
                display: flex;
                flex-direction: column;
            }
        }
    `;

    document.head.appendChild(animationStyle);

    animatedElements.forEach(function (element) {
        element.classList.add("scroll-reveal");
    });

    // Use IntersectionObserver for smooth reveal animations
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");

                        // Stop observing after the animation happens
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        // Fallback for older browsers
        animatedElements.forEach(function (element) {
            element.classList.add("show");
        });
    }


    // ==========================================
    // 5. Contact / Email Interaction
    // ==========================================

    const emailAddress = "kunsothusrija@gmail.com";

    const contactLinks = document.querySelectorAll(
        'a[href^="mailto:"], #contact a'
    );

    contactLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log("Email link clicked.");
            console.log("Contact email:", emailAddress);

        });

    });


    // ==========================================
    // 6. Automatically Display Current Year
    // ==========================================

    const footer = document.querySelector("footer");

    if (footer) {

        const currentYear = new Date().getFullYear();

        // Look for an element commonly used for the year
        const yearElement = footer.querySelector(
            "#year, .year, [data-year]"
        );

        if (yearElement) {

            yearElement.textContent = currentYear;

        } else {

            // If no year element exists, add the year
            const yearText = document.createElement("span");

            yearText.textContent = " © " + currentYear;

            footer.appendChild(yearText);
        }
    }


    // ==========================================
    // 7. Highlight Active Navigation Link
    // ==========================================

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // ==========================================
    // 8. Prevent Errors From Broken Images
    // ==========================================

    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {

        // If profile-image is an <img>
        if (profileImage.tagName.toLowerCase() === "img") {

            profileImage.addEventListener("error", function () {

                console.warn("Profile image could not be loaded.");

                profileImage.style.display = "none";

            });

        }
    }


    // ==========================================
    // 9. Project Card Interaction
    // ==========================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card, index) {

        card.addEventListener("mouseenter", function () {
            console.log("Viewing project card:", index + 1);
        });

        card.addEventListener("click", function () {
            console.log("Project card clicked:", index + 1);
        });

    });


    // ==========================================
    // 10. Welcome / Testing Console Messages
    // ==========================================

    console.log("======================================");
    console.log("Personal Portfolio Website Loaded");
    console.log("Name: Kunusothu Srija");
    console.log("Course: BTech CSE");
    console.log("College: Priyadarshini Institute of Science and Technology for Women, Khammam");
    console.log("Career Interest: Web Development");
    console.log("JavaScript functionality is working successfully!");
    console.log("======================================");

});