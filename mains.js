
// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close menu
menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

// Close menu when a link is clicked
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});

// =========================
// GAME SEARCH & CATEGORY FILTER
// =========================

const categoryButtons = document.querySelectorAll(".category-btn");
const gameCards = document.querySelectorAll(".game-card");
const gameSearch = document.getElementById("game-search");

// Currently selected category
let activeCategory = "all";

// Filter games
function filterGames() {

    // Get search input
    const searchTerm = gameSearch.value.toLowerCase().trim();

    gameCards.forEach(card => {

        // Get game category
        const gameCategory = card.dataset.category;

      const noResults = document.getElementById("no-results");
      
        // Get all searchable text inside the card
        const gameText = card.textContent.toLowerCase();

        // Check category match
        const matchesCategory =
            activeCategory === "all" ||
            activeCategory === gameCategory;

        // Check search match
        const matchesSearch =
            gameText.includes(searchTerm);

        // Show or hide card
        if (matchesCategory && matchesSearch) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

      // Count visible games
const visibleGames = [...gameCards].filter(card => {
    return card.style.display !== "none";
}).length;

// Show message when no games match
if (noResults) {
    noResults.style.display =
        visibleGames === 0 ? "block" : "none";
}
    });

}

// Category button events
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");

        // Update selected category
        activeCategory = button.dataset.category;

        // Apply filters
        filterGames();

    });

});

// Search input event
if (gameSearch) {

    gameSearch.addEventListener("input", filterGames);

}

// =========================
// VIEW ALL GAMES
// =========================

const viewAllLink = document.querySelector(".view-all");

if (viewAllLink) {

    viewAllLink.addEventListener("click", () => {

        // Clear search input
        if (gameSearch) {
            gameSearch.value = "";
        }

        // Reset category to All Games
        activeCategory = "all";

        // Update active category button
        categoryButtons.forEach(button => {
            button.classList.remove("active");

            if (button.dataset.category === "all") {
                button.classList.add("active");
            }
        });

        // Display all games
        filterGames();

    });

}


// =========================
// GAME DETAILS DATA
// =========================


const gamesData = {
    "ironclad-arena": {
        name: "IRONCLAD",
        subtitle: "ARENA",
        genre: "Action",
        experience: "Combat",
        world: "Fantasy",
        image: "ironclad.jpeg",
        description: "Enter a world of intense battles, powerful warriors and challenging adventures. Test your abilities and prove your strength in the arena."
    },

    "ashen-frontier": {
        name: "ASHEN",
        subtitle: "FRONTIER",
        genre: "Adventure",
        experience: "Exploration",
        world: "Fantasy",
        image: "ashen-frontier.jpeg",
        description: "Discover forgotten lands, uncover hidden mysteries and explore a world filled with secrets and unexpected adventures."
    },

    "velocity-x": {
        name: "VELOCITY",
        subtitle: "X",
        genre: "Racing",
        experience: "High Speed",
        world: "Motorsport",
        image: "velocity-x.jpeg",
        description: "Push your limits, take on challenging tracks and experience the excitement of high-speed competition."
    },

    "goalbound": {
        name: "GOALBOUND",
        subtitle: "",
        genre: "Sports",
        experience: "Competition",
        world: "Sports",
        image: "goalbound.jpeg",
        description: "Experience the excitement of competitive sports, develop your skills and take on new challenges."
    },

    "mythic-echoes": {
        name: "MYTHIC",
        subtitle: "ECHOES",
        genre: "RPG",
        experience: "Role Playing",
        world: "Fantasy",
        image: "mythic-echoes.jpeg",
        description: "Build your legend in a magical world filled with mysterious creatures, unforgettable characters and epic adventures."
    },

    "kingdoms-at-war": {
        name: "KINGDOMS",
        subtitle: "AT WAR",
        genre: "Strategy",
        experience: "Strategy",
        world: "Medieval",
        image: "kingdoms-at-war.jpeg",
        description: "Command your forces, make strategic decisions and shape the future of your own empire."
    }
};


// =========================
// LOAD SELECTED GAME DETAILS
// =========================

const gameTitle = document.getElementById("game-title");

const gameImage = document.getElementById("game-image");

if (gameTitle) {

    const params = new URLSearchParams(window.location.search);

    const selectedGame = params.get("game") || "ironclad-arena";

    const game = gamesData[selectedGame] || gamesData["ironclad-arena"];

    gameTitle.innerHTML = `${game.name} <span>${game.subtitle}</span>`;

  gameImage.src = game.image;
gameImage.alt = `${game.name} ${game.subtitle} game artwork`;

    document.getElementById("game-category").textContent = game.genre.toUpperCase();

    document.getElementById("game-description").textContent = game.description;

    document.getElementById("game-genre").textContent = game.genre;

    document.getElementById("game-experience").textContent = game.experience;

    document.getElementById("game-world").textContent = game.world;

    document.title = `${game.name} ${game.subtitle} | GameVerse`;
}
